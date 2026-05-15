"use client";

import React, { useState, useEffect } from "react";
import { GovernmentHeader } from "@/components/government-header";
import { GovernmentFooter } from "@/components/government-footer";
import { UserProfile } from "@/lib/recommendation-types";
import { useTranslationContext } from "@/lib/translation-provider";
import { storeUserData } from "@/lib/real-data-loader";
import { Trash2, Star, ArrowRight, User } from "lucide-react";
import { PRIMARY_INTERESTS, SKILLS_MAPPING } from "@/lib/interests-skills-mapping";
// storeUserData imported at top

const STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
  "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
  "Uttarakhand","West Bengal","Delhi","Jammu and Kashmir","Ladakh"
];

const CITIES_BY_STATE: Record<string,string[]> = {
  "Maharashtra": ["Mumbai","Pune","Nagpur","Aurangabad","Nashik","Solapur","Kolhapur"],
  "Karnataka": ["Bangalore","Mysore","Hubli","Mangalore","Belgaum","Gulbarga","Davangere"],
  "Tamil Nadu": ["Chennai","Coimbatore","Madurai","Tiruchirappalli","Salem","Tirunelveli"],
  "Delhi": ["New Delhi","Central Delhi","North Delhi","South Delhi","East Delhi","West Delhi"],
  "Gujarat": ["Ahmedabad","Surat","Vadodara","Rajkot","Bhavnagar","Jamnagar","Gandhinagar"],
  "Rajasthan": ["Jaipur","Jodhpur","Kota","Bikaner","Ajmer","Udaipur","Bharatpur"],
  "Uttar Pradesh": ["Lucknow","Kanpur","Ghaziabad","Agra","Varanasi","Meerut","Prayagraj"],
  "West Bengal": ["Kolkata","Howrah","Durgapur","Asansol","Siliguri","Malda","Bardhaman"],
  "Telangana": ["Hyderabad","Warangal","Nizamabad","Karimnagar","Ramagundam","Khammam"],
  "Punjab": ["Chandigarh","Ludhiana","Amritsar","Jalandhar","Patiala","Bathinda"],
  "Haryana": ["Gurgaon","Faridabad","Panipat","Ambala","Yamunanagar","Rohtak"],
  "Kerala": ["Kochi","Thiruvananthapuram","Kozhikode","Thrissur","Kollam","Palakkad"],
  "Andhra Pradesh": ["Visakhapatnam","Vijayawada","Guntur","Nellore","Kurnool","Tirupati"],
  "Odisha": ["Bhubaneswar","Cuttack","Rourkela","Berhampur","Sambalpur","Puri"],
  "Assam": ["Guwahati","Silchar","Dibrugarh","Jorhat","Nagaon","Tinsukia"],
  "Bihar": ["Patna","Gaya","Bhagalpur","Muzaffarpur","Darbhanga","Bihar Sharif"],
  "Madhya Pradesh": ["Bhopal","Indore","Gwalior","Jabalpur","Ujjain","Sagar"],
  "Chhattisgarh": ["Raipur","Bhilai","Korba","Bilaspur","Durg","Rajnandgaon"],
  "Jharkhand": ["Ranchi","Jamshedpur","Dhanbad","Bokaro","Deoghar","Phusro"],
  "Himachal Pradesh": ["Shimla","Dharamshala","Solan","Mandi","Kullu","Chamba"],
  "Uttarakhand": ["Dehradun","Haridwar","Roorkee","Haldwani","Rudrapur","Kashipur"],
  "Goa": ["Panaji","Vasco da Gama","Margao","Mapusa","Ponda","Bicholim"],
  "Jammu and Kashmir": ["Srinagar","Jammu","Anantnag","Baramulla","Udhampur","Kathua"],
  "Arunachal Pradesh": ["Itanagar","Naharlagun","Pasighat","Bomdila","Tawang"],
  "Manipur": ["Imphal","Thoubal","Bishnupur","Churachandpur","Kakching"],
  "Meghalaya": ["Shillong","Tura","Cherrapunji","Jowai","Nongpoh"],
  "Mizoram": ["Aizawl","Lunglei","Saiha","Champhai","Kolasib"],
  "Nagaland": ["Kohima","Dimapur","Mokokchung","Tuensang","Wokha"],
  "Sikkim": ["Gangtok","Namchi","Gyalshing","Mangan","Rangpo"],
  "Tripura": ["Agartala","Dharmanagar","Udaipur","Kailashahar","Belonia"],
  "Ladakh": ["Leh","Kargil","Nyoma","Diskit","Padum"]
};

