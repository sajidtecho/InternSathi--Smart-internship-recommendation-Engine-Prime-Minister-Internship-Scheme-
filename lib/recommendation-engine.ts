import {
  UserProfile,
  RecommendationResult,
  MatchReason,
  RecommendationExplanation
} from './recommendation-types';
import {
  RECOMMENDATION_WEIGHTS,
  DEFAULT_MAX_RESULTS,
  MIN_RESULTS,
  computeDynamicThreshold
} from './recommendation-config';
import { parseStipend } from './stipend-utils';
import { normalizeInternship, normalizeUserProfile } from './internship-schema';
import { applyPostProcessing } from './recommendation-postprocessor';

export class RuleBasedRecommendationEngine {
  // Direct reference to weight config
  private static readonly WEIGHTS = RECOMMENDATION_WEIGHTS;

  // Main recommendation function
  static getRecommendations(
    userProfile: UserProfile,
    internships: any[],
    maxResults: number = DEFAULT_MAX_RESULTS
  ): RecommendationResult[] {
    // Determine threshold based on profile completeness
  // Normalize inputs first (non-throwing try/catch safe guard)
  let normalizedUser = userProfile as any;
  try { normalizedUser = normalizeUserProfile(userProfile as any); } catch {}
  const { appliedThreshold } = computeDynamicThreshold(normalizedUser);
  // Inference phase (skills, basic sector interests) before scoring
  const enrichedUser = this.enrichUserProfile(normalizedUser);
  const scoredInternships: RecommendationResult[] = internships.map(rawInternship => {
      let internship: any = rawInternship;
      try { internship = normalizeInternship(rawInternship); } catch {}
      const score = this.calculateMatchScore(enrichedUser, internship);
      const reasons = this.generateMatchReasons(enrichedUser, internship, score);
      const improvements: string[] = [];
      // Simple improvement hints (extend later): suggest top missing required skills
      if (Array.isArray(internship.requiredSkills) && internship.requiredSkills.length > 0) {
        const userSkillsLower = (enrichedUser.skills || []).map(s => s.toLowerCase());
        const missing = internship.requiredSkills.filter((rs: string) =>
          !userSkillsLower.some(us => this.isSkillMatch(us, rs.toLowerCase()))
        ).slice(0, 2);
        if (missing.length > 0) {
          improvements.push(`इन कौशल को जोड़ें: ${missing.join(', ')}`);
        }
      }
      if (score.breakdown.skills < this.WEIGHTS.SKILLS * 0.4) {
        improvements.push('अधिक बुनियादी कौशल जोड़ें');
      }
      if (score.breakdown.education < this.WEIGHTS.EDUCATION * 0.4) {
        improvements.push('उच्च शिक्षा योग्यता भविष्य के लिए मदद करेगी');
      }
      
      const rec: RecommendationResult = {
        internship,
        matchScore: score.totalScore,
        matchPercentage: Math.round(score.totalScore),
        reasons,
        rank: 0, // Will be set after sorting
        breakdown: score.breakdown,
        improvements
      } as any;
      if ((enrichedUser as any).inferredSkills) {
        (rec as any).inferredSkills = (enrichedUser as any).inferredSkills;
      }
      return rec;
    });

    // Sort by score with deterministic tie-breakers and assign ranks
    const byScoreThenQuality = (a: RecommendationResult, b: RecommendationResult) => {
      if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
      const stipendA = typeof (a.internship as any).stipend === 'number' ? (a.internship as any).stipend : ((a.internship as any).stipendMeta?.avg || 0);
      const stipendB = typeof (b.internship as any).stipend === 'number' ? (b.internship as any).stipend : ((b.internship as any).stipendMeta?.avg || 0);
      if (stipendB !== stipendA) return stipendB - stipendA;
      const popA = (a.internship as any).popularity ?? 0;
      const popB = (b.internship as any).popularity ?? 0;
      return popB - popA;
    };

    let sortedResults = scoredInternships
      .filter(result => result.matchScore >= appliedThreshold)
      .sort(byScoreThenQuality)
      .slice(0, maxResults)
      .map((result, index) => ({ ...result, rank: index + 1 }));

    // Ensure at least MIN_RESULTS if possible by relaxing threshold slightly
    if (sortedResults.length < MIN_RESULTS) {
      // Constrain fallback to near-threshold candidates to avoid very weak picks
      const fallbackFloor = Math.max(0, appliedThreshold - 5);
      const fallback = scoredInternships
        .filter(r => !sortedResults.includes(r) && r.matchScore >= fallbackFloor)
        .sort(byScoreThenQuality)
        .slice(0, MIN_RESULTS - sortedResults.length)
        .map((r, idx) => ({ ...r, rank: sortedResults.length + idx + 1 }));
      sortedResults = [...sortedResults, ...fallback].slice(0, maxResults);
    }

    // Apply diversity & fairness post-processing
    sortedResults = applyPostProcessing(sortedResults, enrichedUser);

    return sortedResults;
  }

