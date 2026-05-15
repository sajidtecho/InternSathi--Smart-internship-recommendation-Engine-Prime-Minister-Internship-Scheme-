import { chatbot_en } from './en'
import { chatbot_hi } from './hi'
import { chatbot_bn } from './bn'
import { chatbot_gu } from './gu'
import { chatbot_kn } from './kn'
import { chatbot_ml } from './ml'
import { chatbot_mr } from './mr'
import { chatbot_or } from './or'
import { chatbot_pa } from './pa'
import { chatbot_ta } from './ta'
import { chatbot_te } from './te'
import { chatbot_ur } from './ur'
import { chatbot_as } from './as'

// All available chatbot language translations. Fallback handled below for any unsupported code.
export const chatbotTranslations = {
  en: chatbot_en,
  hi: chatbot_hi,
  bn: chatbot_bn,
  gu: chatbot_gu,
  kn: chatbot_kn,
  ml: chatbot_ml,
  mr: chatbot_mr,
  or: chatbot_or,
  pa: chatbot_pa,
  ta: chatbot_ta,
  te: chatbot_te,
  ur: chatbot_ur,
  as: chatbot_as,
} as const

export type ChatbotLang = keyof typeof chatbotTranslations

export interface ChatbotStrings {
  ui: Record<string, string>
  faq: Record<string, string>
  dynamic: Record<string, string>
  keywords: Record<string, string[]>
}

export function getChatbotStrings(lang: string): ChatbotStrings {
  return (chatbotTranslations[lang as ChatbotLang] || chatbot_en) as ChatbotStrings
}

export function useChatbotTranslation(lang: string) {
  return getChatbotStrings(lang)
}

// Utility to build a searchable map of FAQ Q/A pairs
export function buildFaqPairs(strings: ChatbotStrings) {
  const faqEntries: { q: string; a: string; key: string }[] = []
  Object.entries(strings.faq).forEach(([k, v]) => {
    if (k.endsWith('_q')) {
      const base = k.replace(/_q$/, '')
      const answer = strings.faq[`${base}_a`] || ''
      faqEntries.push({ q: v, a: answer, key: base })
    }
  })
  return faqEntries
}
