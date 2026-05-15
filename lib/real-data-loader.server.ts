import fs from 'fs';
import path from 'path';
import { InternshipOpportunity } from './recommendation-types';

// Server-only data loader (uses fs). Do NOT import this in client components.
export class RealDataLoaderServer {
  private static readonly SECTORS_BASE_PATH = path.join(process.cwd(), 'data', 'InternshipSectors');

  private static readonly AVAILABLE_SECTORS = [
    'Agro', 'Automation', 'Automobile', 'Chemical', 'Civil', 'Education',
    'Electronics', 'Engineering', 'Finance', 'Food', 'Gas', 'Insurance',
    'IT', 'IT_Software', 'Jewelry', 'Logistics', 'Manufacturing', 'Media',
    'Mining', 'Paints', 'Pharma', 'Port', 'Power', 'Retail', 'Shipbuilding', 'Telecom'
  ];

  static async loadAllInternships(): Promise<InternshipOpportunity[]> {
    const all: InternshipOpportunity[] = [];
    for (const sector of this.AVAILABLE_SECTORS) {
      try {
        const sectorData = await this.loadSectorData(sector);
        all.push(...sectorData);
      } catch (err) {
        console.warn(`Failed to load data for sector ${sector}:`, err);
      }
    }
    return all;
  }

  static async loadSectorData(sector: string): Promise<InternshipOpportunity[]> {
    const fileName = `${sector.toLowerCase()}_internships.csv`;
    const filePath = path.join(this.SECTORS_BASE_PATH, sector, fileName);
    const csv = fs.readFileSync(filePath, 'utf-8');
    return this.parseCSVData(csv, sector);
  }

  private static parseCSVData(csvContent: string, sector: string): InternshipOpportunity[] {
    const lines = csvContent.trim().split('\n');
    const list: InternshipOpportunity[] = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const parts = this.parseCSVLine(line);
      if (parts.length >= 3) {
        const [role, company, location] = parts;
        if (role && company && location) {
          list.push({
            id: `${sector}-${i}`,
            role: role.trim(),
            company: company.trim(),
            location: location.trim(),
            sector,
            workMode: this.inferWorkMode(location),
            requiredSkills: this.inferSkillsEnhanced(role, sector, company),
            educationRequirement: this.inferEducationRequirement(role, sector),
            companySize: this.inferCompanySizeEnhanced(company),
            description: this.generateDescription(role, company, sector),
            duration: '12 months',
            stipend: '₹5000/month'
          });
        }
      }
    }
    return list;
  }

  private static parseCSVLine(line: string): string[] {
    const parts: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') inQuotes = !inQuotes; else if (ch === ',' && !inQuotes) { parts.push(current.trim()); current=''; } else current += ch;
    }
    if (current) parts.push(current.trim());
    return parts;
  }

  private static inferWorkMode(location: string): 'remote' | 'hybrid' | 'onsite' {
    const low = location.toLowerCase();
    if (low.includes('remote')) return 'remote';
    if (low.includes('hybrid')) return 'hybrid';
    return 'onsite';
  }

  private static inferSkillsEnhanced(role: string, sector: string, company: string): string[] {
    // Simplified reuse: delegate to client util (avoid duplication) if ever refactored.
    // For now we embed minimal logic or could import from a shared util file.
    const skills: Set<string> = new Set();
    const roleLower = role.toLowerCase();
    const roleSkillsMap: Record<string, string[]> = {
      'software engineer': ['Programming', 'Software Development', 'Problem Solving', 'Teamwork'],
      'finance analyst': ['Financial Analysis', 'Excel', 'Data Analysis', 'Reporting'],
      'automobile engineer': ['Automotive Engineering', 'CAD', 'Manufacturing', 'Quality Control']
    };
    for (const [k,v] of Object.entries(roleSkillsMap)) if (roleLower.includes(k)) v.forEach(s=>skills.add(s));
    return Array.from(skills).slice(0,5);
  }

  private static inferEducationRequirement(role: string, sector: string): string {
    const rl = role.toLowerCase();
    if (rl.includes('engineer')) return `Bachelor's degree in ${sector} Engineering or related field`;
    if (rl.includes('analyst')) return `Bachelor's degree in ${sector} or related field`;
    return 'Bachelor\'s degree or equivalent in relevant field';
  }

  private static inferCompanySizeEnhanced(company: string): 'startup' | 'medium' | 'large' {
    const upper = company.toUpperCase();
    if (upper.includes('TATA') || upper.includes('INFOSYS') || upper.includes('WIPRO')) return 'large';
    if (upper.includes('LIMITED') || upper.includes('LTD')) return 'medium';
    return 'medium';
  }

  private static generateDescription(role: string, company: string, sector: string): string {
    return `Join ${company} as a ${role} intern in the ${sector} sector.`;
  }

  static async getDataStatistics() {
    const internships = await this.loadAllInternships();
    const sectorBreakdown: Record<string, number> = {};
    const locationBreakdown: Record<string, number> = {};
    const workModeBreakdown: Record<string, number> = {};
    const companies = new Set<string>();
    internships.forEach(i => {
      sectorBreakdown[i.sector] = (sectorBreakdown[i.sector]||0)+1;
      const loc = i.location.replace(/^(Remote|Hybrid)\s*-\s*/,'').trim();
      locationBreakdown[loc] = (locationBreakdown[loc]||0)+1;
      workModeBreakdown[i.workMode] = (workModeBreakdown[i.workMode]||0)+1;
      companies.add(i.company);
    });
    return { totalInternships: internships.length, sectorBreakdown, companyCount: companies.size, locationBreakdown, workModeBreakdown };
  }
}
