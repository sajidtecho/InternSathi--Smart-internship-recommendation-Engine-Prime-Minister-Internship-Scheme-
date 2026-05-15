import { Internship } from './recommendation-types';

// Real internship data from PM Internship Scheme partner companies
// Updated based on official PM Internship Portal guidelines 2024-25
export const SAMPLE_INTERNSHIPS: Internship[] = [
  {
    id: "1",
    title: "Software Development Trainee",
    company: "Tata Consultancy Services Limited",
    sector: "IT",
    requiredEducation: ["12th", "Graduate", "PostGraduate"],
    requiredSkills: ["Computer Basics", "Communication", "English"],
    preferredSkills: ["Programming", "Java", "Web Development"],
    location: {
      state: "Maharashtra", 
      district: "Mumbai",
      isRemote: false,
      mode: "Onsite"
    },
    stipend: 5000, // Standard PM Internship stipend
    duration: "12 months", // Standard PM scheme duration
    benefits: ["Certificate", "Skill Development", "Job Opportunity", "Monthly Stipend"],
    description: "Learn software development fundamentals with India's largest IT services company under PM Internship Scheme",
    applicationDeadline: "2025-12-31",
    startDate: "2026-01-15",
    difficulty: "Beginner",
    popularity: 9
  },
  
  {
    id: "2", 
    title: "Digital Marketing Associate",
    company: "Reliance Industries Limited",
    sector: "Marketing",
    requiredEducation: ["12th", "Graduate"],
    requiredSkills: ["Communication", "English", "Basic Computer"],
    preferredSkills: ["Social Media", "Content Creation", "Digital Marketing"],
    location: {
      state: "Gujarat",
      district: "Ahmedabad", 
      isRemote: false,
      mode: "Onsite"
    },
    stipend: 5000,
    duration: "12 months",
    benefits: ["Monthly Stipend", "Industry Training", "Certificate", "Job Prospects"],
    description: "Learn digital marketing and brand management with India's largest private company",
    applicationDeadline: "2025-11-30",
    startDate: "2025-12-01",
    difficulty: "Beginner",
    popularity: 8
  },

  {
    id: "3",
    title: "Banking Operations Assistant", 
    company: "HDFC Bank Limited",
    sector: "Finance",
    requiredEducation: ["12th", "Graduate"],
    requiredSkills: ["Mathematics", "Communication", "Computer Basics"],
    preferredSkills: ["Customer Service", "Banking Knowledge", "Hindi"],
    location: {
      state: "Maharashtra",
      district: "Mumbai",
      isRemote: false,
      mode: "Onsite"
    },
    stipend: 5000,
    duration: "12 months",
    benefits: ["Monthly Stipend", "Banking Certification", "Financial Literacy", "Career Growth"],
    description: "Gain practical banking experience with one of India's leading private banks",
    applicationDeadline: "2025-12-15",
    startDate: "2026-01-01",
    difficulty: "Beginner",
    popularity: 7
  },

  {
    id: "4",
    title: "Manufacturing Support Associate",
    company: "Mahindra and Mahindra Limited",
    sector: "Manufacturing",
    requiredEducation: ["12th", "Diploma", "Graduate"],
    requiredSkills: ["Basic Technical", "Safety Awareness", "Communication"],
    preferredSkills: ["Mechanical Knowledge", "Engineering Basics", "Quality Control"],
    location: {
      state: "Tamil Nadu",
      district: "Chennai",
      isRemote: false,
      mode: "Onsite"
    },
    stipend: 5000,
    duration: "12 months", 
    benefits: ["Monthly Stipend", "Technical Training", "Safety Certification", "Industry Experience"],
    description: "Learn automotive manufacturing processes and quality control systems",
    applicationDeadline: "2025-11-20",
    startDate: "2025-12-10",
    difficulty: "Beginner",
    popularity: 6
  },

  {
    id: "5",
    title: "IT Support Assistant",
    company: "Infosys Limited",
    sector: "IT",
    requiredEducation: ["12th", "Graduate"],
    requiredSkills: ["Computer Basics", "Communication", "Problem Solving"],
    preferredSkills: ["Hardware Knowledge", "Software Troubleshooting", "English"],
    location: {
      state: "Karnataka",
      district: "Bangalore",
      isRemote: false,
      mode: "Onsite"
    },
    stipend: 5000,
    duration: "12 months",
    benefits: ["Monthly Stipend", "Technical Certification", "IT Skills", "Career Guidance"],
    description: "Develop IT support skills and learn about modern technology infrastructure",
    applicationDeadline: "2025-12-10",
    startDate: "2025-12-20",
    difficulty: "Beginner",
    popularity: 8
  },

  {
    id: "6",
    title: "Content Development Trainee",
    company: "Bennett Coleman and Company Limited",
    sector: "Media",
    requiredEducation: ["12th", "Graduate"],
    requiredSkills: ["English", "Writing", "Communication"],
    preferredSkills: ["Content Creation", "Social Media", "Journalism"],
    location: {
      state: "Maharashtra",
      district: "Mumbai",
      isRemote: false,
      mode: "Onsite"
    },
    stipend: 5000,
    duration: "12 months",
    benefits: ["Monthly Stipend", "Media Training", "Portfolio Development", "Writing Skills"],
    description: "Learn content creation and digital media management with leading media house",
    applicationDeadline: "2025-11-25",
    startDate: "2025-12-05",
    difficulty: "Beginner",
    popularity: 7
  },

  {
    id: "7",
    title: "Administrative Support Executive",
    company: "Oil and Natural Gas Corporation Limited",
    sector: "Government",
    requiredEducation: ["12th", "Graduate"],
    requiredSkills: ["Computer Basics", "Hindi", "English"],
    preferredSkills: ["MS Office", "Data Entry", "Documentation"],
    location: {
      state: "Uttar Pradesh",
      district: "Lucknow",
      isRemote: false,
      mode: "Onsite"
    },
    stipend: 5000,
    duration: "12 months",
    benefits: ["Monthly Stipend", "Government Experience", "Computer Skills", "Professional Development"],
    description: "Support administrative operations in India's premier oil & gas company",
    applicationDeadline: "2025-12-20",
    startDate: "2026-01-10",
    difficulty: "Beginner",
    popularity: 9
  },

  {
    id: "8",
    title: "Retail Operations Trainee",
    company: "Reliance Retail Limited",
    sector: "Retail", 
    requiredEducation: ["12th"],
    requiredSkills: ["Communication", "Customer Service", "Basic Mathematics"],
    preferredSkills: ["Sales", "Hindi", "Local Language"],
    location: {
      state: "Gujarat",
      district: "Ahmedabad",
      isRemote: false,
      mode: "Onsite"
    },
    stipend: 5000,
    duration: "12 months",
    benefits: ["Monthly Stipend", "Retail Training", "Customer Service Skills", "Sales Experience"],
    description: "Learn retail operations and customer relationship management",
    applicationDeadline: "2025-11-15",
    startDate: "2025-11-30",
    difficulty: "Beginner",
    popularity: 6
  },

  {
    id: "9",
    title: "Quality Assurance Trainee",
    company: "Wipro Limited",
    sector: "IT",
    requiredEducation: ["12th", "Graduate", "PostGraduate"],
    requiredSkills: ["Computer Basics", "Logical Thinking", "Communication"],
    preferredSkills: ["Testing Basics", "Software Knowledge", "Problem Solving"],
    location: {
      state: "Karnataka",
      district: "Bangalore",
      isRemote: false,
      mode: "Onsite"
    },
    stipend: 5000,
    duration: "12 months",
    benefits: ["Monthly Stipend", "Technical Training", "Software Testing Skills", "Career Path"],
    description: "Learn software testing and quality assurance in enterprise environments",
    applicationDeadline: "2025-12-05",
    startDate: "2025-12-15",
    difficulty: "Beginner",
    popularity: 8
  },

  {
    id: "10",
    title: "Power Sector Associate",
    company: "NTPC Limited",
    sector: "Energy & Power",
    requiredEducation: ["12th", "Diploma", "Graduate"],
    requiredSkills: ["Basic Technical", "Safety Awareness", "Communication"],
    preferredSkills: ["Electrical Basics", "Power Systems", "Engineering"],
    location: {
      state: "Delhi",
      district: "New Delhi",
      isRemote: false,
      mode: "Onsite"
    },
    stipend: 5000,
    duration: "12 months",
    benefits: ["Monthly Stipend", "Technical Training", "Power Sector Knowledge", "Safety Certification"],
    description: "Learn about power generation and energy sector operations",
    applicationDeadline: "2025-12-25",
    startDate: "2026-01-05",
    difficulty: "Beginner",
    popularity: 7
  },

  {
    id: "11",
    title: "Production Support Trainee",
    company: "Tata Steel Limited",
    sector: "Manufacturing",
    requiredEducation: ["12th", "Diploma"],
    requiredSkills: ["Safety Awareness", "Basic Technical", "Teamwork"],
    preferredSkills: ["Mechanical Understanding", "Quality Control", "Industrial Safety"],
    location: {
      state: "Jharkhand",
      district: "Jamshedpur",
      isRemote: false,
      mode: "Onsite"
    },
    stipend: 5000,
    duration: "12 months",
    benefits: ["Monthly Stipend", "Industrial Training", "Safety Certification", "Technical Skills"],
    description: "Learn steel production processes and industrial safety standards",
    applicationDeadline: "2025-11-30",
    startDate: "2025-12-15",
    difficulty: "Beginner",
    popularity: 6
  },

  {
    id: "12",
    title: "Marketing Support Associate",
    company: "ITC Limited",
    sector: "FMCG",
    requiredEducation: ["12th", "Graduate"],
    requiredSkills: ["Communication", "Basic Computer", "English"],
    preferredSkills: ["Marketing Basics", "Sales Support", "Customer Relations"],
    location: {
      state: "West Bengal",
      district: "Kolkata",
      isRemote: false,
      mode: "Onsite"
    },
    stipend: 5000,
    duration: "12 months",
    benefits: ["Monthly Stipend", "Marketing Training", "FMCG Knowledge", "Sales Skills"],
    description: "Support marketing activities for consumer goods and brand management",
    applicationDeadline: "2025-12-01",
    startDate: "2025-12-10",
    difficulty: "Beginner",
    popularity: 7
  },

  {
    id: "13",
    title: "Customer Service Associate",
    company: "ICICI Bank Limited",
    sector: "Finance",
    requiredEducation: ["12th", "Graduate"],
    requiredSkills: ["Communication", "Customer Service", "Basic Computer"],
    preferredSkills: ["Banking Knowledge", "Hindi", "Problem Solving"],
    location: {
      state: "Punjab",
      district: "Chandigarh",
      isRemote: false,
      mode: "Onsite"
    },
    stipend: 5000,
    duration: "12 months",
    benefits: ["Monthly Stipend", "Banking Training", "Customer Service Skills", "Financial Products Knowledge"],
    description: "Assist customers with banking services and financial product information",
    applicationDeadline: "2025-11-20",
    startDate: "2025-12-01",
    difficulty: "Beginner",
    popularity: 8
  },

  {
    id: "14",
    title: "Technical Support Associate",
    company: "HCL Technologies Limited",
    sector: "IT",
    requiredEducation: ["12th", "Graduate"],
    requiredSkills: ["Computer Basics", "Communication", "Problem Solving"],
    preferredSkills: ["Technical Support", "Hardware Knowledge", "Software Basics"],
    location: {
      state: "Tamil Nadu",
      district: "Chennai",
      isRemote: false,
      mode: "Onsite"
    },
    stipend: 5000,
    duration: "12 months",
    benefits: ["Monthly Stipend", "Technical Training", "IT Support Skills", "Industry Certification"],
    description: "Provide technical support and learn IT infrastructure management",
    applicationDeadline: "2025-12-08",
    startDate: "2025-12-18",
    difficulty: "Beginner",
    popularity: 8
  },

  {
    id: "15",
    title: "Healthcare Administration Trainee",
    company: "Apollo Hospitals Enterprise Limited",
    sector: "Healthcare",
    requiredEducation: ["12th", "Graduate"],
    requiredSkills: ["Communication", "Computer Basics", "Empathy"],
    preferredSkills: ["Healthcare Knowledge", "Patient Care", "Administrative Skills"],
    location: {
      state: "Tamil Nadu",
      district: "Chennai",
      isRemote: false,
      mode: "Onsite"
    },
    stipend: 5000,
    duration: "12 months",
    benefits: ["Monthly Stipend", "Healthcare Training", "Patient Care Skills", "Medical Administration"],
    description: "Learn healthcare administration and patient service management",
    applicationDeadline: "2025-11-28",
    startDate: "2025-12-08",
    difficulty: "Beginner",
    popularity: 6
  }
];

