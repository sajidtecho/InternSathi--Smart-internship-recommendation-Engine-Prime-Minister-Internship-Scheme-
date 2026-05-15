import { z } from 'zod';
import { parseStipend } from './stipend-utils';

// Canonical enumerations
export const EDUCATION_LEVELS = [
  '10th','12th','Diploma','Graduate','PostGraduate','PhD'
] as const;

export const WORK_MODES = ['Remote','Onsite','Hybrid','Any'] as const;

// Known sector canonical forms (add as needed)
export const SECTORS = [
  'Technology & IT','Healthcare','Education','Business & Finance','Manufacturing','Agriculture',
  'Retail & E-commerce','Banking & Insurance','Media & Communication','Energy & Utilities',
  'Logistics & Transportation','Construction & Real Estate','Government & Public Service'
] as const;

// Mapping synonyms -> canonical sector (lowercase keys)
const sectorSynonyms: Record<string,string> = {
  'it':'Technology & IT',
  'tech':'Technology & IT',
  'software':'Technology & IT',
  'health':'Healthcare',
  'medical':'Healthcare',
  'finance':'Business & Finance',
  'banking':'Banking & Insurance',
  'insurance':'Banking & Insurance',
  'gov':'Government & Public Service',
  'government':'Government & Public Service',
  'agri':'Agriculture'
};

export const UserProfileSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1).optional(),
  age: z.number({ required_error: 'Age is required' })
    .int('Age must be an integer')
    .refine(a => a >= 21 && a <= 24, 'Age must be between 21 and 24 (inclusive)'),
  education: z.enum(EDUCATION_LEVELS),
  field: z.string().min(1).default(''),
  skills: z.array(z.string().min(1)).default([]),
  interests: z.array(z.string().min(1)).default([]),
  languages: z.array(z.string().min(1)).default([]),
  location: z.object({
    state: z.string().min(1),
    district: z.string().min(1).optional().default(''),
    pincode: z.string().optional(),
    isRural: z.boolean().optional()
  }),
  workMode: z.enum(WORK_MODES),
  stipendExpectation: z.number().nonnegative().default(0),
  duration: z.string().default('Any')
});

export const InternshipSchema = z.object({
  id: z.string(),
  title: z.string(),
  company: z.string(),
  sector: z.string(), // will canonicalize
  requiredEducation: z.array(z.string()).default([]),
  requiredSkills: z.array(z.string()).default([]),
  preferredSkills: z.array(z.string()).optional(),
  location: z.union([
    z.object({
      state: z.string(),
      district: z.string().optional(),
      isRemote: z.boolean().default(false),
      mode: z.enum(['Remote','Onsite','Hybrid']).default('Onsite')
    }),
    z.string() // legacy string form
  ]),
  stipend: z.union([z.number(), z.string()]),
  duration: z.string().default(''),
  benefits: z.array(z.string()).default([]),
  description: z.string().default(''),
  applicationDeadline: z.string().default(''),
  startDate: z.string().default(''),
  difficulty: z.enum(['Beginner','Intermediate','Advanced']).default('Beginner'),
  popularity: z.number().min(0).max(10).default(0)
});

export type NormalizedUserProfile = z.infer<typeof UserProfileSchema>;
export type NormalizedInternship = ReturnType<typeof normalizeInternship>;

function canonicalizeSector(sector: string): string {
  if (!sector) return sector;
  const lowered = sector.toLowerCase().trim();
  if (sectorSynonyms[lowered]) return sectorSynonyms[lowered];
  // Try direct match ignoring case
  const direct = (SECTORS as readonly string[]).find(s => s.toLowerCase() === lowered);
  if (direct) return direct;
  // Title case fallback
  return sector.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

function normalizeLocation(loc: any) {
  if (typeof loc === 'string') {
    const value = loc.toLowerCase();
    const isRemote = value.includes('remote');
    let mode: 'Remote'|'Onsite'|'Hybrid' = isRemote ? 'Remote' : (value.includes('hybrid') ? 'Hybrid' : 'Onsite');
    return { state: '', district: '', isRemote, mode };
  }
  return loc;
}

export function normalizeInternship(raw: unknown) {
  const parsed = InternshipSchema.parse(raw);
  const stipendParsed = parseStipend(parsed.stipend as any);
  const sector = canonicalizeSector(parsed.sector);
  const location = normalizeLocation(parsed.location);
  return {
    ...parsed,
    sector,
    location,
    stipendNumeric: stipendParsed.avg,
    stipendMeta: stipendParsed
  };
}

export function normalizeUserProfile(raw: unknown) {
  const parsed = UserProfileSchema.parse(raw);
  return parsed;
}

// Utility to validate age range separately if needed by UI forms
export function isAgeValid(age: number | null | undefined): boolean {
  if (age == null) return false;
  return age >= 21 && age <= 24;
}
