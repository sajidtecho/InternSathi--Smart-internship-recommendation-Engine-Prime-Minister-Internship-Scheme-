"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useTranslation, languages } from '@/lib/i18n'

interface TranslationContextType {
  currentLang: string
  setCurrentLang: (lang: string) => void
  t: any
  isLoading: boolean
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [currentLang, setCurrentLangState] = useState('en')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load language from localStorage on mount
    const stored = localStorage.getItem('language')
    if (stored && languages[stored as keyof typeof languages]) {
      setCurrentLangState(stored)
    }
    setIsLoading(false)
  }, [])

  const setCurrentLang = (lang: string) => {
    setCurrentLangState(lang)
    localStorage.setItem('language', lang)
    
    // Update document direction for RTL languages
    if (lang === 'ur') {
      document.documentElement.dir = 'rtl'
    } else {
      document.documentElement.dir = 'ltr'
    }
    
    // Update document lang attribute
    document.documentElement.lang = lang
  }

  const t = useTranslation(currentLang as any)

  return (
    <TranslationContext.Provider value={{ currentLang, setCurrentLang, t, isLoading }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslationContext() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error('useTranslationContext must be used within a TranslationProvider')
  }
  return context
}