// Common skills database for matching
export const COMMON_SKILLS = [
  "Communication",
  "English", 
  "Hindi",
  "Computer Basics",
  "MS Office",
  "Programming",
  "Web Development",
  "Customer Service",
  "Sales",
  "Marketing",
  "Social Media",
  "Content Writing",
  "Data Entry",
  "Typing",
  "Mathematics",
  "Accounting",
  "Problem Solving",
  "Team Work",
  "Leadership",
  "Technical Skills"
];

// Updated sector categories based on real partner companies
export const SECTORS = [
  "IT",
  "Finance", 
  "Manufacturing",
  "Government",
  "Healthcare",
  "Energy & Power",
  "Oil & Gas",
  "Banking",
  "Telecommunications",
  "Automotive",
  "Pharmaceuticals",
  "FMCG",
  "Steel & Metals",
  "Infrastructure",
  "Media & Entertainment",
  "Retail",
  "Cement",
  "Chemicals",
  "Textiles",
  "Education",
  "Agriculture",
  "Construction",
  "Transportation",
  "Mining"
];

// Indian states for location matching
export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal"
];

// Demo user profiles for testing - representing target demographics
// Updated with official PM Internship Portal criteria
export const DEMO_USERS = [
  {
    name: "Rajesh Kumar",
    education: "12th" as const,
    field: "Science",
    skills: ["Computer Basics", "Hindi", "English"],
    interests: ["IT", "Government"],
    languages: ["Hindi", "English"],
    location: { state: "Jharkhand", district: "Ranchi", isRural: true },
    workMode: "Any" as const,
    stipendExpectation: 5000, // PM scheme standard stipend
    duration: "12 months" as const, // PM scheme standard duration
    profile: "First-generation learner from rural background seeking government scheme opportunity"
  },
  {
    name: "Priya Sharma", 
    education: "Graduate" as const,
    field: "Commerce",
    skills: ["Communication", "English", "Customer Service"],
    interests: ["Finance", "Banking"],
    languages: ["Hindi", "English"],
    location: { state: "Rajasthan", district: "Jaipur", isRural: false },
    workMode: "Onsite" as const,
    stipendExpectation: 5000,
    duration: "12 months" as const,
    profile: "Commerce graduate seeking financial sector experience under PM scheme"
  },
  {
    name: "Amit Patel",
    education: "Graduate" as const,
    field: "Engineering",
    skills: ["Programming", "Technical Skills", "Computer Science"],
    interests: ["IT", "Technology"],
    languages: ["Gujarati", "Hindi", "English"],
    location: { state: "Gujarat", district: "Ahmedabad", isRural: false },
    workMode: "Onsite" as const,
    stipendExpectation: 5000,
    duration: "12 months" as const,
    profile: "Engineering graduate seeking practical IT experience"
  },
  {
    name: "Meera Singh",
    education: "12th" as const,
    field: "General",
    skills: ["Hindi", "Communication", "Basic Computer"],
    interests: ["Retail", "Customer Service"],
    languages: ["Hindi", "Punjabi"],
    location: { state: "Punjab", district: "Ludhiana", isRural: true },
    workMode: "Onsite" as const,
    stipendExpectation: 5000,
    duration: "12 months" as const,
    profile: "Rural youth with basic education seeking skill development opportunity"
  },
  {
    name: "Arjun Reddy",
    education: "Diploma" as const,
    field: "Mechanical",
    skills: ["Technical Skills", "Engineering", "Problem Solving"],
    interests: ["Manufacturing", "Automotive"],
    languages: ["Telugu", "Hindi", "English"],
    location: { state: "Telangana", district: "Hyderabad", isRural: false },
    workMode: "Onsite" as const,
    stipendExpectation: 5000,
    duration: "12 months" as const,
    profile: "Diploma holder seeking industrial experience through government scheme"
  }
];