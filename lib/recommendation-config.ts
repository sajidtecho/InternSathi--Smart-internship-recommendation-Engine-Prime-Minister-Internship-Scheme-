// Central configuration for recommendation engine
export const RECOMMENDATION_WEIGHTS = {
  EDUCATION: 30,
  SKILLS: 25,
  LOCATION: 20,
  INTERESTS: 15,
  PREFERENCES: 10
} as const;

// Minimum score threshold before an internship is considered.
// May be dynamically reduced if user profile is sparse.
export const BASE_MIN_SCORE_THRESHOLD = 40; // original hard-coded value

// Desired minimum number of recommendations to surface (if available)
export const MIN_RESULTS = 3;

// Max results requested by UI (default cap)
export const DEFAULT_MAX_RESULTS = 5;

// If user has fewer than this many populated dimensions (education, skills, interests, location, preferences)
// we relax the threshold by this factor per missing dimension.
export const THRESHOLD_RELAX_PER_MISSING = 4; // points reduced per missing dimension
export const MAX_RELAX = 15; // don't relax more than this overall

export interface ProfileCompletenessInfo {
  missingDimensions: string[];
  appliedThreshold: number;
}

export function computeDynamicThreshold(user: any): ProfileCompletenessInfo {
  const dimensions: Record<string, boolean> = {
    education: !!user?.education,
    skills: Array.isArray(user?.skills) && user.skills.length > 0,
    interests: Array.isArray(user?.interests) && user.interests.length > 0,
    location: !!user?.location?.state,
    preferences: user?.workMode !== undefined && user?.duration !== undefined
  };
  const missing = Object.entries(dimensions).filter(([, ok]) => !ok).map(([k]) => k);
  const relax = Math.min(missing.length * THRESHOLD_RELAX_PER_MISSING, MAX_RELAX);
  const applied = Math.max(0, BASE_MIN_SCORE_THRESHOLD - relax);
  return { missingDimensions: missing, appliedThreshold: applied };
}
