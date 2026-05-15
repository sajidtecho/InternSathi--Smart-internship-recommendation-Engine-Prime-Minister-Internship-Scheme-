'use client'

import React, { useState, useRef, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Bot, MessageCircle, Send, X, Minimize2, Maximize2, HelpCircle } from 'lucide-react'
import { languages } from '@/lib/i18n'
import { useChatbotTranslation, buildFaqPairs, chatbotTranslations } from '@/lib/translations/chatbot'

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

export default function PMISChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showLangDropdown, setShowLangDropdown] = useState(false)
  const [currentLang, setCurrentLang] = useState<string>('en')

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Determine effective language (fallback to en if unsupported)
  const supportedCodes = useMemo(() => Object.keys(chatbotTranslations), [])
  const effectiveLang = supportedCodes.includes(currentLang) ? currentLang : 'en'
  
  // Get translations directly
  const cb = useMemo(() => {
    const translations = chatbotTranslations[effectiveLang as keyof typeof chatbotTranslations] || chatbotTranslations.en
    return translations
  }, [effectiveLang])
  
  const faqPairs = useMemo(() => buildFaqPairs(cb), [cb, effectiveLang])

  // Build lightweight FAQ list from structured pairs (first 5)
  const faqData = useMemo(() => faqPairs.slice(0, 5).map(p => ({ question: p.q, answer: p.a })), [faqPairs, effectiveLang])

  // Hydrate stored language on mount
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('chatbotLang')
      if (stored && supportedCodes.includes(stored)) {
        setCurrentLang(stored)
      }
    } catch (_) {}
  }, [supportedCodes])

  // Reset welcome message when language changes
  useEffect(() => {
    setMessages([
      {
        id: '1',
        text: cb.ui.welcome,
        isBot: true,
        timestamp: new Date()
      }
    ])
  }, [currentLang, cb])
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Close language dropdown on outside click (simple approach)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showLangDropdown) {
        const target = event.target as Element
        const dropdown = target?.closest('[data-dropdown="language"]')
        if (!dropdown) {
          setShowLangDropdown(false)
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showLangDropdown])

  const handleLanguageChange = (langCode: string) => {
    if (supportedCodes.includes(langCode)) {
      setCurrentLang(langCode)
      try { 
        window.localStorage.setItem('chatbotLang', langCode) 
      } catch (_) {}
      setShowLangDropdown(false)
    }
  }

  // Simple keyword + FAQ matching
  const getBotResponse = (input: string): string => {
    const q = input.toLowerCase()

    // Direct FAQ question substring match
    for (const faq of faqData) {
      if (faq.question.toLowerCase().includes(q) || q.includes(faq.question.toLowerCase())) {
        return faq.answer
      }
    }

    // Keyword sets
    const { keywords, faq, dynamic } = cb as any

    const matchKeyword = (group: string[]) => group.some(w => q.includes(w.toLowerCase()))

    if (matchKeyword(keywords.register || [])) return faq.howToApply_a
    if (matchKeyword(keywords.eligibility || [])) return faq.whoIsEligible_a
    if (matchKeyword(keywords.apply || [])) return faq.howToApply_a
    if (matchKeyword(keywords.stipend || [])) return faq.whatIsStipend_a
    if (matchKeyword(keywords.duration || [])) return faq.internshipDuration_a

    // Greetings
    if (/\b(hi|hello|hey)\b/i.test(q)) return dynamic.greeting || cb.ui.welcome

    // Thanks
    if (/\b(thanks|thank you)\b/i.test(q)) return dynamic.thanks

    return dynamic.fallback || cb.ui.welcome
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      const botResponse = getBotResponse(userMessage.text)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 600)
  }

  const handleFAQClick = (q: string, a: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: q,
      isBot: false,
      timestamp: new Date()
    }

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: a,
      isBot: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage, botMessage])
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 shadow-lg flex items-center justify-center"
          title={cb.ui.assistant}
        >
          <MessageCircle className="w-5 h-5" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-h-[80vh]" dir={effectiveLang === 'ur' ? 'rtl' : 'ltr'}>
      <div className={`w-96 ${isMinimized ? 'h-16' : 'h-[600px]'} shadow-2xl border border-blue-200 rounded-lg transition-all duration-300 flex flex-col overflow-hidden bg-white`}>
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 flex-shrink-0 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bot className="w-6 h-6" />
              <h3 className="text-lg font-semibold m-0">{cb.ui.assistant}</h3>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative" data-dropdown="language">
                <button
                  onClick={() => setShowLangDropdown(!showLangDropdown)}
                  className="px-2 py-1 text-xs font-medium bg-blue-500/40 hover:bg-blue-500/60 rounded text-white border border-white/20 transition"
                  title={cb.ui.changeLanguage}
                >
                  {languages[effectiveLang as keyof typeof languages] || effectiveLang}
                </button>
                {showLangDropdown && (
                  <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[140px] max-h-56 overflow-y-auto">
                    {supportedCodes.map(code => {
                      const label = languages[code as keyof typeof languages] || code
                      return (
                        <button
                          key={code}
                          onClick={() => handleLanguageChange(code)}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                            effectiveLang === code ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700'
                          }`}
                        >
                          {label}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-blue-700 p-2"
                title={isMinimized ? cb.ui.expand : cb.ui.minimize}
              >
                {isMinimized ? <Maximize2 className="w-5 h-5" /> : <Minimize2 className="w-5 h-5" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-blue-700 p-2"
                title={cb.ui.close}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
        {!isMinimized && (
          <div className="p-0 flex flex-col flex-1 overflow-hidden">
            <div className="p-3 border-b bg-gray-50 flex-shrink-0">
              <h4 className="text-sm font-semibold mb-2 text-gray-600">{cb.ui.faqs}</h4>
              <div className="grid gap-2">
                {faqData.map((faq, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleFAQClick(faq.question, faq.answer)}
                    className="text-left justify-start h-auto p-2 text-xs hover:bg-blue-50 border-gray-300"
                  >
                    <HelpCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{faq.question}</span>
                  </Button>
                ))}
              </div>
            </div>
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-white"
            >
              {messages.map(message => (
                <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div
                    className={`max-w-[85%] p-3 rounded-xl ${
                      message.isBot ? 'bg-gray-100 text-gray-800' : 'bg-blue-600 text-white'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-xl">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t bg-white flex-shrink-0">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                  placeholder={cb.ui.placeholder}
                  className="text-base"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-blue-600 hover:bg-blue-700 px-4"
                  title={cb.ui.send}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// NOTE: This component now uses chatbot-specific translations from lib/translations/chatbot.
// Add more language files (e.g., ur, ta, te...) to extend support; they will fallback to English automatically.