import { RecommendationResult, UserProfile } from './recommendation-types';

// Basic fairness & diversity post-processing.
// 1. Ensure sector diversity (avoid all top recs same sector if alternates exist)
// 2. Ensure at least one remote if user prefers remote or Any and remote exists
// 3. Geographic fairness: if no local (same state) result, try to inject one if reasonably scored.

const MAX_RESULTS_CONSIDERED = 10; // look ahead window
const MIN_LOCAL_SCORE = 35; // minimum score to inject a local fairness candidate

export function applyPostProcessing(
  results: RecommendationResult[],
  user: UserProfile
): RecommendationResult[] {
  if (results.length === 0) return results;

  const output = [...results];
  const sectors = new Set<string>();
  results.forEach(r => sectors.add(r.internship.sector));

  // Sector diversity: if first 3 all same sector and there exists at least one from other sector later
  if (output.length >= 3) {
    const firstSector = output[0].internship.sector;
    if (output.slice(0, 3).every(r => r.internship.sector === firstSector) && sectors.size > 1) {
      // find first different sector candidate beyond top 3
      const alt = results.slice(3, MAX_RESULTS_CONSIDERED).find(r => r.internship.sector !== firstSector);
      if (alt) {
        // Replace the 3rd slot with alt if alt not already in top 3
        output[2] = alt;
      }
    }
  }

  // Remote inclusion
  const wantsRemote = user.workMode === 'Remote' || user.workMode === 'Any';
  if (wantsRemote && !output.some(r => r.internship.location?.isRemote)) {
    const remoteAlt = results.find(r => r.internship.location?.isRemote);
    if (remoteAlt) {
      output[output.length - 1] = remoteAlt; // swap last position
    }
  }

  // Geographic fairness: ensure at least one from user's state if available
  const hasLocal = output.some(r => r.internship.location?.state?.toLowerCase() === user.location?.state?.toLowerCase());
  if (!hasLocal && user.location?.state) {
    const localCandidate = results.find(r =>
      r.internship.location?.state?.toLowerCase() === user.location.state.toLowerCase() && r.matchScore >= MIN_LOCAL_SCORE
    );
    if (localCandidate) {
      output[output.length - 1] = localCandidate; // replace last slot
    }
  }

  // Reassign ranks after modifications
  return output.map((r, idx) => ({ ...r, rank: idx + 1 }));
}