  // Calculate comprehensive match score
  private static calculateMatchScore(user: UserProfile, internship: any) {
  const educationScore = this.calculateEducationMatch(user, internship);
  const skillsScore = this.calculateSkillsMatch(user, internship);
  const locationScore = this.calculateLocationMatch(user, internship);
  const interestScore = this.calculateInterestMatch(user, internship);
  const preferenceScore = this.calculatePreferenceMatch(user, internship);

  const totalScore = educationScore + skillsScore + locationScore + interestScore + preferenceScore;

    return {
      totalScore: Math.min(totalScore, 100), // Cap at 100
      breakdown: {
        education: educationScore,
        skills: skillsScore,
        location: locationScore,
        interests: interestScore,
        preferences: preferenceScore
      }
    };
  }

  // Education matching logic
  private static calculateEducationMatch(user: UserProfile, internship: any): number {
    if (!user.education) {
      // Slightly below-neutral if absent to reduce tie clustering
      return this.WEIGHTS.EDUCATION * 0.4;
    }
    const userEduLevel = this.getEducationLevel(user.education);
    
    // Handle different data structures - internship might have requiredEducation or educationRequirement
    let requiredEducation: string[] = [];
    
    if (internship.requiredEducation && Array.isArray(internship.requiredEducation)) {
      requiredEducation = internship.requiredEducation;
    } else if (internship.educationRequirement && typeof internship.educationRequirement === 'string') {
      // Convert single education requirement string to array for processing
      requiredEducation = [internship.educationRequirement];
    } else {
      // No education requirements specified, give neutral score
  return this.WEIGHTS.EDUCATION * 0.5;
    }
    
    const requiredLevels = requiredEducation.map(edu => this.getEducationLevel(edu));
    
    // Perfect match - check if user's education matches any of the required education
    if (requiredEducation.some(req => 
      req.toLowerCase().includes(user.education.toLowerCase()) ||
      user.education.toLowerCase().includes(req.toLowerCase())
    )) {
      return this.WEIGHTS.EDUCATION;
    }
    
    // Overqualified (still good)
    if (Math.min(...requiredLevels) <= userEduLevel) {
      return this.WEIGHTS.EDUCATION * 0.8;
    }
    
    // Underqualified
    return this.WEIGHTS.EDUCATION * 0.3;
  }

  // Skills matching with fuzzy logic
  private static calculateSkillsMatch(user: UserProfile, internship: any): number {
    if (!Array.isArray(user.skills) || user.skills.length === 0) {
      return this.WEIGHTS.SKILLS * 0.4; // slightly below-neutral
    }
    const userSkills = user.skills.map(s => s.toLowerCase());
    
    // Handle different data structures
    const requiredSkills = internship.requiredSkills ? 
      internship.requiredSkills.map((s: string) => s.toLowerCase()) : [];
    const preferredSkills = internship.preferredSkills ? 
      internship.preferredSkills.map((s: string) => s.toLowerCase()) : [];
    
    // Exact matches
    const requiredMatches = requiredSkills.filter((skill: string) =>
      userSkills.some(userSkill => this.isSkillMatch(userSkill, skill))
    ).length;
    
    const preferredMatches = preferredSkills.filter((skill: string) => 
      userSkills.some(userSkill => this.isSkillMatch(userSkill, skill))
    ).length;
    
    // Calculate score
    const requiredScore = (requiredMatches / Math.max(requiredSkills.length, 1)) * 0.7;
    const preferredScore = (preferredMatches / Math.max(preferredSkills.length, 1)) * 0.3;
    
    return (requiredScore + preferredScore) * this.WEIGHTS.SKILLS;
  }

