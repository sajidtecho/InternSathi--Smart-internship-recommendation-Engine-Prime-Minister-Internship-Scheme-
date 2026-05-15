"use client"

import React, { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Bot, Mic, MicOff, Volume2, VolumeX, Send, AlertCircle, Languages, UserCheck, Target } from "lucide-react"
import { useTranslationContext } from "@/lib/translation-provider"
import { storeUserData } from "@/lib/real-data-loader"
import type { UserProfile } from "@/lib/recommendation-types"

interface VoiceMessage {
  id: string
  type: "user" | "assistant"
  text: string
  timestamp: Date
  formField?: string
}

interface UserFormData {
  name?: string
  education?: string
  skills?: string
  location?: string
  sector?: string
}

declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

// Fuzzy matching helper functions for mispronunciations
const levenshteinDistance = (str1: string, str2: string): number => {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null))
  
  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j
  
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const substitutionCost = str1[i - 1] === str2[j - 1] ? 0 : 1
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // insertion
        matrix[j - 1][i] + 1, // deletion
        matrix[j - 1][i - 1] + substitutionCost // substitution
      )
    }
  }
  return matrix[str2.length][str1.length]
}

const fuzzyMatch = (input: string, candidates: string[], threshold: number = 0.6): string | null => {
  const inputLower = input.toLowerCase().trim()
  let bestMatch = null
  let bestScore = 0
  
  for (const candidate of candidates) {
    const candidateLower = candidate.toLowerCase()
    const distance = levenshteinDistance(inputLower, candidateLower)
    const maxLen = Math.max(inputLower.length, candidateLower.length)
    const similarity = 1 - (distance / maxLen)
    
    if (similarity >= threshold && similarity > bestScore) {
      bestMatch = candidate
      bestScore = similarity
    }
  }
  return bestMatch
}

// Phonetic and common mispronunciation mappings
const phoneticSimilarities: Record<string, string[]> = {
  // Education terms - English and Hindi/Indian languages
  "btech": ["b tech", "be tech", "bitech", "beetech", "technology", "tech degree", "b.tech", "btech degree", 
           "बीटेक", "बी टेक", "बी.टेक", "टेक्नोलॉजी", "इंजीनियरिंग", "तकनीकी"],
  "engineering": ["engeenering", "enginering", "enginnering", "enginaring", "engineer", "engeneering",
                 "इंजीनियरिंग", "इञ्जिनिअरिन्ग", "इंजिनियरिंग", "अभियांत्रिकी", "इंजिनीयर"],
  "computer": ["compyuter", "computar", "komputer", "comp", "computer science", "computers",
              "कंप्यूटर", "कम्प्यूटर", "कंप्यूटर साइंस", "कम्प्यूटर विज्ञान"],
  "science": ["sience", "syence", "saience", "sciences", "विज्ञान", "साइंस"],
  "mba": ["emba", "m b a", "master business", "m.b.a", "masters business", "एमबीए", "मास्टर बिजनेस", "व्यापार प्रबंधन"],
  "degree": ["degre", "dagree", "digree", "degrees", "डिग्री", "उपाधि", "स्नातक"],
  "diploma": ["diplom", "diploma course", "deploma", "डिप्लोमा", "प्रमाणपत्र"],
  "bachelor": ["bachlor", "bachler", "bechlor", "bachelor degree", "बैचलर", "स्नातक", "स्नातक उपाधि"],
  "master": ["masters", "master degree", "masters degree", "मास्टर", "मास्टर्स", "परास्नातक"],
  "graduate": ["graduat", "graduation", "graduated", "ग्रेजुएट", "स्नातक", "स्नातकत्व"],
  "commerce": ["com", "bcom", "b.com", "commerce degree", "कॉमर्स", "वाणिज्य", "बी कॉम"],
  "arts": ["ba", "b.a", "bachelor arts", "arts degree", "कला", "आर्ट्स", "बी ए"],
  "medical": ["mbbs", "md", "medical degree", "doctor", "मेडिकल", "डॉक्टर", "चिकित्सा"],
  "law": ["llb", "l.l.b", "law degree", "legal", "लॉ", "कानून", "विधि"],
  "phd": ["ph.d", "doctorate", "doctoral", "पीएचडी", "डॉक्टोरेट"],
  "ca": ["chartered accountant", "सीए", "चार्टर्ड अकाउंटेंट"],
  "mtech": ["m.tech", "m tech", "master technology", "एमटेक", "एम.टेक"],
  "bsc": ["b.sc", "b sc", "bachelor science", "बीएससी", "बी.एससी"],
  "msc": ["m.sc", "m sc", "master science", "एमएससी", "एम.एससी"],
  "bca": ["b.c.a", "bachelor computer application", "बीसीए", "बी.सी.ए"],
  "mca": ["m.c.a", "master computer application", "एमसीए", "एम.सी.ए"],
  "bba": ["b.b.a", "bachelor business administration", "बीबीए", "बी.बी.ए"],
  
  // Skills terms
  "programming": ["programing", "programmin", "coding", "programm", "program", "प्रोग्रामिंग", "कोडिंग", "प्रोग्राम"],
  "java": ["jawa", "jva", "java script", "jav", "java language", "जावा"],
  "python": ["pythan", "pythone", "pyton", "piton", "python language", "पाइथन"],
  "javascript": ["java script", "jscript", "js", "javascrpt", "java scripts", "जावास्क्रिप्ट"],
  "react": ["reakt", "riact", "react js", "reactjs", "रिएक्ट"],
  "nodejs": ["node js", "node", "nod js", "node.js", "नोड"],
  "html": ["htm", "h t m l", "html5", "html css", "एचटीएमएल"],
  "css": ["c s s", "css3", "style", "styling", "सीएसएस"],
  "sql": ["s q l", "sequel", "mysql", "database", "एसक्यूएल", "डेटाबेस"],
  "design": ["designing", "designer", "graphic design", "ui design", "डिज़ाइन", "डिजाइन"],
  "management": ["managing", "manager", "project management", "प्रबंधन", "मैनेजमेंट"],
  "marketing": ["market", "digital marketing", "marketing management", "advertising", "sales marketing", 
               "मार्केटिंग", "विपणन", "बिक्री"],
  
  // Cities
  "mumbai": ["bombay", "mumba", "mumbay", "mumbai city", "mumbai maharashtra", "मुंबई", "बॉम्बे"],
  "bangalore": ["bengaluru", "bangalor", "banglore", "bangaluru", "bangalore city", "बैंगलोर", "बेंगलुरु"],
  "delhi": ["deli", "dehli", "new delhi", "dilli", "delhi ncr", "दिल्ली", "नई दिल्ली"],
  "hyderabad": ["haidarabad", "hydrabad", "haiderabad", "hyderabad city", "हैदराबाद"],
  "chennai": ["madras", "chenna", "chenai", "chennai city", "चेन्नई", "मद्रास"],
  "pune": ["poona", "pun", "pune city", "pune maharashtra", "पुणे"],
  "kolkata": ["calcutta", "kolkatta", "calcata", "कोलकाता", "कलकत्ता"],
  "ahmedabad": ["amdavad", "ahmadabad", "ahmdabad", "अहमदाबाद", "अमदावाद"],
  "gurgaon": ["gurugram", "gurgoan", "gurgon", "गुरुग्राम", "गुड़गांव"],
  "noida": ["noyda", "noeda", "greater noida", "नोएडा"],
  "jaipur": ["jaypur", "jaipur rajasthan", "pink city", "जयपुर"],
  
  // Sectors
  "technology": ["tech", "tecnology", "techno", "it sector", "information technology", 
                "तकनीक", "टेक्नोलॉजी", "आईटी", "सूचना प्रौद्योगिकी"],
  "finance": ["financ", "banking", "bank", "finans", "financial", "वित्त", "बैंकिंग", "बैंक"],
  "healthcare": ["health care", "medical", "health", "medicin", "hospital", 
                "स्वास्थ्य", "चिकित्सा", "हेल्थकेयर", "अस्पताल"],
  "government": ["govt", "goverment", "public sector", "government sector", 
                "सरकार", "सरकारी", "पब्लिक सेक्टर"],
  "education": ["teaching", "acadmic", "school", "education sector", "academic", 
               "शिक्षा", "टीचिंग", "स्कूल", "शैक्षणिक"],
  "consulting": ["consultant", "consulting services", "consultancy", "कंसल्टिंग", "सलाह"],
  "business": ["bizness", "business development", "corporate", "व्यापार", "बिजनेस", "कॉर्पोरेट"]
}

