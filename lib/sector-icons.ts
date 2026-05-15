// Centralized sector -> icon mapping to avoid duplication in UI components
// Now uses icon class names instead of emojis for better performance and consistency.
export const SECTOR_ICON_MAP: Record<string, string> = {
  'it': 'laptop',
  'technology': 'monitor',
  'software': 'laptop',
  'finance': 'indian-rupee',
  'banking': 'landmark',
  'manufacturing': 'cog',
  'healthcare': 'heart-pulse',
  'medical': 'stethoscope',
  'government': 'landmark',
  'marketing': 'trending-up',
  'media': 'tv',
  'retail': 'shopping-bag',
  'energy & power': 'zap',
  'energy': 'zap',
  'power': 'zap',
  'fmcg': 'shopping-bag',
  'education': 'book-open',
  'agriculture': 'wheat',
  'agri': 'wheat',
  'logistics': 'truck',
  'telecom': 'radio',
  'construction': 'hammer'
};

export function getSectorIcon(sector: string | undefined): string {
  if (!sector) return 'building-2';
  const key = sector.toLowerCase();
  return SECTOR_ICON_MAP[key] || 'building-2';
}