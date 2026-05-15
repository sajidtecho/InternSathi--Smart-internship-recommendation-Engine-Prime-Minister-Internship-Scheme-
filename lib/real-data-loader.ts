// Client-safe loader with dynamic data generation based on user profile
import { Internship, UserProfile } from './recommendation-types';

// Extended internship type for internal score calculation
interface InternshipWithScore extends Internship {
  _skillScore?: number;
}

export class ClientDataLoader {
  // Database of all possible internships across sectors
  private static readonly ALL_INTERNSHIPS: Internship[] = [
    // IT & Technology Sector
    {
      id: 'IT-1',
      title: 'Software Engineer Intern',
      company: 'TATA CONSULTANCY SERVICES LIMITED',
      sector: 'IT',
      requiredEducation: ['Graduate'],
      requiredSkills: ['Programming', 'Software Development'],
      preferredSkills: ['Problem Solving', 'Teamwork'],
      location: {
        state: 'Karnataka',
        district: 'Bangalore Urban',
        isRemote: false,
        mode: 'Hybrid'
      },
      stipend: 5000,
      duration: '12 months',
      benefits: ['Health Insurance', 'Training Programs', 'Mentorship'],
      description: 'Join TCS as a Software Engineer intern in the IT sector. Gain hands-on experience in software development and work on real-world projects.',
      applicationDeadline: '2025-12-31',
      startDate: '2026-01-15',
      difficulty: 'Beginner',
      popularity: 9
    },
    {
      id: 'IT-2',
      title: 'Data Science Intern',
      company: 'INFOSYS LIMITED',
      sector: 'IT',
      requiredEducation: ['Graduate'],
      requiredSkills: ['Python', 'Statistics'],
      preferredSkills: ['Machine Learning', 'Data Visualization'],
      location: {
        state: 'Tamil Nadu',
        district: 'Chennai',
        isRemote: true,
        mode: 'Remote'
      },
  stipend: 5000,
      duration: '12 months',
      benefits: ['Project Exposure', 'Industry Certification', 'Career Mentoring'],
      description: 'Join Infosys as a Data Science intern. Work with large datasets and build predictive models.',
      applicationDeadline: '2025-11-30',
      startDate: '2026-01-01',
      difficulty: 'Intermediate',
      popularity: 8
    },
    {
      id: 'IT-3',
      title: 'Cybersecurity Analyst Intern',
      company: 'WIPRO LIMITED',
      sector: 'IT',
      requiredEducation: ['Graduate', 'PostGraduate'],
      requiredSkills: ['Network Security', 'Ethical Hacking'],
      preferredSkills: ['CISSP Knowledge', 'Penetration Testing'],
      location: {
        state: 'Telangana',
        district: 'Hyderabad',
        isRemote: false,
        mode: 'Onsite'
      },
  stipend: 5000,
      duration: '6 months',
      benefits: ['Security Certification', 'Hands-on Lab Work', 'Industry Exposure'],
      description: 'Join Wipro as a Cybersecurity Analyst intern. Learn about threat detection and prevention.',
      applicationDeadline: '2025-10-31',
      startDate: '2025-12-01',
      difficulty: 'Advanced',
      popularity: 7
    },
    
    // Finance Sector
    {
      id: 'Finance-1',
      title: 'Finance Analyst Intern',
      company: 'ICICI BANK LIMITED',
      sector: 'Finance',
      requiredEducation: ['Graduate'],
      requiredSkills: ['Financial Analysis', 'Excel'],
      preferredSkills: ['Data Analysis', 'Reporting'],
      location: {
        state: 'Maharashtra',
        district: 'Mumbai',
        isRemote: true,
        mode: 'Remote'
      },
      stipend: 5000,
      duration: '12 months',
      benefits: ['Health Insurance', 'Performance Bonus', 'Flexible Hours'],
      description: 'Join ICICI Bank as a Finance Analyst intern. Learn financial modeling and analysis.',
      applicationDeadline: '2025-12-31',
      startDate: '2026-01-15',
      difficulty: 'Intermediate',
      popularity: 8
    },
    {
      id: 'Finance-2',
      title: 'Investment Banking Intern',
      company: 'HDFC BANK LIMITED',
      sector: 'Finance',
      requiredEducation: ['Graduate', 'PostGraduate'],
      requiredSkills: ['Financial Modeling', 'Market Research'],
      preferredSkills: ['CFA Knowledge', 'Valuation'],
      location: {
        state: 'Maharashtra',
        district: 'Mumbai',
        isRemote: false,
        mode: 'Onsite'
      },
  stipend: 5000,
      duration: '6 months',
      benefits: ['Networking Events', 'Industry Training', 'Deal Exposure'],
      description: 'Join HDFC Bank as an Investment Banking intern. Learn about mergers, acquisitions, and capital markets.',
      applicationDeadline: '2025-11-30',
      startDate: '2026-01-01',
      difficulty: 'Advanced',
      popularity: 7
    },
    {
      id: 'Finance-3',
      title: 'Accounting Intern',
      company: 'STATE BANK OF INDIA',
      sector: 'Finance',
      requiredEducation: ['12th', 'Graduate'],
      requiredSkills: ['Accounting', 'Basic Mathematics'],
      preferredSkills: ['Tally', 'MS Excel'],
      location: {
        state: 'Delhi',
        district: 'New Delhi',
        isRemote: false,
        mode: 'Hybrid'
      },
      stipend: 5000,
      duration: '12 months',
      benefits: ['Banking Exposure', 'Financial Training', 'Career Development'],
      description: 'Join SBI as an Accounting intern. Learn banking operations and financial management.',
      applicationDeadline: '2025-12-15',
      startDate: '2026-01-15',
      difficulty: 'Beginner',
      popularity: 6
    },
    
    // Healthcare Sector
    {
      id: 'Healthcare-1',
      title: 'Healthcare Data Analyst Intern',
      company: 'AIIMS NEW DELHI',
      sector: 'Healthcare',
      requiredEducation: ['Graduate'],
      requiredSkills: ['Data Analysis', 'Healthcare Knowledge'],
      preferredSkills: ['Research', 'Communication'],
      location: {
        state: 'Delhi',
        district: 'New Delhi',
        isRemote: false,
        mode: 'Onsite'
      },
  stipend: 5000,
      duration: '6 months',
      benefits: ['Medical Insurance', 'Research Experience', 'Publication Opportunities'],
      description: 'Join AIIMS as a Healthcare Analyst intern. Work on medical data analysis projects.',
      applicationDeadline: '2025-12-31',
      startDate: '2026-01-15',
      difficulty: 'Intermediate',
      popularity: 7
    },
    {
      id: 'Healthcare-2',
      title: 'Pharmacy Assistant Intern',
      company: 'APOLLO HOSPITALS',
      sector: 'Healthcare',
      requiredEducation: ['12th', 'Diploma', 'Graduate'],
      requiredSkills: ['Basic Medical Knowledge', 'Customer Service'],
      preferredSkills: ['Inventory Management', 'Pharmacy Software'],
      location: {
        state: 'Maharashtra',
        district: 'Mumbai',
        isRemote: false,
        mode: 'Onsite'
      },
      stipend: 5000,
      duration: '12 months',
      benefits: ['Healthcare Training', 'Professional Development', 'Certification'],
      description: 'Join Apollo Hospitals as a Pharmacy Assistant intern. Learn about pharmaceutical operations.',
      applicationDeadline: '2025-11-30',
      startDate: '2025-12-15',
      difficulty: 'Beginner',
      popularity: 6
    },
    {
      id: 'Healthcare-3',
      title: 'Medical Equipment Technician Intern',
      company: 'FORTIS HEALTHCARE',
      sector: 'Healthcare',
      requiredEducation: ['Diploma', 'Graduate'],
      requiredSkills: ['Technical Knowledge', 'Equipment Handling'],
      preferredSkills: ['Electronics', 'Mechanical Skills'],
      location: {
        state: 'Karnataka',
        district: 'Bangalore Urban',
        isRemote: false,
        mode: 'Onsite'
      },
  stipend: 5000,
      duration: '12 months',
      benefits: ['Technical Training', 'Certification', 'Career Growth'],
      description: 'Join Fortis Healthcare as a Medical Equipment Technician intern. Learn to maintain and operate medical devices.',
      applicationDeadline: '2025-12-15',
      startDate: '2026-01-01',
      difficulty: 'Intermediate',
      popularity: 5
    },
    
    // Government Sector
    {
      id: 'Gov-1',
      title: 'Policy Research Intern',
      company: 'MINISTRY OF EXTERNAL AFFAIRS',
      sector: 'Government',
      requiredEducation: ['Graduate'],
      requiredSkills: ['Research', 'Policy Analysis'],
      preferredSkills: ['Communication', 'Government Affairs'],
      location: {
        state: 'Delhi',
        district: 'New Delhi',
        isRemote: false,
        mode: 'Onsite'
      },
  stipend: 5000,
      duration: '6 months',
      benefits: ['Government Experience', 'Networking', 'Certificate'],
      description: 'Join MEA as a Policy Research intern. Work on international relations and policy research.',
      applicationDeadline: '2025-12-31',
      startDate: '2026-01-15',
      difficulty: 'Advanced',
      popularity: 6
    },
    {
      id: 'Gov-2',
      title: 'E-Governance Support Intern',
      company: 'MINISTRY OF ELECTRONICS AND IT',
      sector: 'Government',
      requiredEducation: ['Graduate'],
      requiredSkills: ['Basic IT', 'Documentation'],
      preferredSkills: ['Project Management', 'Public Administration'],
      location: {
        state: 'Delhi',
        district: 'New Delhi',
        isRemote: true,
        mode: 'Remote'
      },
  stipend: 5000,
      duration: '12 months',
      benefits: ['Digital Skills', 'Government Exposure', 'Professional Network'],
      description: 'Join MeitY as an E-Governance Support intern. Support digital India initiatives and e-governance projects.',
      applicationDeadline: '2025-11-30',
      startDate: '2025-12-15',
      difficulty: 'Beginner',
      popularity: 7
    },
    {
      id: 'Gov-3',
      title: 'Public Administration Intern',
      company: 'MINISTRY OF HOME AFFAIRS',
      sector: 'Government',
      requiredEducation: ['Graduate', 'PostGraduate'],
      requiredSkills: ['Administration', 'Documentation'],
      preferredSkills: ['Public Policy', 'Government Systems'],
      location: {
        state: 'Delhi',
        district: 'New Delhi',
        isRemote: false,
        mode: 'Onsite'
      },
  stipend: 5000,
      duration: '6 months',
      benefits: ['Administrative Experience', 'Government Knowledge', 'Career Prospects'],
      description: 'Join MHA as a Public Administration intern. Learn about government administrative processes.',
      applicationDeadline: '2025-12-15',
      startDate: '2026-01-01',
      difficulty: 'Intermediate',
      popularity: 5
    },
    
    // Marketing Sector
    {
      id: 'Marketing-1',
      title: 'Digital Marketing Intern',
      company: 'RELIANCE INDUSTRIES LIMITED',
      sector: 'Marketing',
      requiredEducation: ['Graduate'],
      requiredSkills: ['Digital Marketing', 'Social Media'],
      preferredSkills: ['Content Creation', 'Analytics'],
      location: {
        state: 'Maharashtra',
        district: 'Mumbai',
        isRemote: false,
        mode: 'Hybrid'
      },
  stipend: 5000,
      duration: '12 months',
      benefits: ['Brand Exposure', 'Creative Freedom', 'Industry Connections'],
      description: 'Join Reliance as a Digital Marketing intern. Work on digital campaigns and brand promotion.',
      applicationDeadline: '2025-12-31',
      startDate: '2026-01-15',
      difficulty: 'Beginner',
      popularity: 8
    },
    {
      id: 'Marketing-2',
      title: 'Brand Management Intern',
      company: 'HINDUSTAN UNILEVER LIMITED',
      sector: 'Marketing',
      requiredEducation: ['Graduate'],
      requiredSkills: ['Brand Strategy', 'Market Research'],
      preferredSkills: ['Consumer Behavior', 'Product Management'],
      location: {
        state: 'Maharashtra',
        district: 'Mumbai',
        isRemote: false,
        mode: 'Onsite'
      },
  stipend: 5000,
      duration: '6 months',
      benefits: ['Brand Exposure', 'FMCG Experience', 'Professional Development'],
      description: 'Join HUL as a Brand Management intern. Learn about consumer goods marketing and brand development.',
      applicationDeadline: '2025-11-30',
      startDate: '2025-12-15',
      difficulty: 'Intermediate',
      popularity: 7
    },
    {
      id: 'Marketing-3',
      title: 'Market Research Intern',
      company: 'ITC LIMITED',
      sector: 'Marketing',
      requiredEducation: ['Graduate', 'PostGraduate'],
      requiredSkills: ['Data Analysis', 'Market Research'],
      preferredSkills: ['Statistical Tools', 'Survey Design'],
      location: {
        state: 'West Bengal',
        district: 'Kolkata',
        isRemote: true,
        mode: 'Remote'
      },
      stipend: 5000,
      duration: '12 months',
      benefits: ['Research Experience', 'Data Analysis Skills', 'Industry Knowledge'],
      description: 'Join ITC as a Market Research intern. Conduct consumer studies and market analysis.',
      applicationDeadline: '2025-12-15',
      startDate: '2026-01-01',
      difficulty: 'Intermediate',
      popularity: 6
    },
    
    // Manufacturing Sector
    {
      id: 'Manufacturing-1',
      title: 'Production Engineer Intern',
      company: 'TATA STEEL LIMITED',
      sector: 'Manufacturing',
      requiredEducation: ['Diploma', 'Graduate'],
      requiredSkills: ['Engineering Basics', 'Technical Knowledge'],
      preferredSkills: ['AutoCAD', 'Quality Control'],
      location: {
        state: 'Jharkhand',
        district: 'Jamshedpur',
        isRemote: false,
        mode: 'Onsite'
      },
  stipend: 5000,
      duration: '12 months',
      benefits: ['Technical Training', 'Industry Exposure', 'Safety Certification'],
      description: 'Join Tata Steel as a Production Engineer intern. Learn about steel manufacturing processes.',
      applicationDeadline: '2025-12-31',
      startDate: '2026-01-15',
      difficulty: 'Intermediate',
      popularity: 7
    },
    {
      id: 'Manufacturing-2',
      title: 'Quality Assurance Intern',
      company: 'MARUTI SUZUKI INDIA LIMITED',
      sector: 'Manufacturing',
      requiredEducation: ['Diploma', 'Graduate'],
      requiredSkills: ['Quality Control', 'Attention to Detail'],
      preferredSkills: ['Statistical Analysis', 'Process Improvement'],
      location: {
        state: 'Haryana',
        district: 'Gurugram',
        isRemote: false,
        mode: 'Onsite'
      },
  stipend: 5000,
      duration: '6 months',
      benefits: ['Automotive Knowledge', 'Quality Management Skills', 'Industry Certification'],
      description: 'Join Maruti Suzuki as a Quality Assurance intern. Learn quality control processes in automotive manufacturing.',
      applicationDeadline: '2025-11-30',
      startDate: '2025-12-15',
      difficulty: 'Beginner',
      popularity: 6
    },
    {
      id: 'Manufacturing-3',
      title: 'Supply Chain Management Intern',
      company: 'MAHINDRA & MAHINDRA LIMITED',
      sector: 'Manufacturing',
      requiredEducation: ['Graduate', 'PostGraduate'],
      requiredSkills: ['Logistics Knowledge', 'Inventory Management'],
      preferredSkills: ['ERP Systems', 'Process Optimization'],
      location: {
        state: 'Maharashtra',
        district: 'Pune',
        isRemote: false,
        mode: 'Hybrid'
      },
  stipend: 5000,
      duration: '12 months',
      benefits: ['Supply Chain Expertise', 'Industry Network', 'Professional Development'],
      description: 'Join Mahindra as a Supply Chain Management intern. Learn about logistics and inventory management.',
      applicationDeadline: '2025-12-15',
      startDate: '2026-01-01',
      difficulty: 'Intermediate',
      popularity: 7
    }
  ];

