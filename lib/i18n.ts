import { translations } from './translations';

export const languages = {
  en: "English",
  hi: "हिंदी",
  as: "অসমীয়া", // Assamese
  bn: "বাংলা", // Bengali
  gu: "ગુજરાતી", // Gujarati
  kn: "ಕನ್ನಡ", // Kannada
  ml: "മലയാളം", // Malayalam
  mr: "मराठी", // Marathi
  or: "ଓଡ଼ିଆ", // Oriya
  pa: "ਪੰਜਾਬੀ", // Punjabi
  ta: "தமிழ்", // Tamil
  te: "తెలుగు", // Telugu
  ur: "اردو", // Urdu
}

export function useTranslation(lang: keyof typeof languages = "en") {
  return translations[lang] || translations.en
}
