/**
 * Language Simplification Utility for First-Generation Learners
 * Provides simple, accessible language for complex technical terms
 */

export interface SimplifiedTerms {
  original: string;
  simplified: string;
  hindi?: string;
  description?: string;
}

// Job Role Simplifications
export const JOB_ROLE_SIMPLIFICATIONS: SimplifiedTerms[] = [
  {
    original: "Software Development Intern",
    simplified: "Computer Programming Trainee",
    hindi: "कंप्यूटर प्रोग्रामिंग प्रशिक्षु",
    description: "Learn to create computer programs and mobile apps"
  },
  {
    original: "AI/ML Development Intern",
    simplified: "Smart Computer Learning Trainee",
    hindi: "स्मार्ट कंप्यूटर सीखने वाला प्रशिक्षु",
    description: "Learn to make computers smart and helpful"
  },
  {
    original: "Full Stack Developer Intern",
    simplified: "Complete Website Builder Trainee",
    hindi: "पूर्ण वेबसाइट बनाने वाला प्रशिक्षु",
    description: "Learn to build complete websites from start to finish"
  },
  {
    original: "Data Analyst Intern",
    simplified: "Information Study Trainee",
    hindi: "जानकारी अध्ययन प्रशिक्षु",
    description: "Learn to study and understand business information"
  },
  {
    original: "Digital Marketing Intern",
    simplified: "Online Promotion Trainee",
    hindi: "ऑनलाइन प्रचार प्रशिक्षु",
    description: "Learn to promote products and services online"
  },
  {
    original: "Business Analyst Intern",
    simplified: "Business Helper Trainee",
    hindi: "व्यापार सहायक प्रशिक्षु",
    description: "Learn to help businesses work better"
  },
  {
    original: "UI/UX Designer Intern",
    simplified: "App Design Trainee",
    hindi: "ऐप डिजाइन प्रशिक्षु",
    description: "Learn to design beautiful and easy-to-use apps"
  },
  {
    original: "Quality Assurance Intern",
    simplified: "Quality Checker Trainee",
    hindi: "गुणवत्ता जांचकर्ता प्रशिक्षु",
    description: "Learn to check if products work correctly"
  }
];

// UI Element Simplifications
export const UI_ELEMENT_SIMPLIFICATIONS: SimplifiedTerms[] = [
  {
    original: "Track your internship applications and manage your profile",
    simplified: "See your training applications and update your details",
    hindi: "अपने प्रशिक्षण आवेदन देखें और अपनी जानकारी अपडेट करें"
  },
  {
    original: "Applications",
    simplified: "My Applications",
    hindi: "मेरे आवेदन"
  },
  {
    original: "Profile Completion",
    simplified: "Complete Your Details",
    hindi: "अपनी जानकारी पूरी करें"
  },
  {
    original: "Under Review",
    simplified: "Being Checked",
    hindi: "जांच में"
  },
  {
    original: "Shortlisted",
    simplified: "Selected for Next Step",
    hindi: "अगले चरण के लिए चुना गया"
  },
  {
    original: "Interview Scheduled",
    simplified: "Meeting Fixed",
    hindi: "मुलाकात तय"
  },
  {
    original: "Notifications",
    simplified: "Messages",
    hindi: "संदेश"
  },
  {
    original: "Edit Profile",
    simplified: "Update My Details",
    hindi: "मेरी जानकारी अपडेट करें"
  },
  {
    original: "Current Internship",
    simplified: "My Training Now",
    hindi: "मेरा वर्तमान प्रशिक्षण"
  },
  {
    original: "No Active Internship",
    simplified: "No Training Right Now",
    hindi: "अभी कोई प्रशिक्षण नहीं"
  }
];

// Status Message Simplifications
export const STATUS_SIMPLIFICATIONS: SimplifiedTerms[] = [
  {
    original: "Your interview with Wipro Technologies for Full Stack Developer role is scheduled",
    simplified: "Your meeting with Wipro company for Complete Website Builder job is fixed",
    hindi: "Wipro कंपनी के साथ वेबसाइट बनाने की नौकरी के लिए आपकी मुलाकात तय हुई है"
  },
  {
    original: "Your application for Infosys AI/ML Development Intern has been shortlisted",
    simplified: "Your application for Infosys Smart Computer Learning job has been selected",
    hindi: "Infosys स्मार्ट कंप्यूटर सीखने की नौकरी के लिए आपका आवेदन चुना गया है"
  },
  {
    original: "Consider adding React.js and Node.js certifications to strengthen your profile",
    simplified: "Learn React and Node skills to make your profile stronger",
    hindi: "React और Node कौशल सीखें ताकि आपकी प्रोफाइल मजबूत हो"
  }
];