  static getSampleRealData(userProfile?: UserProfile): Internship[] {
    if (!userProfile) {
      // Return a diverse sample if no user profile provided
      return this.ALL_INTERNSHIPS.slice(0, 10);
    }
    
    // Filter and rank internships based on user profile
    let filteredInternships = [...this.ALL_INTERNSHIPS];
    
    // Filter by sector interests if specified
    if (userProfile.interests && userProfile.interests.length > 0) {
      const userInterests = userProfile.interests.map(i => i.toLowerCase());
      // Include internships that match user interests, but keep at least some diverse options
      const matchingInternships = filteredInternships.filter(
        internship => userInterests.includes(internship.sector.toLowerCase())
      );
      
      // If we have enough matching internships, prioritize them but keep some diverse options
      if (matchingInternships.length >= 5) {
        const nonMatchingInternships = filteredInternships.filter(
          internship => !userInterests.includes(internship.sector.toLowerCase())
        );
        // Combine matching internships with some diverse options
        filteredInternships = [
          ...matchingInternships,
          ...nonMatchingInternships.slice(0, 5)
        ];
      }
    }
    
    // Filter by work mode preference if specified and not "Any"
    if (userProfile.workMode && userProfile.workMode !== "Any") {
      const workModeFiltered = filteredInternships.filter(
        internship => internship.location.mode === userProfile.workMode || 
                     (userProfile.workMode === "Hybrid" && ["Onsite", "Remote"].includes(internship.location.mode))
      );
      
      // Only apply filter if we still have enough internships left
      if (workModeFiltered.length >= 5) {
        filteredInternships = workModeFiltered;
      }
    }
    
    // Filter by duration preference if specified and not "Any"
    if (userProfile.duration && userProfile.duration !== "Any") {
      const durationFiltered = filteredInternships.filter(
        internship => internship.duration === userProfile.duration
      );
      
      // Only apply filter if we still have enough internships left
      if (durationFiltered.length >= 5) {
        filteredInternships = durationFiltered;
      }
    }
    
    // Apply educational qualification filtering
    if (userProfile.education) {
      const educationFiltered = filteredInternships.filter(internship => 
        internship.requiredEducation.some(edu => {
          // Map user education to match internship requirements
          if (userProfile.education === "PostGraduate" || userProfile.education === "PhD") {
            return true; // PostGrads and PhDs qualify for all positions
          } else if (userProfile.education === "Graduate") {
            return ["12th", "Diploma", "Graduate"].includes(edu);
          } else if (userProfile.education === "Diploma") {
            return ["12th", "Diploma"].includes(edu);
          } else if (userProfile.education === "12th") {
            return ["12th"].includes(edu);
          }
          return false;
        })
      );
      
      // Only apply filter if we still have enough internships left
      if (educationFiltered.length >= 5) {
        filteredInternships = educationFiltered;
      }
    }
    
    // Apply skill-based scoring (higher rank for internships matching user skills)
    if (userProfile.skills && userProfile.skills.length > 0) {
      const userSkills = userProfile.skills.map(s => s.toLowerCase());
      
      const scoredInternships: InternshipWithScore[] = filteredInternships.map(internship => {
        // Calculate how many user skills match the internship required/preferred skills
        const requiredSkills = internship.requiredSkills.map(s => s.toLowerCase());
        const preferredSkills = internship.preferredSkills?.map(s => s.toLowerCase()) || [];
        
        const matchingRequiredSkills = userSkills.filter(skill => 
          requiredSkills.some(reqSkill => reqSkill.includes(skill) || skill.includes(reqSkill))
        ).length;
        
        const matchingPreferredSkills = userSkills.filter(skill => 
          preferredSkills.some(prefSkill => prefSkill.includes(skill) || skill.includes(prefSkill))
        ).length;
        
        // Calculate a skill match score
        const skillScore = matchingRequiredSkills * 2 + matchingPreferredSkills;
        
        // Return internship with score attached
        return {
          ...internship,
          _skillScore: skillScore
        };
      });
      
      // Sort by skill score (higher scores first)
      scoredInternships.sort((a, b) => (b._skillScore || 0) - (a._skillScore || 0));
      
      // Remove our temporary scoring property and convert back to regular internships
      filteredInternships = scoredInternships.map(({ _skillScore, ...rest }) => rest as Internship);
    }
    
    // Further refine based on location if specified
    if (userProfile.location && userProfile.location.state) {
      // Prioritize internships in the user's state
      const userState = userProfile.location.state.toLowerCase();
      
      // Split internships into same-state and different-state groups
      const sameStateInternships = filteredInternships.filter(
        internship => internship.location.state.toLowerCase() === userState
      );
      
      const differentStateInternships = filteredInternships.filter(
        internship => internship.location.state.toLowerCase() !== userState
      );
      
      // Prioritize same-state internships but keep diversity
      if (sameStateInternships.length >= 5) {
        // Get top same-state internships and some different-state for diversity
        filteredInternships = [
          ...sameStateInternships.slice(0, Math.min(sameStateInternships.length, 7)),
          ...differentStateInternships.slice(0, 3)
        ];
      }
    }
    
    // Ensure variety by including at least one internship from each sector if possible
    const sectorsNeeded = [...new Set(this.ALL_INTERNSHIPS.map(i => i.sector))];
    let diverseSet: Internship[] = [];
    
    // Add one internship from each sector
    for (const sector of sectorsNeeded) {
      const sectorInternship = filteredInternships.find(i => i.sector === sector);
      if (sectorInternship && !diverseSet.some(i => i.sector === sector)) {
        diverseSet.push(sectorInternship);
      }
    }
    
    // Add remaining internships while maintaining diversity
    const remainingInternships = filteredInternships.filter(
      internship => !diverseSet.some(i => i.id === internship.id)
    );
    
    // Add from remaining, but prioritize diversity in sectors
    let sectorCount: {[key: string]: number} = {};
    diverseSet.forEach(i => sectorCount[i.sector] = (sectorCount[i.sector] || 0) + 1);
    
    // Sort remaining by least represented sectors
    remainingInternships.sort((a, b) => {
      const countA = sectorCount[a.sector] || 0;
      const countB = sectorCount[b.sector] || 0;
      if (countA !== countB) {
        return countA - countB; // Prioritize underrepresented sectors
      }
      // If same sector representation, use popularity as tie-breaker
      return b.popularity - a.popularity;
    });
    
    // Add remaining internships up to desired limit
    diverseSet = [...diverseSet, ...remainingInternships].slice(0, 10);
    
    // Final sort by difficulty (easier first) and popularity (higher first)
    diverseSet.sort((a, b) => {
      const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
      const diffA = difficultyOrder[a.difficulty as keyof typeof difficultyOrder];
      const diffB = difficultyOrder[b.difficulty as keyof typeof difficultyOrder];
      
      if (diffA !== diffB) {
        return diffA - diffB; // Sort by difficulty (beginner first)
      }
      
      return b.popularity - a.popularity; // Then by popularity
    });
    
    return diverseSet;
  }
}

/**
 * Get stored user data from both Voice Assistant and Registration form
 */
export function getStoredUserData(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const item = window.localStorage.getItem('userData');
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error reading from localStorage', error);
    return null;
  }
}

export function storeUserData(userData: UserProfile): void {
  if (typeof window === 'undefined') return;
  try {
    const item = JSON.stringify(userData);
    window.localStorage.setItem('userData', item);
  } catch (error) {
    console.error('Error writing to localStorage', error);
  }
}