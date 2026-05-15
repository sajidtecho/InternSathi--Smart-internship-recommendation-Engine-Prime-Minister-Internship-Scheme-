// Define InternshipOpportunity interface locally to remove external dependency
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
}

export class InternshipDataParser {
  /**
   * Parse CSV data from the internship sectors
   */
  static parseCSVData(csvContent: string, sector: string): InternshipOpportunity[] {
    const lines = csvContent.trim().split('\n');
    const internships: InternshipOpportunity[] = [];
    
    // Skip header row
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const [role, company, location] = line.split(',').map(col => col.trim());
      
      if (role && company && location) {
        const internship: InternshipOpportunity = {
          id: `${sector}-${i}`,
          role: role,
          company: company,
          location: location,
          sector: sector,
          workMode: this.inferWorkMode(location),
          requiredSkills: this.inferSkills(role, sector),
          educationRequirement: this.inferEducationRequirement(role),
          companySize: this.inferCompanySize(company)
        };
        
        internships.push(internship);
      }
    }
    
    return internships;
  }
  
  /**
   * Infer work mode from location string
   */
  private static inferWorkMode(location: string): 'remote' | 'hybrid' | 'onsite' {
    const lowerLocation = location.toLowerCase();
    if (lowerLocation.includes('remote')) return 'remote';
    if (lowerLocation.includes('hybrid')) return 'hybrid';
    return 'onsite';
  }
  
  /**
   * Infer required skills based on role and sector
   */
  private static inferSkills(role: string, sector: string): string[] {
    const roleSkills: Record<string, string[]> = {
      'software developer': ['Programming', 'Web Development', 'Database'],
      'software engineer': ['Programming', 'Software Design', 'Problem Solving'],
      'data analyst': ['Data Analysis', 'SQL', 'Excel'],
      'civil engineer': ['AutoCAD', 'Project Management', 'Construction'],
      'mechanical engineer': ['SolidWorks', 'Manufacturing', 'Design'],
      'electrical engineer': ['Circuit Design', 'Electrical Systems', 'CAD'],
      'financial analyst': ['Financial Analysis', 'Excel', 'Accounting'],
      'marketing intern': ['Digital Marketing', 'Communication', 'Content Writing'],
      'hr intern': ['Communication', 'Human Resources', 'Organization'],
      'business analyst': ['Business Analysis', 'Communication', 'Problem Solving'],
      'research intern': ['Research', 'Data Analysis', 'Communication'],
      'content writer': ['Content Writing', 'Communication', 'SEO'],
      'graphic designer': ['Graphic Design', 'Adobe Creative Suite', 'Creativity'],
      'web developer': ['Web Development', 'HTML', 'CSS', 'JavaScript'],
      'mobile developer': ['Mobile Development', 'Programming', 'UI/UX'],
      'qa engineer': ['Quality Assurance', 'Testing', 'Attention to Detail'],
      'product manager': ['Product Management', 'Strategy', 'Communication'],
      'sales intern': ['Sales', 'Communication', 'Customer Service'],
      'operations intern': ['Operations Management', 'Process Improvement', 'Analysis']
    };
    
    const sectorSkills: Record<string, string[]> = {
      'IT': ['Programming', 'Technology', 'Problem Solving'],
      'IT_Software': ['Software Development', 'Programming', 'Technology'],
      'Finance': ['Financial Analysis', 'Accounting', 'Excel'],
      'Manufacturing': ['Manufacturing', 'Quality Control', 'Process Improvement'],
      'Automobile': ['Automotive Engineering', 'Manufacturing', 'CAD'],
      'Pharma': ['Pharmaceutical', 'Research', 'Quality Control'],
      'Chemical': ['Chemistry', 'Process Engineering', 'Safety'],
      'Electronics': ['Electronics', 'Circuit Design', 'Hardware'],
      'Civil': ['Civil Engineering', 'Construction', 'AutoCAD'],
      'Power': ['Electrical Systems', 'Power Engineering', 'Energy'],
      'Media': ['Communication', 'Content Creation', 'Digital Media'],
      'Insurance': ['Risk Assessment', 'Customer Service', 'Finance'],
      'Telecom': ['Telecommunications', 'Networking', 'Technology'],
      'Retail': ['Customer Service', 'Sales', 'Inventory Management'],
      'Engineering': ['Engineering', 'Technical Skills', 'Problem Solving'],
      'Logistics': ['Supply Chain', 'Operations', 'Planning'],
      'Food': ['Food Safety', 'Quality Control', 'Production'],
      'Agro': ['Agriculture', 'Plant Science', 'Research'],
      'Mining': ['Mining Engineering', 'Safety', 'Operations'],
      'Gas': ['Oil and Gas', 'Process Engineering', 'Safety']
    };
    
    const skills: string[] = [];
    
    // Check role-specific skills
    for (const [roleKey, roleSkillList] of Object.entries(roleSkills)) {
      if (role.toLowerCase().includes(roleKey.toLowerCase())) {
        skills.push(...roleSkillList);
        break;
      }
    }
    
    // Add sector-specific skills
    if (sectorSkills[sector]) {
      skills.push(...sectorSkills[sector]);
    }
    
    // Remove duplicates and return first 4 skills
    return [...new Set(skills)].slice(0, 4);
  }
  
  /**
   * Infer education requirement from role
   */
  private static inferEducationRequirement(role: string): string {
    const roleLower = role.toLowerCase();
    
    if (roleLower.includes('engineer') || roleLower.includes('analyst') || roleLower.includes('developer')) {
      return 'Bachelor\'s degree or equivalent';
    }
    
    if (roleLower.includes('intern') || roleLower.includes('trainee')) {
      return 'Currently pursuing or completed Diploma/Bachelor\'s degree';
    }
    
    if (roleLower.includes('manager') || roleLower.includes('lead')) {
      return 'Bachelor\'s degree with relevant experience';
    }
    
    return 'Diploma or Bachelor\'s degree';
  }
  
  /**
   * Infer company size from company name
   */
  private static inferCompanySize(company: string): 'startup' | 'medium' | 'large' {
    const largeCorp = [
      'TCS', 'INFOSYS', 'WIPRO', 'HCL', 'IBM', 'MICROSOFT', 'GOOGLE', 'AMAZON',
      'RELIANCE', 'TATA', 'MAHINDRA', 'BAJAJ', 'MARUTI', 'HDFC', 'ICICI',
      'SBI', 'BHARTI', 'ADANI', 'JSW', 'JINDAL', 'VEDANTA', 'COAL INDIA',
      'ONGC', 'IOC', 'NTPC', 'POWER GRID', 'BHEL', 'L&T', 'ULTRATECH',
      'ASIAN PAINTS', 'NESTLE', 'HINDUSTAN UNILEVER', 'ITC', 'SUN PHARMA',
      'DR. REDDY', 'CIPLA', 'LUPIN', 'GRASIM', 'TECH MAHINDRA', 'COGNIZANT',
      'ACCENTURE', 'CAPGEMINI', 'ORACLE', 'SAP', 'ADOBE', 'SALESFORCE'
    ];
    
    const companyUpper = company.toUpperCase();
    
    for (const corp of largeCorp) {
      if (companyUpper.includes(corp)) {
        return 'large';
      }
    }
    
    // If company name includes "LIMITED" or "LTD", likely medium to large
    if (companyUpper.includes('LIMITED') || companyUpper.includes('LTD') || 
        companyUpper.includes('CORPORATION') || companyUpper.includes('CORP')) {
      return 'medium';
    }
    
    return 'medium'; // Default to medium for unknown companies
  }
  
  /**
   * Load sample internship data for testing
   */
  static getSampleInternships(): InternshipOpportunity[] {
    const sampleData = [
      {
        id: 'IT-1',
        role: 'Software Developer',
        company: 'TCS Limited',
        location: 'Bangalore',
        sector: 'IT',
        workMode: 'hybrid' as const,
        requiredSkills: ['Programming', 'Web Development', 'Database', 'Problem Solving'],
        educationRequirement: 'Bachelor\'s degree in Computer Science or related field',
        companySize: 'large' as const
      },
      {
        id: 'Finance-1',
        role: 'Financial Analyst',
        company: 'HDFC Bank',
        location: 'Mumbai',
        sector: 'Finance',
        workMode: 'onsite' as const,
        requiredSkills: ['Financial Analysis', 'Excel', 'Data Analysis', 'Communication'],
        educationRequirement: 'Bachelor\'s degree in Finance, Economics or related field',
        companySize: 'large' as const
      },
      {
        id: 'Manufacturing-1',
        role: 'Manufacturing Engineer',
        company: 'Maruti Suzuki',
        location: 'Gurugram',
        sector: 'Automobile',
        workMode: 'onsite' as const,
        requiredSkills: ['Manufacturing', 'Quality Control', 'CAD', 'Process Improvement'],
        educationRequirement: 'Bachelor\'s degree in Mechanical Engineering',
        companySize: 'large' as const
      },
      {
        id: 'Electronics-1',
        role: 'Electronics Engineer',
        company: 'Samsung R&D',
        location: 'Bangalore',
        sector: 'Electronics',
        workMode: 'onsite' as const,
        requiredSkills: ['Circuit Design', 'Electronics', 'Hardware', 'Testing'],
        educationRequirement: 'Bachelor\'s degree in Electronics Engineering',
        companySize: 'large' as const
      },
      {
        id: 'Civil-1',
        role: 'Civil Engineer',
        company: 'L&T Construction',
        location: 'Chennai',
        sector: 'Civil',
        workMode: 'onsite' as const,
        requiredSkills: ['AutoCAD', 'Construction', 'Project Management', 'Design'],
        educationRequirement: 'Bachelor\'s degree in Civil Engineering',
        companySize: 'large' as const
      },
      {
        id: 'IT-2',
        role: 'Data Analyst',
        company: 'Flipkart',
        location: 'Bangalore',
        sector: 'IT',
        workMode: 'hybrid' as const,
        requiredSkills: ['Data Analysis', 'SQL', 'Python', 'Statistics'],
        educationRequirement: 'Bachelor\'s degree with strong analytical skills',
        companySize: 'large' as const
      },
      {
        id: 'Media-1',
        role: 'Content Writer',
        company: 'Times Internet',
        location: 'Delhi',
        sector: 'Media',
        workMode: 'remote' as const,
        requiredSkills: ['Content Writing', 'SEO', 'Communication', 'Research'],
        educationRequirement: 'Bachelor\'s degree in any field',
        companySize: 'medium' as const
      },
      {
        id: 'Pharma-1',
        role: 'Research Associate',
        company: 'Sun Pharmaceutical',
        location: 'Mumbai',
        sector: 'Pharma',
        workMode: 'onsite' as const,
        requiredSkills: ['Research', 'Laboratory', 'Quality Control', 'Analysis'],
        educationRequirement: 'Bachelor\'s degree in Pharmacy, Chemistry or Life Sciences',
        companySize: 'large' as const
      },
      {
        id: 'Retail-1',
        role: 'Business Analyst',
        company: 'Reliance Retail',
        location: 'Mumbai',
        sector: 'Retail',
        workMode: 'onsite' as const,
        requiredSkills: ['Business Analysis', 'Data Analysis', 'Communication', 'Excel'],
        educationRequirement: 'Bachelor\'s degree in Business, Commerce or related field',
        companySize: 'large' as const
      },
      {
        id: 'Insurance-1',
        role: 'Insurance Analyst',
        company: 'LIC of India',
        location: 'Chennai',
        sector: 'Insurance',
        workMode: 'onsite' as const,
        requiredSkills: ['Risk Assessment', 'Data Analysis', 'Customer Service', 'Finance'],
        educationRequirement: 'Bachelor\'s degree in any field',
        companySize: 'large' as const
      }
    ];
    
    return sampleData;
  }
}