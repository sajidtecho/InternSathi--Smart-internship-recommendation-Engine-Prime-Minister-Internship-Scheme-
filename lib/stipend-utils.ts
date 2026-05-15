import { z } from 'zod';

/**
 * Parsed stipend structure
 */
export interface ParsedStipend {
  raw: string | number | null;
  type: 'unpaid' | 'fixed' | 'range' | 'performance' | 'unknown';
  min: number; // 0 if unpaid
  max: number; // same as min for fixed
  avg: number; // convenience ( (min+max)/2 )
  currency: 'INR';
}

// Common patterns we may see in stipend strings
const UNPAID_REGEX = /(unpaid|no stipend|without\s+stipend)/i;
const PERFORMANCE_REGEX = /(performance|incentive|commission)/i;
const RANGE_REGEX = /(?:₹|rs\.?|inr)?\s*([\d,]+)\s*(?:-|to|–|—)\s*(?:₹|rs\.?|inr)?\s*([\d,]+)/i;
const SINGLE_NUMBER_REGEX = /(?:₹|rs\.?|inr)?\s*([\d][\d,]*)/i;

/**
 * Normalizes numeric-like strings ("5,000" -> 5000, "10k" -> 10000)
 */
function parseNumber(val: string): number {
  const kMatch = val.toLowerCase().match(/(\d+(?:\.\d+)?)\s*k/); // 10k, 7.5k
  if (kMatch) return Math.round(parseFloat(kMatch[1]) * 1000);
  return parseInt(val.replace(/[,]/g, ''), 10);
}

/**
 * Parse stipend into structured form.
 * Accepts number or string; returns best-effort interpretation.
 */
export function parseStipend(raw: string | number | null | undefined): ParsedStipend {
  if (raw === null || raw === undefined || raw === '') {
    return { raw: raw ?? null, type: 'unknown', min: 0, max: 0, avg: 0, currency: 'INR' };
  }

  if (typeof raw === 'number') {
    return { raw, type: raw === 0 ? 'unpaid' : 'fixed', min: raw, max: raw, avg: raw, currency: 'INR' };
  }

  const input = raw.trim();

  if (UNPAID_REGEX.test(input)) {
    return { raw, type: 'unpaid', min: 0, max: 0, avg: 0, currency: 'INR' };
  }
  if (PERFORMANCE_REGEX.test(input)) {
    // Could be unknown min/max but performance based
    return { raw, type: 'performance', min: 0, max: 0, avg: 0, currency: 'INR' };
  }
  const range = input.match(RANGE_REGEX);
  if (range) {
    const min = parseNumber(range[1]);
    const max = parseNumber(range[2]);
    const avg = Math.round((min + max) / 2);
    return { raw, type: 'range', min, max, avg, currency: 'INR' };
  }
  const single = input.match(SINGLE_NUMBER_REGEX);
  if (single) {
    const val = parseNumber(single[1]);
    return { raw, type: val === 0 ? 'unpaid' : 'fixed', min: val, max: val, avg: val, currency: 'INR' };
  }

  return { raw, type: 'unknown', min: 0, max: 0, avg: 0, currency: 'INR' };
}

export const StipendExpectationSchema = z.union([
  z.number().nonnegative(),
  z.string().min(0)
]).optional();