const findSimilarWord = (input: string, category: 'education' | 'skills' | 'location' | 'sector'): string | null => {
  const inputLower = input.toLowerCase().trim()
  
  // Check phonetic similarities
  for (const [key, variants] of Object.entries(phoneticSimilarities)) {
    for (const variant of variants) {
      if (inputLower.includes(variant) || variant.includes(inputLower)) {
        return key
      }
    }
    // Also check if input is similar to the key itself
    if (levenshteinDistance(inputLower, key) <= Math.max(1, Math.floor(key.length * 0.3))) {
      return key
    }
  }
  
  // Category-specific fuzzy matching
  const candidates: Record<string, string[]> = {
    education: ["btech", "engineering", "computer", "science", "mba", "bba", "bca", "mca", "degree", "diploma", "bachelor", "master", "graduate", 
               "commerce", "arts", "medical", "law", "phd", "ca", "mtech", "bsc", "msc", "llb", "mbbs", "md",
               "बीटेक", "इंजीनियरिंग", "एमबीए", "स्नातक", "डिप्लोमा", "कॉमर्स", "आर्ट्स", "मेडिकल", "लॉ", "पीएचडी", "सीए", "एमटेक", "बीएससी", "एमएससी", "बीसीए", "एमसीए", "बीबीए"],
    skills: ["programming", "coding", "java", "python", "javascript", "react", "nodejs", "html", "css", "design", "management", "sql", "database",
            "प्रोग्रामिंग", "कोडिंग", "जावा", "पाइथन", "डिज़ाइन", "प्रबंधन"],
    location: ["mumbai", "delhi", "bangalore", "pune", "hyderabad", "chennai", "kolkata", "ahmedabad", "gurgaon", "noida", "jaipur",
              "मुंबई", "दिल्ली", "बैंगलोर", "पुणे", "हैदराबाद", "चेन्नई", "कोलकाता", "अहमदाबाद", "गुरुग्राम", "नोएडा", "जयपुर"],
    sector: ["technology", "finance", "healthcare", "government", "education", "marketing", "banking", "consulting", "business",
            "तकनीक", "वित्त", "स्वास्थ्य", "सरकार", "शिक्षा", "मार्केटिंग", "बैंकिंग", "व्यापार"]
  }
  
  return fuzzyMatch(input, candidates[category] || [], 0.5)
}