  // Location matching with distance consideration
  private static calculateLocationMatch(user: UserProfile, internship: any): number {
    if (!user.location || !user.location.state) {
      return this.WEIGHTS.LOCATION * 0.5;
    }
    // Handle different data structures
    let isRemote = false;
    let internshipLocation = '';
    let workMode = '';
    
    if (internship.location && typeof internship.location === 'object') {
      // New Internship structure
      isRemote = internship.location.isRemote || internship.location.mode === "Remote";
      internshipLocation = internship.location.state || '';
      workMode = internship.location.mode || '';
    } else {
      // InternshipOpportunity structure
      internshipLocation = internship.location || '';
      workMode = internship.workMode || '';
      isRemote = workMode.toLowerCase() === 'remote' || 
                 internshipLocation.toLowerCase().includes('remote');
    }
    
    // Remote work gets high score regardless of location
    if (isRemote) {
      return this.WEIGHTS.LOCATION;
    }
    
    // Extract state/city from location string for InternshipOpportunity
    let internshipState = '';
    let internshipCity = '';
    
    if (typeof internship.location === 'string') {
      // Parse location string like "Hybrid - Bangalore" or "Mumbai"
      const locationParts = internshipLocation.split(' - ');
      if (locationParts.length > 1) {
        internshipCity = locationParts[1].trim();
      } else {
        internshipCity = internshipLocation.trim();
      }
      
      // Simple state mapping for major cities
      const cityStateMap: { [key: string]: string } = {
        'bangalore': 'Karnataka',
        'mumbai': 'Maharashtra',
        'delhi': 'Delhi',
        'pune': 'Maharashtra',
        'hyderabad': 'Telangana',
        'chennai': 'Tamil Nadu',
        'kolkata': 'West Bengal',
        'ahmedabad': 'Gujarat'
      };
      
      internshipState = cityStateMap[internshipCity.toLowerCase()] || '';
    } else if (internship.location && internship.location.state) {
      internshipState = internship.location.state;
      internshipCity = internship.location.district || '';
    }
    
    // Same state
    if (user.location.state.toLowerCase() === internshipState.toLowerCase()) {
      // Same city - perfect match
      if (user.location.district.toLowerCase() === internshipCity.toLowerCase()) {
        return this.WEIGHTS.LOCATION;
      }
      // Same state, different city
      return this.WEIGHTS.LOCATION * 0.8;
    }
    
    // Different state - check if user prefers remote
    if (user.workMode === "Remote" || user.workMode === "Any") {
      return this.WEIGHTS.LOCATION * 0.5;
    }
    
    return this.WEIGHTS.LOCATION * 0.2;
  }

  // Interest/sector matching
  private static calculateInterestMatch(user: UserProfile, internship: any): number {
    if (!Array.isArray(user.interests) || user.interests.length === 0) {
      return this.WEIGHTS.INTERESTS * 0.5;
    }
    const userInterests = user.interests.map(i => i.toLowerCase());
    const internshipSector = internship.sector.toLowerCase();
    
    // Direct sector match
    if (userInterests.includes(internshipSector)) {
      return this.WEIGHTS.INTERESTS;
    }
    
    // Related sector match (e.g., "IT" matches "Software", "Technology")
    const relatedMatches = userInterests.some(interest => 
      this.areRelatedSectors(interest, internshipSector)
    );
    
    if (relatedMatches) {
      return this.WEIGHTS.INTERESTS * 0.7;
    }
    
    return this.WEIGHTS.INTERESTS * 0.3;
  }

