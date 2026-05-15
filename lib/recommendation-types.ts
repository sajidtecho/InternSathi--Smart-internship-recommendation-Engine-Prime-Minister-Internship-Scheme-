// Types for the Rule-Based Recommendation System
export interface UserProfile {
  // Basic Info
  id?: string;
  name?: string;
  /** Age of candidate (must be 21-24 inclusive per current scheme constraint) */
  age?: number; // Added for validation layer; engine can choose to ignore if undefined
  
  // Education
  education: "10th" | "12th" | "Diploma" | "Graduate" | "PostGraduate" | "PhD";
  field: string; // "Science", "Commerce", "Arts", "Engineering", "Medical"
  
  // Skills & Interests
  skills: string[];
  interests: string[]; // Sector interests
  languages: string[];
  
  // Location
  location: {
    state: string;
    district: string;
    pincode?: string;
    isRural?: boolean;
  };
  
  // Preferences
  workMode: "Remote" | "Onsite" | "Hybrid" | "Any";
  stipendExpectation: number;
  duration: "12 months" | "6 months" | "Any";
}

export interface InternshipOpportunity {
  id: string;
  role: string;
  company: string;
  location: string;
  sector: string;
  workMode: 'remote' | 'hybrid' | 'onsite';
  requiredSkills: string[];
  educationRequirement: string;
  companySize: 'startup' | 'medium' | 'large';
  description: string;
  duration: string;
  stipend: string;
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  sector: string;
  
  // Requirements
  requiredEducation: string[];
  requiredSkills: string[];
  preferredSkills?: string[];
  
  // Location & Work
  location: {
    state: string;
    district?: string;
    isRemote: boolean;
    mode: "Remote" | "Onsite" | "Hybrid";
  };
  
  // Benefits
  stipend: number;
  duration: string;
  benefits: string[];
  
  // Additional Info
  description: string;
  applicationDeadline: string;
  startDate: string;
  
  // Matching metadata
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  popularity: number; // 1-10 scale
}

export interface RecommendationResult {
  internship: Internship;
  matchScore: number;
  matchPercentage: number;
  reasons: MatchReason[];
  rank: number;
  /** Detailed numeric breakdown per dimension (raw weighted points) */
  breakdown: {
    education: number;
    skills: number;
    location: number;
    interests: number;
    preferences: number;
  };
  /** Actionable suggestions to improve future matches */
  improvements: string[];
  /** Skills the engine inferred (when user supplied none) so UI can highlight */
  inferredSkills?: string[];
}

export interface MatchReason {
  type: "education" | "skills" | "location" | "interest" | "stipend" | "duration";
  message: string;
  weight: number;
  icon: string;
}

export interface RecommendationExplanation {
  totalScore: number;
  breakdown: {
    education: number;
    skills: number;
    location: number;
    interests: number;
    preferences: number;
  };
  reasons: MatchReason[];
  improvements: string[];
}