// Education Field Simplifications
export const EDUCATION_SIMPLIFICATIONS: SimplifiedTerms[] = [
  {
    original: "B.Tech Computer Science Engineering",
    simplified: "Bachelor's in Computer Studies",
    hindi: "कंप्यूटर अध्ययन में स्नातक"
  },
  {
    original: "Computer Science",
    simplified: "Computer Studies",
    hindi: "कंप्यूटर अध्ययन"
  },
  {
    original: "Information Technology",
    simplified: "Computer Technology",
    hindi: "कंप्यूटर तकनीक"
  },
  {
    original: "Electronics and Communication",
    simplified: "Electronics and Communication",
    hindi: "इलेक्ट्रॉनिक्स और संचार"
  },
  {
    original: "Mechanical Engineering",
    simplified: "Machine Engineering",
    hindi: "मशीन इंजीनियरिंग"
  },
  {
    original: "Business Administration",
    simplified: "Business Management",
    hindi: "व्यापार प्रबंधन"
  }
];

// Technical Skills Simplifications
export const SKILL_SIMPLIFICATIONS: SimplifiedTerms[] = [
  {
    original: "JavaScript",
    simplified: "Website Programming",
    hindi: "वेबसाइट प्रोग्रामिंग"
  },
  {
    original: "Python",
    simplified: "Python Programming",
    hindi: "Python प्रोग्रामिंग"
  },
  {
    original: "React.js",
    simplified: "React (Website Building)",
    hindi: "React (वेबसाइट बनाना)"
  },
  {
    original: "Node.js",
    simplified: "Node (Server Programming)",
    hindi: "Node (सर्वर प्रोग्रामिंग)"
  },
  {
    original: "Database Management",
    simplified: "Data Storage",
    hindi: "डेटा संग्रहण"
  },
  {
    original: "Machine Learning",
    simplified: "Computer Learning",
    hindi: "कंप्यूटर सीखना"
  }
];

/**
 * Simplify text by replacing complex terms with simpler alternatives
 */
export function simplifyText(text: string, useHindi: boolean = false): string {
  let simplified = text;
  
  // Apply all simplification categories
  const allSimplifications = [
    ...JOB_ROLE_SIMPLIFICATIONS,
    ...UI_ELEMENT_SIMPLIFICATIONS,
    ...STATUS_SIMPLIFICATIONS,
    ...EDUCATION_SIMPLIFICATIONS,
    ...SKILL_SIMPLIFICATIONS
  ];
  
  allSimplifications.forEach(term => {
    const replacement = useHindi && term.hindi ? term.hindi : term.simplified;
    simplified = simplified.replace(new RegExp(term.original, 'gi'), replacement);
  });
  
  return simplified;
}

/**
 * Get simplified job role with description
 */
export function getSimplifiedJobRole(role: string): { title: string; description: string; hindi?: string } {
  const found = JOB_ROLE_SIMPLIFICATIONS.find(
    term => term.original.toLowerCase() === role.toLowerCase()
  );
  
  return {
    title: found?.simplified || role,
    description: found?.description || "Learn new skills and gain work experience",
    hindi: found?.hindi
  };
}

/**
 * Get simplified status message
 */
export function getSimplifiedStatus(status: string): string {
  const statusMap: { [key: string]: string } = {
    "Under Review": "Being Checked",
    "Shortlisted": "Selected for Next Step",
    "Interview Scheduled": "Meeting Fixed",
    "Rejected": "Not Selected",
    "Selected": "Chosen",
    "Pending": "Waiting"
  };
  
  return statusMap[status] || status;
}

/**
 * Common simplified phrases for UI
 */
export const SIMPLIFIED_PHRASES = {
  welcome: {
    original: "Welcome back",
    simplified: "Welcome back",
    hindi: "वापस स्वागत है"
  },
  applications: {
    original: "Track your internship applications and manage your profile",
    simplified: "See your training applications and update your details",
    hindi: "अपने प्रशिक्षण आवेदन देखें और अपनी जानकारी अपडेट करें"
  },
  noInternship: {
    original: "No Active Internship",
    simplified: "No Training Right Now",
    hindi: "अभी कोई प्रशिक्षण नहीं"
  },
  applyNow: {
    original: "Apply Now",
    simplified: "Apply Now",
    hindi: "अभी आवेदन करें"
  },
  viewMore: {
    original: "View More",
    simplified: "See More",
    hindi: "और देखें"
  }
};