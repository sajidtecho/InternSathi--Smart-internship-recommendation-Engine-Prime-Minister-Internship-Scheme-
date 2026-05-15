// Comprehensive mapping of interests, sub-interests, and related skills
// This follows the step-wise flow: Primary Interest → Sub-Interest → Skills

export interface SubInterest {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
}

export interface PrimaryInterest {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  icon: string;
  color: string;
  subInterests: SubInterest[];
}

export interface SkillSet {
  softSkills: string[];
  technicalSkills: string[];
  toolsAndPlatforms: string[];
}

// Primary Interest Categories
export const PRIMARY_INTERESTS: PrimaryInterest[] = [
  {
    id: 'technology',
    name: 'Technology & IT',
    nameHi: 'प्रौद्योगिकी और आईटी',
    description: 'Software development, data science, cybersecurity',
    descriptionHi: 'सॉफ़्टवेयर विकास, डेटा साइंस, साइबर सिक्यूरिटी',
    icon: 'code',
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    subInterests: [
      {
        id: 'web-development',
        name: 'Web Development',
        nameHi: 'वेब डेवलपमेंट',
        description: 'Frontend and backend web development',
        descriptionHi: 'फ्रंटएंड और बैकएंड वेब डेवलपमेंट'
      },
      {
        id: 'mobile-development',
        name: 'Mobile App Development',
        nameHi: 'मोबाइल ऐप डेवलपमेंट',
        description: 'iOS and Android app development',
        descriptionHi: 'iOS और Android ऐप डेवलपमेंट'
      },
      {
        id: 'data-science',
        name: 'Data Science & Analytics',
        nameHi: 'डेटा साइंस और एनालिटिक्स',
        description: 'Data analysis, machine learning, statistics',
        descriptionHi: 'डेटा एनालिसिस, मशीन लर्निंग, सांख्यिकी'
      },
      {
        id: 'cybersecurity',
        name: 'Cybersecurity',
        nameHi: 'साइबर सिक्यूरिटी',
        description: 'Information security and ethical hacking',
        descriptionHi: 'सूचना सुरक्षा और एथिकल हैकिंग'
      },
      {
        id: 'artificial-intelligence',
        name: 'Artificial Intelligence',
        nameHi: 'कृत्रिम बुद्धिमत्ता',
        description: 'AI, machine learning, deep learning',
        descriptionHi: 'AI, मशीन लर्निंग, डीप लर्निंग'
      },
      {
        id: 'cloud-computing',
        name: 'Cloud Computing',
        nameHi: 'क्लाउड कंप्यूटिंग',
        description: 'AWS, Azure, Google Cloud services',
        descriptionHi: 'AWS, Azure, Google Cloud सेवाएं'
      }
    ]
  },
  {
    id: 'business',
    name: 'Business & Management',
    nameHi: 'व्यापार और प्रबंधन',
    description: 'Marketing, finance, operations, strategy',
    descriptionHi: 'मार्केटिंग, वित्त, संचालन, रणनीति',
    icon: 'briefcase',
    color: 'bg-green-100 text-green-700 border-green-200',
    subInterests: [
      {
        id: 'digital-marketing',
        name: 'Digital Marketing',
        nameHi: 'डिजिटल मार्केटिंग',
        description: 'Social media, SEO, content marketing',
        descriptionHi: 'सोशल मीडिया, SEO, कंटेंट मार्केटिंग'
      },
      {
        id: 'finance',
        name: 'Finance & Accounting',
        nameHi: 'वित्त और लेखांकन',
        description: 'Financial analysis, accounting, budgeting',
        descriptionHi: 'वित्तीय विश्लेषण, लेखांकन, बजटिंग'
      },
      {
        id: 'operations',
        name: 'Operations Management',
        nameHi: 'संचालन प्रबंधन',
        description: 'Supply chain, logistics, process improvement',
        descriptionHi: 'आपूर्ति श्रृंखला, लॉजिस्टिक्स, प्रक्रिया सुधार'
      },
      {
        id: 'human-resources',
        name: 'Human Resources',
        nameHi: 'मानव संसाधन',
        description: 'Recruitment, employee relations, training',
        descriptionHi: 'भर्ती, कर्मचारी संबंध, प्रशिक्षण'
      },
      {
        id: 'business-development',
        name: 'Business Development',
        nameHi: 'व्यापार विकास',
        description: 'Sales, partnerships, growth strategies',
        descriptionHi: 'बिक्री, साझेदारी, विकास रणनीति'
      }
    ]
  },
  {
    id: 'design',
    name: 'Design & Creative',
    nameHi: 'डिजाइन और रचनात्मक',
    description: 'UI/UX design, graphic design, content creation',
    descriptionHi: 'UI/UX डिजाइन, ग्राफिक डिजाइन, कंटेंट निर्माण',
    icon: 'palette',
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    subInterests: [
      {
        id: 'ui-ux-design',
        name: 'UI/UX Design',
        nameHi: 'UI/UX डिजाइन',
        description: 'User interface and experience design',
        descriptionHi: 'उपयोगकर्ता इंटरफेस और अनुभव डिजाइन'
      },
      {
        id: 'graphic-design',
        name: 'Graphic Design',
        nameHi: 'ग्राफिक डिजाइन',
        description: 'Visual design, branding, illustrations',
        descriptionHi: 'विजुअल डिजाइन, ब्रांडिंग, चित्रण'
      },
      {
        id: 'video-editing',
        name: 'Video Production',
        nameHi: 'वीडियो प्रोडक्शन',
        description: 'Video editing, motion graphics, animation',
        descriptionHi: 'वीडियो एडिटिंग, मोशन ग्राफिक्स, एनीमेशन'
      },
      {
        id: 'content-creation',
        name: 'Content Creation',
        nameHi: 'कंटेंट निर्माण',
        description: 'Writing, blogging, social media content',
        descriptionHi: 'लेखन, ब्लॉगिंग, सोशल मीडिया कंटेंट'
      }
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Life Sciences',
    nameHi: 'स्वास्थ्य सेवा और जीवन विज्ञान',
    description: 'Medical research, healthcare administration, pharmaceuticals',
    descriptionHi: 'चिकित्सा अनुसंधान, स्वास्थ्य सेवा प्रशासन, दवा उद्योग',
    icon: 'heart-pulse',
    color: 'bg-red-100 text-red-700 border-red-200',
    subInterests: [
      {
        id: 'medical-research',
        name: 'Medical Research',
        nameHi: 'चिकित्सा अनुसंधान',
        description: 'Clinical research, data analysis, lab work',
        descriptionHi: 'क्लिनिकल रिसर्च, डेटा एनालिसिस, लैब वर्क'
      },
      {
        id: 'healthcare-admin',
        name: 'Healthcare Administration',
        nameHi: 'स्वास्थ्य सेवा प्रशासन',
        description: 'Hospital management, healthcare policy',
        descriptionHi: 'अस्पताल प्रबंधन, स्वास्थ्य नीति'
      },
      {
        id: 'pharmaceuticals',
        name: 'Pharmaceuticals',
        nameHi: 'दवा उद्योग',
        description: 'Drug development, regulatory affairs',
        descriptionHi: 'दवा विकास, नियामक मामले'
      }
    ]
  },
  {
    id: 'engineering',
    name: 'Engineering & Manufacturing',
    nameHi: 'इंजीनियरिंग और विनिर्माण',
    description: 'Mechanical, electrical, civil, industrial engineering',
    descriptionHi: 'यांत्रिक, विद्युत, सिविल, औद्योगिक इंजीनियरिंग',
    icon: 'cog',
    color: 'bg-orange-100 text-orange-700 border-orange-200',
    subInterests: [
      {
        id: 'mechanical-engineering',
        name: 'Mechanical Engineering',
        nameHi: 'यांत्रिक इंजीनियरिंग',
        description: 'Design, manufacturing, automation',
        descriptionHi: 'डिजाइन, विनिर्माण, स्वचालन'
      },
      {
        id: 'electrical-engineering',
        name: 'Electrical Engineering',
        nameHi: 'विद्युत इंजीनियरिंग',
        description: 'Power systems, electronics, automation',
        descriptionHi: 'पावर सिस्टम, इलेक्ट्रॉनिक्स, स्वचालन'
      },
      {
        id: 'civil-engineering',
        name: 'Civil Engineering',
        nameHi: 'सिविल इंजीनियरिंग',
        description: 'Construction, infrastructure, project management',
        descriptionHi: 'निर्माण, बुनियादी ढांचा, परियोजना प्रबंधन'
      }
    ]
  },
  {
    id: 'media',
    name: 'Media & Communications',
    nameHi: 'मीडिया और संचार',
    description: 'Journalism, public relations, broadcasting',
    descriptionHi: 'पत्रकारिता, जनसंपर्क, प्रसारण',
    icon: 'tv',
    color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    subInterests: [
      {
        id: 'journalism',
        name: 'Journalism',
        nameHi: 'पत्रकारिता',
        description: 'News reporting, investigative journalism',
        descriptionHi: 'समाचार रिपोर्टिंग, खोजी पत्रकारिता'
      },
      {
        id: 'public-relations',
        name: 'Public Relations',
        nameHi: 'जनसंपर्क',
        description: 'PR campaigns, brand management',
        descriptionHi: 'PR अभियान, ब्रांड प्रबंधन'
      },
      {
        id: 'broadcasting',
        name: 'Broadcasting & Media',
        nameHi: 'प्रसारण और मीडिया',
        description: 'TV, radio, podcast production',
        descriptionHi: 'टीवी, रेडियो, पॉडकास्ट प्रोडक्शन'
      }
    ]
  }
];

// Skills mapping based on interest and sub-interest combinations
export const SKILLS_MAPPING: Record<string, SkillSet> = {
  // Technology & IT
  'technology-web-development': {
    softSkills: ['Problem Solving', 'Attention to Detail', 'Time Management', 'Communication', 'Teamwork', 'Continuous Learning'],
    technicalSkills: ['HTML/CSS', 'JavaScript', 'React/Angular/Vue', 'Node.js', 'Databases', 'REST APIs', 'Git Version Control', 'Responsive Design'],
    toolsAndPlatforms: ['Visual Studio Code', 'GitHub', 'Chrome DevTools', 'Figma', 'npm/yarn', 'Postman', 'Docker', 'AWS/Azure']
  },
  'technology-mobile-development': {
    softSkills: ['Problem Solving', 'User-Centric Thinking', 'Adaptability', 'Communication', 'Teamwork', 'Project Management'],
    technicalSkills: ['Swift/Kotlin', 'React Native/Flutter', 'Mobile UI Design', 'App Store Optimization', 'Mobile Security', 'Push Notifications'],
    toolsAndPlatforms: ['Xcode', 'Android Studio', 'Firebase', 'TestFlight', 'Google Play Console', 'Figma', 'GitHub', 'Jira']
  },
  'technology-data-science': {
    softSkills: ['Analytical Thinking', 'Curiosity', 'Communication', 'Attention to Detail', 'Critical Thinking', 'Storytelling'],
    technicalSkills: ['Python/R', 'SQL', 'Statistics', 'Machine Learning', 'Data Visualization', 'Data Cleaning', 'Statistical Modeling'],
    toolsAndPlatforms: ['Jupyter Notebook', 'Pandas', 'NumPy', 'Matplotlib/Seaborn', 'Tableau', 'Power BI', 'Excel', 'Google Analytics']
  },
  'technology-cybersecurity': {
    softSkills: ['Attention to Detail', 'Ethical Mindset', 'Problem Solving', 'Communication', 'Continuous Learning', 'Risk Assessment'],
    technicalSkills: ['Network Security', 'Penetration Testing', 'Incident Response', 'Risk Assessment', 'Cryptography', 'Malware Analysis'],
    toolsAndPlatforms: ['Wireshark', 'Metasploit', 'Nmap', 'Burp Suite', 'Kali Linux', 'SIEM Tools', 'Firewall Management', 'Vulnerability Scanners']
  },
  'technology-artificial-intelligence': {
    softSkills: ['Logical Thinking', 'Creativity', 'Problem Solving', 'Research Skills', 'Communication', 'Persistence'],
    technicalSkills: ['Machine Learning', 'Deep Learning', 'Python', 'TensorFlow/PyTorch', 'Neural Networks', 'Computer Vision', 'NLP'],
    toolsAndPlatforms: ['Jupyter Notebook', 'Google Colab', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV', 'Kaggle', 'MLflow']
  },
  'technology-cloud-computing': {
    softSkills: ['Problem Solving', 'Adaptability', 'Communication', 'Teamwork', 'Project Management', 'Cost Optimization'],
    technicalSkills: ['Cloud Architecture', 'Containerization', 'Serverless Computing', 'Infrastructure as Code', 'DevOps', 'Monitoring'],
    toolsAndPlatforms: ['AWS/Azure/GCP', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'CloudFormation', 'Monitoring Tools', 'Git']
  },

  // Business & Management
  'business-digital-marketing': {
    softSkills: ['Creativity', 'Communication', 'Strategic Thinking', 'Adaptability', 'Data-Driven Mindset', 'Customer Focus'],
    technicalSkills: ['SEO/SEM', 'Social Media Marketing', 'Content Marketing', 'Email Marketing', 'Analytics', 'A/B Testing'],
    toolsAndPlatforms: ['Google Analytics', 'Facebook Ads Manager', 'Google Ads', 'Mailchimp', 'Hootsuite', 'Canva', 'WordPress', 'HubSpot']
  },
  'business-finance': {
    softSkills: ['Analytical Thinking', 'Attention to Detail', 'Integrity', 'Communication', 'Problem Solving', 'Time Management'],
    technicalSkills: ['Financial Analysis', 'Budgeting', 'Forecasting', 'Risk Management', 'Investment Analysis', 'Tax Planning'],
    toolsAndPlatforms: ['Excel', 'QuickBooks', 'SAP', 'Tally', 'Bloomberg Terminal', 'Power BI', 'Tableau', 'SQL']
  },
  'business-operations': {
    softSkills: ['Process Improvement', 'Leadership', 'Problem Solving', 'Communication', 'Project Management', 'Efficiency Focus'],
    technicalSkills: ['Supply Chain Management', 'Lean/Six Sigma', 'Project Management', 'Quality Control', 'Inventory Management'],
    toolsAndPlatforms: ['MS Project', 'Jira', 'SAP', 'Oracle', 'Tableau', 'Power BI', 'Excel', 'Process Mapping Tools']
  },
  'business-human-resources': {
    softSkills: ['Empathy', 'Communication', 'Conflict Resolution', 'Leadership', 'Discretion', 'Organizational Skills'],
    technicalSkills: ['Recruitment', 'Performance Management', 'Training & Development', 'HR Analytics', 'Labor Law', 'Compensation Planning'],
    toolsAndPlatforms: ['ATS Systems', 'HRIS', 'LinkedIn Recruiter', 'Workday', 'BambooHR', 'Slack', 'Zoom', 'Survey Tools']
  },
  'business-business-development': {
    softSkills: ['Relationship Building', 'Negotiation', 'Strategic Thinking', 'Persistence', 'Communication', 'Market Awareness'],
    technicalSkills: ['Sales Process', 'Lead Generation', 'Market Research', 'Partnership Development', 'CRM Management', 'Proposal Writing'],
    toolsAndPlatforms: ['Salesforce', 'HubSpot CRM', 'LinkedIn Sales Navigator', 'Mailchimp', 'Zoom', 'Pipedrive', 'Google Workspace', 'Canva']
  },

  // Design & Creative
  'design-ui-ux-design': {
    softSkills: ['Empathy', 'Creativity', 'Problem Solving', 'Communication', 'User-Centric Thinking', 'Collaboration'],
    technicalSkills: ['User Research', 'Wireframing', 'Prototyping', 'Usability Testing', 'Information Architecture', 'Interaction Design'],
    toolsAndPlatforms: ['Figma', 'Sketch', 'Adobe XD', 'InVision', 'Miro', 'Principle', 'Zeplin', 'UsabilityHub']
  },
  'design-graphic-design': {
    softSkills: ['Creativity', 'Attention to Detail', 'Communication', 'Time Management', 'Client Focus', 'Adaptability'],
    technicalSkills: ['Typography', 'Color Theory', 'Brand Identity', 'Layout Design', 'Print Design', 'Digital Design'],
    toolsAndPlatforms: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Canva', 'Figma', 'Sketch', 'CorelDRAW', 'Procreate']
  },
  'design-video-editing': {
    softSkills: ['Creativity', 'Patience', 'Attention to Detail', 'Storytelling', 'Time Management', 'Collaboration'],
    technicalSkills: ['Video Editing', 'Motion Graphics', 'Color Correction', 'Audio Editing', 'Visual Effects', 'Animation'],
    toolsAndPlatforms: ['Adobe Premiere Pro', 'After Effects', 'Final Cut Pro', 'DaVinci Resolve', 'Cinema 4D', 'Blender', 'YouTube Studio', 'Vimeo']
  },
  'design-content-creation': {
    softSkills: ['Creativity', 'Writing Skills', 'Communication', 'Research Skills', 'Adaptability', 'Audience Awareness'],
    technicalSkills: ['Content Strategy', 'SEO Writing', 'Social Media Content', 'Blog Writing', 'Copywriting', 'Content Calendar'],
    toolsAndPlatforms: ['WordPress', 'Medium', 'Canva', 'Buffer', 'Hootsuite', 'Google Analytics', 'Grammarly', 'Ahrefs']
  },

  // Healthcare & Life Sciences
  'healthcare-medical-research': {
    softSkills: ['Attention to Detail', 'Ethical Conduct', 'Communication', 'Critical Thinking', 'Patience', 'Team Collaboration'],
    technicalSkills: ['Clinical Research', 'Data Analysis', 'Statistical Analysis', 'Research Methodology', 'Literature Review', 'Lab Techniques'],
    toolsAndPlatforms: ['SPSS', 'R/Python', 'REDCap', 'EndNote', 'PubMed', 'Clinical Trial Management Systems', 'Excel', 'Laboratory Equipment']
  },
  'healthcare-healthcare-admin': {
    softSkills: ['Leadership', 'Communication', 'Problem Solving', 'Organizational Skills', 'Empathy', 'Decision Making'],
    technicalSkills: ['Healthcare Management', 'Policy Development', 'Quality Assurance', 'Compliance', 'Financial Management', 'Staff Management'],
    toolsAndPlatforms: ['EMR Systems', 'Healthcare Analytics', 'Microsoft Office', 'Project Management Tools', 'Quality Management Systems', 'Compliance Software']
  },
  'healthcare-pharmaceuticals': {
    softSkills: ['Attention to Detail', 'Regulatory Awareness', 'Communication', 'Analytical Thinking', 'Ethical Conduct', 'Project Management'],
    technicalSkills: ['Drug Development', 'Regulatory Affairs', 'Clinical Trials', 'Quality Control', 'Pharmacovigilance', 'Medical Writing'],
    toolsAndPlatforms: ['Clinical Data Management Systems', 'Regulatory Software', 'Statistical Software', 'Document Management Systems', 'Laboratory Systems', 'Quality Systems']
  },

  // Engineering & Manufacturing
  'engineering-mechanical-engineering': {
    softSkills: ['Problem Solving', 'Attention to Detail', 'Teamwork', 'Project Management', 'Safety Awareness', 'Innovation'],
    technicalSkills: ['CAD Design', 'Manufacturing Processes', 'Materials Engineering', 'Thermodynamics', 'Mechanical Systems', 'Quality Control'],
    toolsAndPlatforms: ['AutoCAD', 'SolidWorks', 'CATIA', 'ANSYS', 'MATLAB', 'CNC Programming', 'PLM Software', 'Manufacturing Equipment']
  },
  'engineering-electrical-engineering': {
    softSkills: ['Problem Solving', 'Attention to Detail', 'Safety Awareness', 'Teamwork', 'Analytical Thinking', 'Continuous Learning'],
    technicalSkills: ['Circuit Design', 'Power Systems', 'Control Systems', 'Electronics', 'Programming', 'Signal Processing'],
    toolsAndPlatforms: ['MATLAB', 'Simulink', 'AutoCAD Electrical', 'PLC Programming', 'LabVIEW', 'Multisim', 'Eagle PCB', 'Oscilloscopes']
  },
  'engineering-civil-engineering': {
    softSkills: ['Project Management', 'Communication', 'Attention to Detail', 'Safety Awareness', 'Problem Solving', 'Leadership'],
    technicalSkills: ['Structural Design', 'Construction Management', 'Surveying', 'Geotechnical Engineering', 'Environmental Engineering', 'Project Planning'],
    toolsAndPlatforms: ['AutoCAD', 'Revit', 'STAAD Pro', 'Primavera', 'MS Project', 'GIS Software', 'Surveying Equipment', 'Construction Software']
  },

  // Media & Communications
  'media-journalism': {
    softSkills: ['Communication', 'Research Skills', 'Curiosity', 'Integrity', 'Time Management', 'Adaptability'],
    technicalSkills: ['News Writing', 'Investigative Research', 'Interview Techniques', 'Fact-Checking', 'Digital Publishing', 'Media Law'],
    toolsAndPlatforms: ['Content Management Systems', 'Social Media Platforms', 'Recording Equipment', 'Video Editing Software', 'Research Databases', 'Publishing Tools']
  },
  'media-public-relations': {
    softSkills: ['Communication', 'Relationship Building', 'Crisis Management', 'Creativity', 'Strategic Thinking', 'Networking'],
    technicalSkills: ['PR Campaign Development', 'Media Relations', 'Content Creation', 'Brand Management', 'Event Planning', 'Crisis Communication'],
    toolsAndPlatforms: ['Media Monitoring Tools', 'Social Media Management', 'Press Release Distribution', 'CRM Systems', 'Analytics Tools', 'Design Software']
  },
  'media-broadcasting': {
    softSkills: ['Communication', 'Confidence', 'Adaptability', 'Time Management', 'Creativity', 'Audience Awareness'],
    technicalSkills: ['Broadcasting Techniques', 'Audio/Video Production', 'Live Production', 'Scripting', 'Equipment Operation', 'Post-Production'],
    toolsAndPlatforms: ['Broadcasting Equipment', 'Audio Mixing Consoles', 'Video Editing Software', 'Streaming Platforms', 'Recording Software', 'Live Production Tools']
  }
};

// Helper functions
export const getSubInterests = (primaryInterestId: string): SubInterest[] => {
  const interest = PRIMARY_INTERESTS.find(i => i.id === primaryInterestId);
  return interest ? interest.subInterests : [];
};

export const getSkillsForInterest = (primaryInterestId: string, subInterestId: string): SkillSet => {
  const key = `${primaryInterestId}-${subInterestId}`;
  return SKILLS_MAPPING[key] || { softSkills: [], technicalSkills: [], toolsAndPlatforms: [] };
};

export const getAllSkillsForPrimaryInterest = (primaryInterestId: string): SkillSet => {
  const interest = PRIMARY_INTERESTS.find(i => i.id === primaryInterestId);
  if (!interest) return { softSkills: [], technicalSkills: [], toolsAndPlatforms: [] };

  const allSkills: SkillSet = { softSkills: [], technicalSkills: [], toolsAndPlatforms: [] };
  
  interest.subInterests.forEach(subInterest => {
    const skills = getSkillsForInterest(primaryInterestId, subInterest.id);
    allSkills.softSkills.push(...skills.softSkills);
    allSkills.technicalSkills.push(...skills.technicalSkills);
    allSkills.toolsAndPlatforms.push(...skills.toolsAndPlatforms);
  });

  // Remove duplicates
  allSkills.softSkills = [...new Set(allSkills.softSkills)];
  allSkills.technicalSkills = [...new Set(allSkills.technicalSkills)];
  allSkills.toolsAndPlatforms = [...new Set(allSkills.toolsAndPlatforms)];

  return allSkills;
};