  // Preference matching (stipend, duration, etc.)
  private static calculatePreferenceMatch(user: UserProfile, internship: any): number {
    // If preferences largely missing, return neutral base
    if (!user.duration && !user.workMode && (user.stipendExpectation == null)) {
      return this.WEIGHTS.PREFERENCES * 0.5;
    }
    let score = 0;
    
    // Stipend match (40% of preference weight)
    let internshipStipend = 0;
    if (internship.stipendMeta) {
      internshipStipend = internship.stipendMeta.avg;
    } else if (typeof internship.stipend === 'number') {
      internshipStipend = internship.stipend;
    } else if (typeof internship.stipend === 'string') {
      const parsed = parseStipend(internship.stipend);
      internshipStipend = parsed.avg;
    }
    
    if (internshipStipend >= user.stipendExpectation) {
      score += this.WEIGHTS.PREFERENCES * 0.4;
    } else if (internshipStipend >= user.stipendExpectation * 0.8) {
      score += this.WEIGHTS.PREFERENCES * 0.3;
    } else {
      score += this.WEIGHTS.PREFERENCES * 0.1;
    }
    
    // Work mode match (30% of preference weight)
    let internshipWorkMode = '';
    let isRemoteInternship = false;
    
    if (internship.location && typeof internship.location === 'object') {
      internshipWorkMode = internship.location.mode || '';
      isRemoteInternship = internship.location.isRemote || false;
    } else {
      internshipWorkMode = internship.workMode || '';
      isRemoteInternship = internshipWorkMode.toLowerCase() === 'remote' ||
                          (typeof internship.location === 'string' && 
                           internship.location.toLowerCase().includes('remote'));
    }
    
    if (user.workMode === "Any" || 
        user.workMode.toLowerCase() === internshipWorkMode.toLowerCase() ||
        (user.workMode === "Remote" && isRemoteInternship)) {
      score += this.WEIGHTS.PREFERENCES * 0.3;
    }
    
    // Duration match (30% of preference weight)
    const internshipDuration = internship.duration || '';
    if (user.duration === "Any" || user.duration === internshipDuration) {
      score += this.WEIGHTS.PREFERENCES * 0.3;
    }
    
    return score;
  }

  // Generate human-readable match reasons
  private static generateMatchReasons(
    user: UserProfile, 
    internship: any, 
    scoreBreakdown: any
  ): MatchReason[] {
    const reasons: MatchReason[] = [];
    
    // Education reasons
    if (scoreBreakdown.breakdown.education >= this.WEIGHTS.EDUCATION * 0.8) {
      reasons.push({
        type: "education",
        message: `Perfect education match: ${user.education} qualification accepted`,
        weight: scoreBreakdown.breakdown.education,
        icon: "graduation-cap"
      });
    }
    
    // Skills reasons
    if (Array.isArray(internship.requiredSkills) && scoreBreakdown.breakdown.skills >= this.WEIGHTS.SKILLS * 0.6) {
      const matchingSkills = this.getMatchingSkills(user.skills || [], internship.requiredSkills || []);
      reasons.push({
        type: "skills",
        message: `Your skills match: ${matchingSkills.slice(0, 2).join(", ")}`,
        weight: scoreBreakdown.breakdown.skills,
        icon: ""
      });
    }
    
    // Location reasons
    if (scoreBreakdown.breakdown.location >= this.WEIGHTS.LOCATION * 0.8) {
      if (internship.location.isRemote) {
        reasons.push({
          type: "location",
          message: "Work from home opportunity",
          weight: scoreBreakdown.breakdown.location,
          icon: ""
        });
      } else {
        reasons.push({
          type: "location",
          message: `Available in your state: ${user.location.state}`,
          weight: scoreBreakdown.breakdown.location,
          icon: ""
        });
      }
    }
    
    // Interest reasons
    if (scoreBreakdown.breakdown.interests >= this.WEIGHTS.INTERESTS * 0.7) {
      reasons.push({
        type: "interest",
        message: `Matches your interest in ${internship.sector}`,
        weight: scoreBreakdown.breakdown.interests,
        icon: ""
      });
    }
    
    // Stipend reasons
    if (typeof internship.stipend === 'number' && user.stipendExpectation != null && internship.stipend >= user.stipendExpectation) {
      reasons.push({
        type: "stipend",
        message: `Good stipend: ₹${internship.stipend}/month`,
        weight: 5,
        icon: ""
      });
    }
    
    return reasons;
  }

  // Helper functions
  private static getEducationLevel(education: string): number {
    const levels = {
      "10th": 1,
      "12th": 2,
      "Diploma": 2.5,
      "Graduate": 3,
      "PostGraduate": 4,
      "PhD": 5
    };
    return levels[education as keyof typeof levels] || 1;
  }