export default function GovernmentVoiceAssistant() {
  const { currentLang } = useTranslationContext()
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(true)
  const [synthesisSupported, setSynthesisSupported] = useState(true)
  const [permissionTip, setPermissionTip] = useState("")
  const [currentText, setCurrentText] = useState("")
  const [textInput, setTextInput] = useState("")
  const [messages, setMessages] = useState<VoiceMessage[]>([])
  const [formData, setFormData] = useState<UserFormData>({})
  const [assistantText, setAssistantText] = useState("")
  const [greeted, setGreeted] = useState(false)
  const [showTyping, setShowTyping] = useState(false)
  const [userManuallyControlling, setUserManuallyControlling] = useState(false)
  const [recognitionState, setRecognitionState] = useState<'idle' | 'starting' | 'listening' | 'stopping'>('idle')

  const recognitionRef = useRef<any>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = currentLang === "hi" ? "hi-IN" : "en-IN"

        recognitionRef.current.onstart = () => {
          setIsListening(true)
          setRecognitionState('listening')
        }
        recognitionRef.current.onend = () => {
          setIsListening(false)
          setRecognitionState('idle')
        }
        recognitionRef.current.onresult = (event: any) => {
          const results = event.results
          const last = results[results.length - 1]
          const alt = last[0]
          const transcript = alt.transcript
          if (last.isFinal) {
            const confidence = typeof alt.confidence === "number" ? alt.confidence : 1
            if (!transcript?.trim()) {
              reAsk("no-speech")
              return
            }
            if (confidence < 0.5) {
              reAsk("lowConfidence")
              return
            }
            handleSubmit(transcript)
          } else {
            setCurrentText(transcript)
          }
        }
        recognitionRef.current.onerror = (event: any) => {
          setIsListening(false)
          setRecognitionState('idle')
          if (event.error === "not-allowed") {
            setPermissionTip(
              currentLang === "hi"
                ? "कृपया ब्राउज़र में माइक्रोफोन की अनुमति दें और पेज रीलोड करें।"
                : "Please allow microphone access in your browser and reload the page."
            )
          } else if (["no-speech", "audio-capture", "network"].includes(event.error)) {
            setPermissionTip(
              currentLang === "hi"
                ? "आवाज़ नहीं मिली। हेडसेट आज़माएं या नीचे टाइप करें।"
                : "No speech detected. Try a headset or just type below."
            )
          }
        }
      } else {
        setSpeechSupported(false)
      }

      if ("speechSynthesis" in window) {
        synthRef.current = window.speechSynthesis
        setSynthesisSupported(true)
      } else {
        setSynthesisSupported(false)
      }

      try {
        if ((window as any).isSecureContext === false) {
          setPermissionTip(
            currentLang === "hi"
              ? "नोट: कुछ ब्राउज़रों में माइक्रोफोन के लिए HTTPS जरूरी होता है।"
              : "Note: Some browsers require HTTPS for microphone access."
          )
        }
      } catch {}
    }

    // welcome message
    const greet = currentLang === "hi"
      ? "नमस्ते! कृपया बड़े माइक्रोफ़ोन बटन को दबाकर बोलें। पहले अपना नाम बताएं।"
      : "Hello! Tap the big mic button to speak. Please tell me your name first."
    setAssistantText(greet)
    setMessages([
      { id: "welcome", type: "assistant", text: greet, timestamp: new Date() },
    ])
    // Try to speak greeting (may be blocked until user interaction)
    if (synthRef.current) {
      speak(greet)
      setGreeted(true)
    }

    // Cleanup function to stop recognition on unmount
    return () => {
      if (recognitionRef.current && recognitionState !== 'idle') {
        try {
          recognitionRef.current.stop()
          setRecognitionState('idle')
        } catch (error) {
          console.warn('Error stopping speech recognition on cleanup:', error)
        }
      }
    }
  }, [currentLang])

  const speak = (text: string) => {
    if (!synthRef.current) return
    // Stop any ongoing speech first
    synthRef.current.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = currentLang === "hi" ? "hi-IN" : "en-IN"
    u.rate = 0.95
    u.onstart = () => setIsSpeaking(true)
    u.onend = () => setIsSpeaking(false)
    u.onerror = () => setIsSpeaking(false)
    synthRef.current.speak(u)
  }

  // Map voice assistant form data to unified UserProfile for recommendations
  const toUserProfile = (fd: UserFormData): UserProfile => {
    const skills = (fd.skills || '')
      .split(/[;,]/)
      .map(s => s.trim())
      .filter(Boolean)
    const interests = fd.sector ? [fd.sector] : []
    const locationText = (fd.location || '').trim()

    return {
      education: (fd.education as any) || 'Graduate',
      field: 'General',
      skills,
      interests,
      languages: ['Hindi', 'English'],
      location: {
        state: locationText || 'Any',
        district: '',
        isRural: false,
      },
      workMode: 'Any',
      stipendExpectation: 5000,
      duration: '12 months',
    }
  }

  const startListening = () => {
    if (!recognitionRef.current || !speechSupported) return
    if (recognitionState !== 'idle') return // Only start if completely idle
    
    try {
      setRecognitionState('starting')
      recognitionRef.current.lang = currentLang === "hi" ? "hi-IN" : "en-IN"
      recognitionRef.current.start()
    } catch (error) {
      console.warn('Speech recognition start failed:', error)
      setIsListening(false)
      setRecognitionState('idle')
    }
  }
  
  const stopListening = () => {
    if (!recognitionRef.current) return
    if (recognitionState === 'idle' || recognitionState === 'stopping') return
    
    try {
      setRecognitionState('stopping')
      recognitionRef.current.stop()
    } catch (error) {
      console.warn('Speech recognition stop failed:', error)
      setIsListening(false)
      setRecognitionState('idle')
    }
  }
  const stopSpeaking = () => synthRef.current?.cancel()

  const debouncedStartListening = () => {
    // Use a longer delay for auto-resume to avoid conflicts
    setTimeout(() => {
      if (recognitionState === 'idle' && !isListening && !isSpeaking) {
        startListening()
      }
    }, 1000)
  }

  const nextMissingFields = (currentFormData: UserFormData = formData): (keyof UserFormData)[] => {
    const missing: (keyof UserFormData)[] = []
    if (!currentFormData.name) missing.push("name")
    if (!currentFormData.education) missing.push("education")  
    if (!currentFormData.skills) missing.push("skills")
    if (!currentFormData.location) missing.push("location")
    if (!currentFormData.sector) missing.push("sector")
    return missing
  }

  const nextMissingField = (currentFormData: UserFormData = formData): keyof UserFormData | null => {
    const missing = nextMissingFields(currentFormData)
    return missing[0] || null
  }

  const promptForField = (field: keyof UserFormData): string => {
    const hi: Record<keyof UserFormData, string> = {
      name: "कृपया अपना नाम बताएं।",
      education: "अपनी शिक्षा बताएं।",
      skills: "अपने कौशल बताएं। आप एक से अधिक कौशल बता सकते हैं।",
      location: "अपनी पसंदीदा कार्य स्थान बताएं।",
      sector: "अपना पसंदीदा क्षेत्र बताएं।",
    }
    const en: Record<keyof UserFormData, string> = {
      name: "Please tell me your name.",
      education: "Tell me about your education.",
      skills: "Tell me your skills. You can mention multiple skills.",
      location: "Tell me your preferred work location.",
      sector: "Tell me your preferred sector.",
    }
    return currentLang === "hi" ? hi[field] : en[field]
  }

  const promptForMultipleFields = (fields: (keyof UserFormData)[]): string => {
    if (fields.length === 1) {
      return promptForField(fields[0])
    }
    
    const hi: Record<string, string> = {
      "education,skills": "अब अपनी शिक्षा और कौशल बताएं।",
      "skills,location": "अब अपने कौशल और पसंदीदा कार्य स्थान बताएं।",
      "location,sector": "अब अपनी पसंदीदा कार्य स्थान और क्षेत्र बताएं।",
      "education,skills,location": "अब अपनी शिक्षा, कौशल और पसंदीदा कार्य स्थान बताएं।",
      "skills,location,sector": "अब अपने कौशल, पसंदीदा कार्य स्थान और क्षेत्र बताएं।",
    }
    
    const en: Record<string, string> = {
      "education,skills": "Now tell me your education and skills.",
      "skills,location": "Now tell me your skills and preferred location.",
      "location,sector": "Now tell me your preferred location and sector.",
      "education,skills,location": "Now tell me your education, skills and preferred location.",
      "skills,location,sector": "Now tell me your skills, preferred location and sector.",
    }
    
    const key = fields.join(",")
    const translations = currentLang === "hi" ? hi : en
    return translations[key] || promptForField(fields[0])
  }

  const reAsk = (reason?: "lowConfidence" | "no-speech" | "parseFail") => {
    const field = nextMissingField() || "name"
    const reasonText = currentLang === "hi"
      ? reason === "lowConfidence" || reason === "no-speech"
        ? "माफ़ कीजिए, स्पष्ट नहीं सुन पाया।"
        : ""
      : reason === "lowConfidence" || reason === "no-speech"
        ? "Sorry, I couldn't hear that clearly."
        : ""
    const prompt = `${reasonText} ${promptForField(field)}`.trim()
    setAssistantText(prompt)
    setMessages((p) => [...p, { id: `assistant-${Date.now()}`, type: "assistant", text: prompt, timestamp: new Date() }])
    
    // Only speak if not currently speaking to avoid audio overlap
    if (synthRef.current && !isSpeaking) {
      speak(prompt)
    }
    
    // auto resume listening after prompt using debounced version
    debouncedStartListening()
  }

  const handleSubmit = (input: string) => {
    const trimmed = input.trim()
    if (!trimmed) return

    setIsProcessing(true)
    setCurrentText("")
    setTextInput("") // Clear text input after submission

    const userMsg: VoiceMessage = {
      id: `user-${Date.now()}`,
      type: "user",
      text: trimmed,
      timestamp: new Date(),
    }
    setMessages((p) => [...p, userMsg])

    setTimeout(() => {
      // Get the latest form data by accessing it directly from state
      setFormData(currentFormData => {
        const { text, formField } = generateResponse(trimmed, currentFormData)
        console.log('Form data before response:', currentFormData) // Debug log
        console.log('Generated response:', { text, formField }) // Debug log
        console.log('Input was:', trimmed) // Debug log
        
        const botMsg: VoiceMessage = {
          id: `assistant-${Date.now()}`,
          type: "assistant",
          text,
          timestamp: new Date(),
          formField,
        }
        setMessages((p) => [...p, botMsg])
        setAssistantText(text)
        setIsProcessing(false)
        
        // Speak response only if user hasn't been manually controlling and not currently speaking
        if (synthRef.current && !isSpeaking && !userManuallyControlling) {
          speak(text)
        }
        
        // After assistant response, if form not complete, keep listening for next answer
        // But be less aggressive if user is manually controlling
        if (!isFormComplete() && !userManuallyControlling) {
          debouncedStartListening()
        }
        
        return currentFormData // Return the current form data unchanged since generateResponse handles updates
      })
    }, 600)
  }

  const generateResponse = (input: string, currentFormData: UserFormData = formData): { text: string; formField?: string } => {
    const lower = input.toLowerCase()
    let formField: string | undefined
    let updatedFormData = { ...currentFormData }
    let fieldsUpdated: string[] = []

    // Try to extract multiple pieces of information from a single input
    // This handles cases like "I am John, I have B.Tech in Computer Science, I know Java and Python, I want to work in Mumbai in IT sector"

    // Name
    if (/my name is |name is | is my name/i.test(input) || /मेरा नाम .* है|नाम .* है/i.test(input)) {
      const en = input.match(/my name is (.*?)$|name is (.*?)$|(.*?) is my name/i)
      const hi = input.match(/मेरा नाम (.*?) है|नाम (.*?) है/i)
      const name = en?.[1] || en?.[2] || en?.[3] || hi?.[1] || hi?.[2]
      if (name) {
        setFormData((p) => ({ ...p, name: name.trim() }))
        formField = "name"
        return {
          text:
            currentLang === "hi"
              ? `धन्यवाद ${name.trim()}! अब अपनी शिक्षा और कौशल बताएं।`
              : `Thanks ${name.trim()}! Now tell me your education and skills.`,
          formField,
        }
      }
    }

    // Education - with fuzzy matching for mispronunciations and multilingual support
    if (/(education|study|degree|b\.tech|btech|engineering|mba|bba|bca|mca|b\.sc|bsc|m\.sc|msc|graduate|college|university|tech|diploma|bachelor|master|commerce|arts|medical|law|phd|ca|mtech|शिक्षा|डिग्री|बीटेक|इंजीनियरिंग|एमबीए|स्नातक|डिप्लोमा|कॉमर्स|आर्ट्स|मेडिकल|लॉ|पीएचडी|सीए|एमटेक|बीएससी|एमएससी|बीसीए|एमसीए|बीबीए|तकनीकी|विज्ञान|प्रौद्योगिकी|चिकित्सा|कानून)/i.test(lower)) {
      // Extract specific degree if mentioned (English)
      const degreeMatchEn = lower.match(/b\.tech|btech|engineering|mba|bba|bca|mca|b\.sc|bsc|m\.sc|msc|diploma|bachelor|master|commerce|arts|medical|law|phd|ca|mtech/i)
      // Extract specific degree if mentioned (Hindi)
      const degreeMatchHi = input.match(/बीटेक|इंजीनियरिंग|एमबीए|स्नातक|डिप्लोमा|कॉमर्स|आर्ट्स|मेडिकल|लॉ|पीएचडी|सीए|एमटेक|बीएससी|एमएससी|बीसीए|एमसीए|बीबीए/g)
      
      const educationValue = degreeMatchEn ? degreeMatchEn[0].toUpperCase() : 
                           degreeMatchHi ? degreeMatchHi[0] : 
                           input.trim()
      
      setFormData((p) => ({ ...p, education: educationValue }))
      formField = "education"
      return {
        text: currentLang === "hi" ? "बहुत बढ़िया! अब अपने कौशल और पसंदीदा कार्य स्थान बताएं।" : "Great! Now tell me your skills and preferred location.",
        formField,
      }
    }
    
    // Hindi education patterns - check for common Hindi phrases about education
    const hindiEducationPatterns = [
      /मैंने\s*(.*?)\s*किया\s*है/g,           // "मैंने बीटेक किया है"
      /मेरी\s*पढ़ाई\s*(.*?)\s*है/g,          // "मेरी पढ़ाई एमबीए है"
      /मेरी\s*शिक्षा\s*(.*?)\s*है/g,         // "मेरी शिक्षा बीएससी है"
      /मैंने\s*(.*?)\s*पूरा\s*किया/g,        // "मैंने डिप्लोमा पूरा किया"
      /मैं\s*(.*?)\s*पास\s*हूं/g,            // "मैं बीसीए पास हूं"
      /मैं\s*(.*?)\s*ग्रेजुएट\s*हूं/g,       // "मैं इंजीनियरिंग ग्रेजुएट हूं"
    ]
    
    for (const pattern of hindiEducationPatterns) {
      const matches = [...input.matchAll(pattern)]
      if (matches.length > 0 && !currentFormData.education) {
        const educationValue = matches[0][1]?.trim()
        if (educationValue) {
          setFormData((p) => ({ ...p, education: educationValue }))
          formField = "education"
          return {
            text: currentLang === "hi" 
              ? `समझ गया, ${educationValue}! अब अपने कौशल बताइए। जैसे - Java Programming, Python Development, Web Design, Digital Marketing, Data Analysis, या अन्य तकनीकी कौशल।` 
              : `Got it, ${educationValue}! Now tell me your skills. For example - Java Programming, Python Development, Web Design, Digital Marketing, Data Analysis, or other technical skills.`,
            formField,
          }
        }
      }
    }
    
    // Try fuzzy matching for education if direct match failed
    const similarEducation = findSimilarWord(input, 'education')
    if (similarEducation && !currentFormData.education) {
      const educationValue = similarEducation.toUpperCase()
      setFormData((p) => ({ ...p, education: educationValue }))
      formField = "education"
      return {
        text: currentLang === "hi" 
          ? `समझ गया, ${educationValue}! अब अपने कौशल और पसंदीदा कार्य स्थान बताएं।` 
          : `Got it, ${educationValue}! Now tell me your skills and preferred location.`,
        formField,
      }
    }

    // Skills - with fuzzy matching for mispronunciations and multilingual support
    if (/(skill|technical|java|python|react|design|management|marketing|programming|coding|computer|software|web|mobile|app|html|css|javascript|node|database|sql|कौशल|तकनीकी|प्रोग्रामिंग|कोडिंग|डिज़ाइन|प्रबंधन|मार्केटिंग|जावा|पाइथन|कंप्यूटर|वेब|मोबाइल|डेटाबेस)/i.test(lower)) {
      const knownSkills = ["programming", "coding", "design", "management", "marketing", "java", "python", "react", "javascript", "html", "css", "web", "mobile", "computer", "software", "database", "sql", "nodejs", "angular", "vue", "php", "c++", "machine learning", "data analysis", "ui/ux", "photoshop", "excel", "powerpoint", "project management", "leadership", "communication", "sales", "digital marketing", "seo", "content writing", "graphic design"]
      const hindiSkills = ["प्रोग्रामिंग", "कोडिंग", "डिज़ाइन", "प्रबंधन", "मार्केटिंग", "जावा", "पाइथन"]
      
      // Extract all matching skills from input
      const foundSkills = knownSkills.filter((s) => lower.includes(s.toLowerCase()))
      const foundHindiSkills = hindiSkills.filter((s) => input.includes(s))
      
      // Also check for common skill separators and extract individual skills
      const skillSeparators = /[,&और\s]+/g
      const inputSkills = input.split(skillSeparators)
        .map(skill => skill.trim())
        .filter(skill => skill.length > 2)
        .slice(0, 5) // Limit to 5 skills max
      
      const allFoundSkills = [...foundSkills, ...foundHindiSkills]
      const skillsValue = allFoundSkills.length > 0 ? allFoundSkills.join(", ") : inputSkills.join(", ")
      
      setFormData((p) => ({ ...p, skills: skillsValue }))
      formField = "skills"
      return {
        text: currentLang === "hi" ? "बहुत अच्छा! अब अपनी पसंदीदा कार्य स्थान और क्षेत्र बताएं।" : "Excellent! Now tell me your preferred location and sector.",
        formField,
      }
    }
    
    // Hindi skills patterns - check for common Hindi phrases about skills
    const hindiSkillsPatterns = [
      /मुझे\s*(.*?)\s*आता\s*है/g,           // "मुझे जावा आता है"
      /मैं\s*(.*?)\s*जानता\s*हूं/g,         // "मैं पाइथन जानता हूं"  
      /मेरे\s*पास\s*(.*?)\s*का\s*अनुभव/g,  // "मेरे पास वेब डिज़ाइन का अनुभव है"
      /मैं\s*(.*?)\s*कर\s*सकता\s*हूं/g,     // "मैं प्रोग्रामिंग कर सकता हूं"
      /मेरा\s*कौशल\s*(.*?)\s*है/g,         // "मेरा कौशल डिज़ाइन है"
    ]
    
    for (const pattern of hindiSkillsPatterns) {
      const matches = [...input.matchAll(pattern)]
      if (matches.length > 0 && !currentFormData.skills) {
        const skillsValue = matches[0][1]?.trim()
        if (skillsValue) {
          setFormData((p) => ({ ...p, skills: skillsValue }))
          formField = "skills"
          return {
            text: currentLang === "hi" 
              ? `बढ़िया, ${skillsValue}! अब अपनी पसंदीदा कार्य स्थान और क्षेत्र बताएं।` 
              : `Great, ${skillsValue}! Now tell me your preferred location and sector.`,
            formField,
          }
        }
      }
    }
    
    // Try fuzzy matching for skills if direct match failed
    const similarSkills = findSimilarWord(input, 'skills')
    if (similarSkills && !currentFormData.skills) {
      setFormData((p) => ({ ...p, skills: similarSkills }))
      formField = "skills"
      return {
        text: currentLang === "hi" 
          ? `बढ़िया, ${similarSkills}! अब अपनी पसंदीदा कार्य स्थान और क्षेत्र बताएं।` 
          : `Great, ${similarSkills}! Now tell me your preferred location and sector.`,
        formField,
      }
    }

    // Location - with fuzzy matching for mispronunciations and multilingual support
    const cities = ["mumbai", "delhi", "bangalore", "pune", "hyderabad", "chennai", "kolkata", "ahmedabad", "gurgaon", "noida", "jaipur", "lucknow", "kanpur", "nagpur", "indore", "bhopal", "visakhapatnam", "kochi", "coimbatore", "madurai", "मुंबई", "दिल्ली", "बैंगलोर", "पुणे", "हैदराबाद", "चेन्नई", "कोलकाता"]
    const foundCity = cities.find((c) => lower.includes(c.toLowerCase()) || input.includes(c))
    
    // Enhanced location patterns including Hindi
    if (/(location|city|place|स्थान|शहर|where|live|stay|work|prefer|रहना|काम|पसंद|जगह)/i.test(lower) || foundCity) {
      const locationValue = foundCity ? (foundCity.charAt(0).toUpperCase() + foundCity.slice(1)) : input.trim()
      setFormData((p) => ({ ...p, location: locationValue }))
      formField = "location"
      return {
        text: currentLang === "hi" ? "अच्छी पसंद! अब अपना पसंदीदा क्षेत्र बताएं।" : "Good choice! Finally, tell me your preferred sector.",
        formField,
      }
    }
    
    // Hindi location patterns - check for common Hindi phrases about location
    const hindiLocationPatterns = [
      /मैं\s*(.*?)\s*में\s*रहता\s*हूं/g,        // "मैं दिल्ली में रहता हूं"
      /मैं\s*(.*?)\s*से\s*हूं/g,               // "मैं मुंबई से हूं"
      /मेरा\s*शहर\s*(.*?)\s*है/g,             // "मेरा शहर पुणे है"
      /मैं\s*(.*?)\s*में\s*काम\s*करना\s*चाहता/g, // "मैं बैंगलोर में काम करना चाहता हूं"
      /मुझे\s*(.*?)\s*पसंद\s*है/g,            // "मुझे दिल्ली पसंद है"
    ]
    
    for (const pattern of hindiLocationPatterns) {
      const matches = [...input.matchAll(pattern)]
      if (matches.length > 0 && !currentFormData.location) {
        const locationValue = matches[0][1]?.trim()
        if (locationValue) {
          setFormData((p) => ({ ...p, location: locationValue }))
          formField = "location"
          return {
            text: currentLang === "hi" 
              ? `समझ गया, ${locationValue}! अब अपना पसंदीदा क्षेत्र बताएं।` 
              : `Got it, ${locationValue}! Finally, tell me your preferred sector.`,
            formField,
          }
        }
      }
    }
    
    // If we're expecting location and user says just a city name
    if (!currentFormData.location && currentFormData.skills && !currentFormData.sector) {
      // Check if input is likely a city name (simple city name without other context)
      const cityMatch = cities.find((c) => 
        lower.trim() === c.toLowerCase() || 
        input.trim() === c ||
        lower.trim().includes(c.toLowerCase()) || 
        input.trim().includes(c)
      )
      if (cityMatch || input.trim().length < 20) { // Short input likely to be a city name
        const locationValue = cityMatch ? (cityMatch.charAt(0).toUpperCase() + cityMatch.slice(1)) : input.trim()
        setFormData((p) => ({ ...p, location: locationValue }))
        formField = "location"
        return {
          text: currentLang === "hi" 
            ? `समझ गया, ${locationValue}! अब अपना पसंदीदा क्षेत्र बताएं।` 
            : `Got it, ${locationValue}! Finally, tell me your preferred sector.`,
          formField,
        }
      }
    }
    
    // Try fuzzy matching for location if direct match failed
    const similarLocation = findSimilarWord(input, 'location')
    if (similarLocation && !currentFormData.location) {
      const locationValue = similarLocation.charAt(0).toUpperCase() + similarLocation.slice(1)
      setFormData((p) => ({ ...p, location: locationValue }))
      formField = "location"
      return {
        text: currentLang === "hi" 
          ? `समझ गया, ${locationValue}! अब अपना पसंदीदा क्षेत्र बताएं।` 
          : `Got it, ${locationValue}! Finally, tell me your preferred sector.`,
        formField,
      }
    }

    // Sector - with fuzzy matching for mispronunciations
    const sectors = ["it", "finance", "healthcare", "government", "education", "marketing", "banking", "tech", "technology", "medical", "business", "sales", "hr", "consulting"]
    const foundSector = sectors.find((s) => lower.includes(s))
    if (/(sector|field|industry|क्षेत्र|work|job|career|domain|area)/i.test(lower) || foundSector) {
      const sectorValue = foundSector ? foundSector.toUpperCase() : input.trim()
      setFormData((p) => ({ ...p, sector: sectorValue }))
      formField = "sector"
      return {
        text:
          currentLang === "hi"
            ? "बहुत बढ़िया! आपकी जानकारी पूर्ण है। आप अब पंजीकरण पूरा कर सकते हैं।"
            : "Perfect! I have your details. You can complete registration now.",
        formField,
      }
    }
    // Try fuzzy matching for sector if direct match failed
    const similarSector = findSimilarWord(input, 'sector')
    if (similarSector && !currentFormData.sector) {
      const sectorValue = similarSector.toUpperCase()
      setFormData((p) => ({ ...p, sector: sectorValue }))
      formField = "sector"
      return {
        text: currentLang === "hi"
          ? `परफेक्ट, ${sectorValue}! आपकी जानकारी पूर्ण है। आप अब पंजीकरण पूरा कर सकते हैं।`
          : `Perfect, ${sectorValue}! I have your details. You can complete registration now.`,
        formField,
      }
    }

    // Multi-field parsing - try to extract multiple pieces of information at once
    if (!fieldsUpdated.length) {
      // Check for education terms
      const educationTerms = ["btech", "engineering", "mba", "bba", "bca", "mca", "bsc", "msc", "diploma", "bachelor", "master", "graduate", "commerce", "arts", "medical", "law", "phd", "ca"]
      const educationFound = educationTerms.find(term => lower.includes(term))
      if (educationFound && !updatedFormData.education) {
        updatedFormData.education = educationFound.toUpperCase()
        fieldsUpdated.push("education")
      }

      // Check for skills
      const skillTerms = ["java", "python", "programming", "coding", "design", "management", "marketing", "react", "javascript", "html", "css", "web", "mobile", "database", "sql"]
      const skillsFound = skillTerms.filter(skill => lower.includes(skill))
      if (skillsFound.length && !updatedFormData.skills) {
        updatedFormData.skills = skillsFound.join(", ")
        fieldsUpdated.push("skills")
      }

      // Check for cities
      const cityTerms = ["mumbai", "delhi", "bangalore", "pune", "hyderabad", "chennai", "kolkata", "ahmedabad", "gurgaon", "noida", "jaipur"]
      const cityFound = cityTerms.find(city => lower.includes(city))
      if (cityFound && !updatedFormData.location) {
        updatedFormData.location = cityFound.charAt(0).toUpperCase() + cityFound.slice(1)
        fieldsUpdated.push("location")
      }

      // Check for sectors
      const sectorTerms = ["it", "technology", "finance", "healthcare", "government", "education", "marketing", "banking", "consulting", "business"]
      const sectorFound = sectorTerms.find(sector => lower.includes(sector))
      if (sectorFound && !updatedFormData.sector) {
        updatedFormData.sector = sectorFound.toUpperCase()
        fieldsUpdated.push("sector")
      }

      // If we found multiple fields, update them all
      if (fieldsUpdated.length > 0) {
        setFormData((p) => ({ ...p, ...updatedFormData }))
        formField = fieldsUpdated[0]
        
        const missingAfterUpdate = nextMissingFields(updatedFormData)
        if (missingAfterUpdate.length === 0) {
          return {
            text: currentLang === "hi"
              ? "बहुत बढ़िया! आपकी पूरी जानकारी मिल गई। अब आप पंजीकरण पूरा कर सकते हैं।"
              : "Excellent! I have all your information. You can now complete registration.",
            formField,
          }
        } else {
          const remainingFields = missingAfterUpdate.slice(0, 2)
          return {
            text: currentLang === "hi"
              ? `बहुत अच्छा! अब ${promptForMultipleFields(remainingFields)}`
              : `Great! Now ${promptForMultipleFields(remainingFields)}`,
            formField,
          }
        }
      }
    }

    // Nothing captured; ask targeted next question(s)
    const missingFields = nextMissingFields(currentFormData)
    if (missingFields.length === 0) {
      return {
        text: currentLang === "hi" 
          ? "आपकी जानकारी पूर्ण है। आप अब पंजीकरण पूरा कर सकते हैं।"
          : "Your information is complete. You can now complete registration.",
      }
    }
    
    // Ask for multiple fields at once if appropriate
    const fieldsToAsk = missingFields.length > 3 ? missingFields.slice(0, 3) : 
                       missingFields.length > 1 ? missingFields.slice(0, 2) : 
                       [missingFields[0]]
    
    return {
      text: promptForMultipleFields(fieldsToAsk),
    }
  }

  const isFormComplete = () => formData.name && formData.education && formData.skills && formData.location && formData.sector

  return (
    <div className="bg-white rounded-xl shadow-lg border border-orange-200 overflow-hidden">
      <div className="p-6 md:p-10">
        {/* Assistant prompt */}
        <div className="flex items-center justify-center text-center mb-6">
          <div className="flex items-center gap-2 text-gray-800 text-base md:text-lg font-medium">
            <Bot className="w-5 h-5 text-orange-600" />
            <span>{assistantText}</span>
          </div>
        </div>

        {/* Examples Section */}
        {!isFormComplete() && (
          <div className="mb-6 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-lg p-4">
            <div className="text-sm text-gray-700">
              {!formData.education && (
                <div className="mb-3">
                  <div className="font-medium text-orange-800 mb-1">
                    {currentLang === "hi" ? "शिक्षा के उदाहरण:" : "Education examples:"}
                  </div>
                  <div className="text-xs text-gray-600">
                    B.Tech, MBA, B.Sc, BCA, MCA, Diploma, BA, MA, MBBS, CA, LLB
                  </div>
                </div>
              )}
              {!formData.skills && (
                <div className="mb-3">
                  <div className="font-medium text-orange-800 mb-1">
                    {currentLang === "hi" ? "कौशल के उदाहरण:" : "Skills examples:"}
                  </div>
                  <div className="text-xs text-gray-600">
                    Java, Python, Web Design, Marketing, Data Analysis, Management, Sales
                  </div>
                </div>
              )}
              {!formData.location && (
                <div className="mb-3">
                  <div className="font-medium text-orange-800 mb-1">
                    {currentLang === "hi" ? "स्थान के उदाहरण:" : "Location examples:"}
                  </div>
                  <div className="text-xs text-gray-600">
                    Delhi, Mumbai, Bangalore, Pune, Hyderabad, Chennai, Kolkata
                  </div>
                </div>
              )}
              {!formData.sector && (
                <div className="mb-3">
                  <div className="font-medium text-orange-800 mb-1">
                    {currentLang === "hi" ? "क्षेत्र के उदाहरण:" : "Sector examples:"}
                  </div>
                  <div className="text-xs text-gray-600">
                    IT, Finance, Healthcare, Government, Education, Banking, Consulting
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Big Mic Button */}
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={() => {
              if (!speechSupported) return
              
              // Stop any ongoing speech first
              stopSpeaking()
              setUserManuallyControlling(true)
              
              if (!greeted && synthesisSupported) {
                // speak greeting first, then listen (only on very first interaction)
                const greet = currentLang === "hi"
                  ? "नमस्ते! कृपया अपना उत्तर बोलें।"
                  : "Hello! Please speak your answer."
                setAssistantText(greet)
                speak(greet)
                setGreeted(true)
                setTimeout(() => startListening(), 300)
              } else {
                // For all subsequent interactions, just toggle listening without extra speech
                if (isListening) {
                  stopListening()
                } else {
                  startListening()
                }
              }
            }}
            disabled={!speechSupported}
            className={`rounded-full w-28 h-28 md:w-40 md:h-40 flex items-center justify-center text-white shadow-md focus:outline-none focus:ring-4 transition-all
              ${isListening ? "bg-red-600 animate-pulse" : "bg-orange-600 hover:bg-orange-700"}
              ${!speechSupported ? "opacity-50 cursor-not-allowed" : ""}
            `}
            aria-label={isListening ? (currentLang === "hi" ? "सुनना रोकें" : "Stop listening") : (currentLang === "hi" ? "बोलना शुरू करें" : "Start speaking")}
          >
            {isListening ? <MicOff className="w-10 h-10" /> : <Mic className="w-12 h-12" />}
          </button>

          {/* Status line */}
          <div className="mt-4 text-sm text-gray-600 h-5">
            {isSpeaking && (currentLang === "hi" ? "बोल रहा हूं..." : "Speaking...")}
            {!isSpeaking && isListening && (currentLang === "hi" ? "सुन रहा हूं..." : "Listening...")}
            {!isSpeaking && !isListening && !speechSupported && (
              currentLang === "hi" ? "माइक्रोफ़ोन उपलब्ध नहीं। नीचे टाइप करें।" : "Microphone unavailable. Use typing below."
            )}
          </div>

          {/* Minimal typing fallback toggle */}
          <div className="mt-2">
            <button
              onClick={() => setShowTyping((v) => !v)}
              className="text-xs text-blue-600 underline"
            >
              {showTyping
                ? (currentLang === "hi" ? "टाइपिंग छुपाएं" : "Hide typing")
                : (currentLang === "hi" ? "टाइप करना चाहते हैं?" : "Prefer typing?")}
            </button>
          </div>
          {showTyping && (
            <div className="mt-3 flex gap-2 w-full max-w-md">
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder={currentLang === "hi" ? "यहां टाइप करें..." : "Type here..."}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit(textInput)}
              />
              <Button onClick={() => handleSubmit(textInput)} className="px-4" aria-label="Send">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Info and tips */}
        <div className="mt-6 space-y-2">
          {permissionTip && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-sm text-blue-900 text-center">{permissionTip}</div>
          )}
          {!synthesisSupported && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 text-sm text-yellow-900 text-center flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{currentLang === "hi" ? "वॉइस आउटपुट उपलब्ध नहीं है।" : "Voice output is not supported."}</span>
            </div>
          )}
          {isProcessing && (
            <div className="text-sm text-gray-600 text-center">{currentLang === "hi" ? "सोच रहा हूं..." : "Thinking..."}</div>
          )}
          {currentText && (
            <div className="text-sm text-blue-700 text-center">{currentLang === "hi" ? "आपने कहा:" : "You said:"} {currentText}</div>
          )}
        </div>

        {/* Collected summary */}
        {Object.keys(formData).length > 0 && (
          <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="font-medium text-orange-900 mb-2">{currentLang === "hi" ? "भरी गई जानकारी" : "Your details so far"}</div>
            <div className="text-sm text-orange-800 space-y-1">
              {formData.name && <div>• {currentLang === "hi" ? "नाम:" : "Name:"} {formData.name}</div>}
              {formData.education && <div>• {currentLang === "hi" ? "शिक्षा:" : "Education:"} {formData.education}</div>}
              {formData.skills && <div>• {currentLang === "hi" ? "कौशल:" : "Skills:"} {formData.skills}</div>}
              {formData.location && <div>• {currentLang === "hi" ? "स्थान:" : "Location:"} {formData.location}</div>}
              {formData.sector && <div>• {currentLang === "hi" ? "क्षेत्र:" : "Sector:"} {formData.sector}</div>}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 space-y-2">
          <Button
            className={`${isFormComplete() ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800" : "bg-gray-400 cursor-not-allowed"} text-white px-6 py-2 text-base font-medium w-full`}
            onClick={() => {
              try {
                const profile = toUserProfile(formData)
                storeUserData(profile)
              } catch {}
              localStorage.setItem("voiceAssistantData", JSON.stringify(formData))
              window.location.href = "/registration"
            }}
            disabled={!isFormComplete()}
          >
            <UserCheck className="w-4 h-4 mr-2" /> {currentLang === "hi" ? "पूर्ण पंजीकरण" : "Complete Registration"}
          </Button>
          <Button
            variant="outline"
            className="w-full px-6 py-2"
            onClick={() => {
              try {
                const profile = toUserProfile(formData)
                storeUserData(profile)
                if (typeof window !== 'undefined') {
                  sessionStorage.setItem('simpleView', '1')
                }
              } catch {}
              window.location.href = "/recommendations?simple=1"
            }}
          >
            <Target className="w-4 h-4 mr-2" /> {currentLang === "hi" ? "सिफारिशें देखें" : "View Recommendations"}
          </Button>
        </div>
      </div>
    </div>
  )
}