const EDUCATION_FIELDS = [
  "Science","Commerce","Arts","Engineering","Medical","Law","Management",
  "Computer Science","Agriculture","Pharmacy","Nursing","Education","Fine Arts"
];

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  education: string;
  field: string;
  state: string;
  city: string;
  // Replace simple arrays with stepwise selection structure
  interestSelection: {
    primaryInterest: string | null; // Area of Interest (primary only)
    selectedSkills: string[]; // Flat list of skills
  };
  workMode: string;
  duration: string;
}

const INITIAL_FORM: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  education: "",
  field: "",
  state: "",
  city: "",
  interestSelection: {
    primaryInterest: null,
    selectedSkills: []
  },
  workMode: "any",
  duration: "any"
};

export default function RegistrationPage() {
  const { currentLang, setCurrentLang, t, isLoading: translationLoading } = useTranslationContext();
  
  if (translationLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM);
  const [currentStep, setCurrentStep] = useState(1);
  const [wasDataRestored, setWasDataRestored] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const saveFormData = (data: FormState) => {
    try {
      localStorage.setItem("pmis-form-data", JSON.stringify(data));
    } catch {}
  };
  const saveCurrentStep = (step: number) => {
    try {
      localStorage.setItem("pmis-current-step", step.toString());
    } catch {}
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem("pmis-form-data");
      const savedStep = localStorage.getItem("pmis-current-step");
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData({ ...INITIAL_FORM, ...parsed });
        setWasDataRestored(true);
      }
      if (savedStep) {
        const stepNum = parseInt(savedStep);
        if (stepNum >= 1 && stepNum <= 2) setCurrentStep(stepNum);
      }
    } catch {}
  }, []);

  useEffect(() => {
    saveFormData(formData);
  }, [formData]);

  useEffect(() => {
    saveCurrentStep(currentStep);
  }, [currentStep]);

  const clearSavedData = () => {
    localStorage.removeItem("pmis-form-data");
    localStorage.removeItem("pmis-current-step");
    setFormData(INITIAL_FORM);
    setCurrentStep(1);
    setWasDataRestored(false);
  };

  const updateFormData = (field: keyof FormState, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getCitiesForState = (state: string) => {
    return CITIES_BY_STATE[state] || [];
  };

  const handleNext = () => {
    if (currentStep < 2) setCurrentStep(s => s + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(s => s - 1);
  };

  // Simple Interests & Skills state helpers
  const allPrimaryOptions = PRIMARY_INTERESTS.map(p => ({ id: p.id, name: p.name }));

  const getFlatSkillsForPrimary = (primaryId: string): string[] => {
    // Collate skills from all sub-interests under this primary
    const pi = PRIMARY_INTERESTS.find(p => p.id === primaryId);
    if (!pi) return [];
    const uniq = new Set<string>();
    for (const si of pi.subInterests) {
      const key = `${pi.id}-${si.id}`;
      const m = SKILLS_MAPPING[key];
      if (!m) continue;
      m.softSkills.forEach(s => uniq.add(s));
      m.technicalSkills.forEach(s => uniq.add(s));
      m.toolsAndPlatforms.forEach(s => uniq.add(s));
    }
    return Array.from(uniq);
  };

  const isStepValid = () => {
    if (currentStep === 1) {
      // Combined validation for Personal + Education & Location
      return (
        formData.firstName &&
        formData.lastName &&
        formData.email &&
        formData.phone &&
        formData.education &&
        formData.field &&
        formData.state &&
        formData.city
      );
    }
    if (currentStep === 2) {
      // Require one interest and at least one skill along with preferences
      return (
        !!formData.interestSelection.primaryInterest &&
        formData.interestSelection.selectedSkills.length > 0 &&
        !!formData.workMode &&
        !!formData.duration
      );
    }
    return false;
  };
// (removed duplicate import)

  const handleSubmit = () => {
    if (!isStepValid()) return;
    setIsLoading(true);

  // Use selected simple interest and skills
  const allSelectedSkills: string[] = [...formData.interestSelection.selectedSkills];
  const interests: string[] = formData.interestSelection.primaryInterest ? [formData.interestSelection.primaryInterest] : [];

    const profile: UserProfile = {
      education: (formData.education as any) || "Graduate",
      field: formData.field,
      skills: allSelectedSkills,
      interests: interests,
      languages: ["Hindi", "English"],
      location: {
        state: formData.state,
        district: formData.city,
        isRural: false
      },
      workMode: (formData.workMode as any) || "Any",
  stipendExpectation: 5000,
      duration: (formData.duration as any) || "12 months"
    };

    setTimeout(() => {
      try {
        storeUserData(profile);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('simpleView', '1');
        }
      } catch {}
      localStorage.removeItem("pmis-form-data");
      localStorage.removeItem("pmis-current-step");
      const profileData = encodeURIComponent(JSON.stringify(profile));
      window.location.href = `/recommendations?simple=1&profile=${profileData}`;
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <GovernmentHeader 
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
      />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t.registrationTitle}
            </h1>
            <p className="text-gray-600">
              {t.registrationSubtitle ?? t.personalizedMatchingPopup}
            </p>
        </div>

        {wasDataRestored && (
          <div className="mb-4 p-3 bg-blue-50 text-blue-800 rounded-lg border border-blue-200 text-sm">
            {t.sessionRestored ?? "Your previous session data has been restored."}
          </div>
        )}

        {/* Progress */}
        <div className="flex justify-center items-center space-x-4 mb-6">
          {[1, 2].map(step => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step}
              </div>
              {step < 2 && (
                <div
                  className={`w-16 h-1 mx-2 ${
                    step < currentStep ? "bg-blue-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-2 space-x-8 text-sm text-gray-600">
          <span>{`${t.personalDetails} + ${t.educationDetails}`}</span>
          <span>{t.preferences}</span>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={clearSavedData}
            className="px-4 py-2 text-sm border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            {t.startFresh ?? "Start Fresh"}
          </button>
        </div>

  <div className="mt-4 border-2 border-blue-100 rounded-lg shadow-sm">
          <div className="bg-blue-50 p-4">
            <div className="flex justify-between items-center">
              <h2 className="flex items-center gap-3 text-lg font-semibold">
                {currentStep === 1 && (
                  <>
                    <User className="w-5 h-5 text-blue-600" />
                    {t.personalDetails}
                  </>
                )}
                {currentStep === 2 && (
                  <>
                    <Star className="w-5 h-5 text-blue-600" />
                    {t.preferences}
                  </>
                )}
              </h2>
              <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {t.autoSaved ?? "Auto-saved"}
              </div>
            </div>
          </div>
          <div className="p-6">
            {currentStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal */}
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">{t.firstName} *</label>
                  <input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={e => updateFormData("firstName", e.target.value)}
                    placeholder={t.placeholderFirstName ?? "Enter your first name"}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">{t.lastName} *</label>
                  <input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={e => updateFormData("lastName", e.target.value)}
                    placeholder={t.placeholderLastName ?? "Enter your last name"}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{t.emailAddress} *</label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={e => updateFormData("email", e.target.value)}
                    placeholder={t.placeholderEmail ?? "Enter your email"}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">{t.phoneNumber} *</label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={e => updateFormData("phone", e.target.value)}
                    placeholder={t.placeholderPhone ?? "Enter your phone number"}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Education & Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.educationLevel} *</label>
                  <select
                    value={formData.education}
                    onChange={e => updateFormData("education", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-label={t.educationLevel}
                    title={t.educationLevel}
                  >
                    <option value="">{t.selectEducationLevel ?? "Select education level"}</option>
                    <option value="12th">{t.educationOption12th ?? "12th Standard"}</option>
                    <option value="Diploma">{t.educationOptionDiploma ?? "Diploma"}</option>
                    <option value="Graduate">{t.educationOptionGraduate ?? "Graduate"}</option>
                    <option value="PostGraduate">{t.educationOptionPostGraduate ?? "Post Graduate"}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.fieldOfStudy} *</label>
                  <select
                    value={formData.field}
                    onChange={e => updateFormData("field", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-label={t.fieldOfStudy}
                    title={t.fieldOfStudy}
                  >
                    <option value="">{t.selectYourField ?? "Select your field"}</option>
                    {EDUCATION_FIELDS.map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.state} *</label>
                  <select
                    value={formData.state}
                    onChange={e => {
                      setFormData(prev => ({
                        ...prev,
                        state: e.target.value,
                        city: ""
                      }));
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-label={t.state}
                    title={t.state}
                  >
                    <option value="">{t.selectYourState ?? "Select your state"}</option>
                    {STATES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.district} *</label>
                  <select
                    value={formData.city}
                    onChange={e => updateFormData("city", e.target.value)}
                    disabled={!formData.state}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      !formData.state
                        ? "cursor-not-allowed opacity-50 bg-gray-100"
                        : ""
                    }`}
                    aria-label={t.district}
                    title={t.district}
                  >
                    <option value="">
                      {!formData.state
                        ? (t.pleaseSelectStateFirst ?? "Please select a state first")
                        : getCitiesForState(formData.state).length === 0
                        ? (t.noCitiesAvailable ?? "No cities available")
                        : (t.selectYourCity ?? "Select your city")}
                    </option>
                    {formData.state &&
                      getCitiesForState(formData.state).length > 0 &&
                      getCitiesForState(formData.state).map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                  </select>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Area of Interest */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.sectorInterests} *</label>
                  <select
                    value={formData.interestSelection.primaryInterest || ""}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      interestSelection: {
                        primaryInterest: e.target.value || null,
                        selectedSkills: [] // reset skills when interest changes
                      }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-label="Select your primary area of interest"
                  >
                    <option value="">{t.selectAnArea ?? "Select an area"}</option>
                    {allPrimaryOptions.map(opt => (
                      <option key={opt.id} value={opt.id}>{opt.name}</option>
                    ))}
                  </select>
                </div>

                {/* Skills multi-select (checkbox list) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.selectSkills} *</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-auto border border-gray-200 rounded-md p-3 bg-white">
                    {(formData.interestSelection.primaryInterest ? getFlatSkillsForPrimary(formData.interestSelection.primaryInterest) : []).map(skill => {
                      const checked = formData.interestSelection.selectedSkills.includes(skill);
                      return (
                        <label key={skill} className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            className="w-4 h-4"
                            checked={checked}
                            onChange={() => {
                              setFormData(prev => {
                                const selected = new Set(prev.interestSelection.selectedSkills);
                                if (selected.has(skill)) selected.delete(skill); else selected.add(skill);
                                return {
                                  ...prev,
                                  interestSelection: {
                                    ...prev.interestSelection,
                                    selectedSkills: Array.from(selected)
                                  }
                                };
                              });
                            }}
                          />
                          <span>{skill}</span>
                        </label>
                      );
                    })}
                    {formData.interestSelection.primaryInterest && getFlatSkillsForPrimary(formData.interestSelection.primaryInterest).length === 0 && (
                      <div className="text-sm text-gray-500">{t.noSkillsForInterest ?? "No skills available for this interest."}</div>
                    )}
                    {!formData.interestSelection.primaryInterest && (
                      <div className="text-sm text-gray-500">{t.selectAreaToSeeSkills ?? "Select an area to see skills."}</div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.workMode} *</label>
                    <select
                      value={formData.workMode}
                      onChange={e => updateFormData("workMode", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      aria-label={t.workMode}
                      title={t.workMode}
                    >
                      <option value="any">{t.any}</option>
                      <option value="Remote">{t.remote}</option>
                      <option value="Onsite">{t.onsite}</option>
                      <option value="Hybrid">{t.hybrid}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.duration} *</label>
                    <select
                      value={formData.duration}
                      onChange={e => updateFormData("duration", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      aria-label={t.duration}
                      title={t.duration}
                    >
                      <option value="any">{t.anyDuration ?? "Any duration"}</option>
                      <option value="6 months">{t.months6}</option>
                      <option value="12 months">{t.months12}</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`px-6 py-2 border rounded-md transition-colors ${
              currentStep === 1
                ? "border-gray-200 text-gray-400 cursor-not-allowed"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {t.previous ?? "Previous"}
          </button>

            {currentStep < 2 ? (
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className={`px-6 py-2 rounded-md transition-colors flex items-center gap-2 ${
                  isStepValid()
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {t.next ?? "Next"}
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!isStepValid() || isLoading}
                className={`px-6 py-2 rounded-md transition-colors flex items-center gap-2 ${
                  isStepValid() && !isLoading
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isLoading ? (t.gettingRecommendations ?? "Getting Recommendations...") : (t.getMyRecommendations ?? "Get Recommendations")}
                <Star className="w-4 h-4" />
              </button>
            )}
        </div>
      </div>
      
      <GovernmentFooter />
    </div>
  );
}