  private static isSkillMatch(userSkill: string, requiredSkill: string): boolean {
    // Exact match
    if (userSkill === requiredSkill) return true;
    
    // Partial match
    if (userSkill.includes(requiredSkill) || requiredSkill.includes(userSkill)) return true;
    
    // Synonym matching
    const synonyms: { [key: string]: string[] } = {
      "programming": ["coding", "development", "software"],
      "communication": ["english", "speaking", "presentation"],
      "computer": ["it", "technology", "digital"],
      "sales": ["marketing", "business", "customer"]
    };
    
    for (const [key, values] of Object.entries(synonyms)) {
      if ((userSkill.includes(key) && values.some(v => requiredSkill.includes(v))) ||
          (requiredSkill.includes(key) && values.some(v => userSkill.includes(v)))) {
        return true;
      }
    }
    
    return false;
  }

  private static areRelatedSectors(interest: string, sector: string): boolean {
    const sectorMap: { [key: string]: string[] } = {
      "it": ["technology", "software", "computer", "digital"],
      "finance": ["banking", "accounting", "economics"],
      "healthcare": ["medical", "hospital", "pharmacy"],
      "education": ["teaching", "training", "academic"],
      "marketing": ["advertising", "sales", "business"]
    };
    
    for (const [key, related] of Object.entries(sectorMap)) {
      if ((interest.includes(key) && related.some(r => sector.includes(r))) ||
          (sector.includes(key) && related.some(r => interest.includes(r)))) {
        return true;
      }
    }
    
    return false;
  }

  private static getMatchingSkills(userSkills: string[], requiredSkills: string[]): string[] {
    return userSkills.filter(userSkill => 
      requiredSkills.some(reqSkill => 
        this.isSkillMatch(userSkill.toLowerCase(), reqSkill.toLowerCase())
      )
    );
  }

  // Get detailed explanation for a specific match
  static explainRecommendation(
    user: UserProfile, 
    internship: any
  ): RecommendationExplanation {
    const enrichedUser = this.enrichUserProfile(user);
    const score = this.calculateMatchScore(enrichedUser, internship);
    const reasons = this.generateMatchReasons(enrichedUser, internship, score);
    
    const improvements = [];
    
    if (score.breakdown.skills < this.WEIGHTS.SKILLS * 0.6) {
      const requiredSkills = internship.requiredSkills || [];
      improvements.push("Consider learning these skills: " + 
        requiredSkills.slice(0, 2).join(", "));
    }
    
    if (score.breakdown.education < this.WEIGHTS.EDUCATION * 0.6) {
      improvements.push("This role may require higher education qualification");
    }
    
    return {
      totalScore: score.totalScore,
      breakdown: score.breakdown,
      reasons,
      improvements
    };
  }

  // ===== Inference & Enrichment =====
  private static enrichUserProfile(user: UserProfile): UserProfile & { inferredSkills?: string[] } {
    if (Array.isArray(user.skills) && user.skills.length > 0) return user;
    const inferred = new Set<string>();
    const EDUCATION_SKILL_MAP: Record<string, string[]> = {
      '10th': ['Communication'],
      '12th': ['Communication', 'Computer Basics'],
      'Diploma': ['Computer Basics', 'MS Office'],
      'Graduate': ['MS Office', 'Teamwork'],
      'PostGraduate': ['Analysis', 'Presentation'],
      'PhD': ['Research', 'Analysis']
    };
    const INTEREST_SKILL_HINTS: Record<string, string[]> = {
      'technology': ['Computer Basics'],
      'it': ['Computer Basics'],
      'finance': ['Excel'],
      'education': ['Presentation'],
      'marketing': ['Communication']
    };
    if (user.education && EDUCATION_SKILL_MAP[user.education]) {
      EDUCATION_SKILL_MAP[user.education].forEach(s => inferred.add(s));
    }
    (user.interests || []).forEach((i: string) => {
      const key = i.toLowerCase();
      if (INTEREST_SKILL_HINTS[key]) {
        INTEREST_SKILL_HINTS[key].forEach(s => inferred.add(s));
      }
    });
    const inferredList = Array.from(inferred).slice(0, 3);
    if (inferredList.length === 0) return user;
    return { ...user, skills: inferredList, inferredSkills: inferredList };
  }
}
