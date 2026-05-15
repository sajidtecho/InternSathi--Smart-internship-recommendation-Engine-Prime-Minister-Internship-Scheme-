"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Search, Bell, User, UserPlus, Home, FileText, Camera, UserCheck, Smartphone, HelpCircle, Book, Volume2, Languages, ChevronDown, Accessibility, Heart } from "lucide-react"
import { LanguageSwitcher } from "./language-switcher"
import { languages } from "@/lib/i18n"
import { useTranslationContext } from "@/lib/translation-provider"

export function GovernmentHeader({ currentLang: propLang, onLanguageChange: propOnLanguageChange }: { currentLang?: string; onLanguageChange?: (lang: string) => void } = {}) {
  const { currentLang: contextLang, setCurrentLang: setContextLang, t } = useTranslationContext();
  const [fontSize, setFontSize] = useState("normal")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false)
  
  // Use prop language if provided, otherwise use context
  const currentLang = propLang || contextLang;

  const handleLanguageChange = (langCode: string) => {
    if (propOnLanguageChange) {
      propOnLanguageChange(langCode)
    } else {
      setContextLang(langCode)
    }
    setIsLangDropdownOpen(false)
    // Store language preference in localStorage
    localStorage.setItem("preferredLanguage", langCode)
    // Trigger a custom event to notify other components
    window.dispatchEvent(new CustomEvent("languageChanged", { detail: langCode }))
  }

  const handleFontSizeChange = (size: string) => {
    setFontSize(size)
    const root = document.documentElement
    switch(size) {
      case "small":
        root.style.fontSize = "14px"
        break
      case "normal":
        root.style.fontSize = "16px"
        break
      case "large":
        root.style.fontSize = "18px"
        break
    }
  }

  const handleAudioToggle = () => {
    // Implement text-to-speech functionality
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance("Audio support activated for PM Internship Portal")
      speechSynthesis.speak(utterance)
    }
  }

  const handleScreenReader = () => {
    // Announce page information for screen readers
    const announcement = "PM Internship Portal - Government of India. Navigate using tab key for accessible browsing."
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(announcement)
      speechSynthesis.speak(utterance)
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="bg-white">
      {/* Top Government Bar - Black */}
      <div className="bg-black text-white py-1 text-xs">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/icons/indian-flag.svg" alt="India Flag" className="w-8 h-5" />
            <span>{t.govOfIndia}</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <button 
              onClick={handleAudioToggle}
              className="text-white hover:text-orange-300 flex items-center gap-1 transition-colors"
              title="Audio Support - Click to test"
              aria-label="Audio Support"
            >
              <Volume2 className="w-3 h-3" />
            </button>
            <span className="text-gray-400">/</span>
            <div className="relative">
              <button 
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="text-white hover:text-orange-300 flex items-center gap-1 transition-colors"
                title="Language Selection"
                aria-label="Language Selection"
              >
                <Languages className="w-3 h-3" />
                <span>{languages[currentLang as keyof typeof languages]}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              
              {/* Language Dropdown */}
              {isLangDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white text-black border border-gray-300 rounded shadow-lg z-50 min-w-[150px]">
                  {Object.entries(languages).map(([code, name]) => (
                    <button
                      key={code}
                      onClick={() => handleLanguageChange(code)}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-100 transition-colors ${
                        currentLang === code ? 'bg-blue-50 text-blue-700' : ''
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <span className="text-gray-400">/</span>
            <button 
              onClick={handleScreenReader}
              className="text-white hover:text-orange-300 flex items-center gap-1 transition-colors"
              title="Screen Reader Support"
              aria-label="Screen Reader Support"
            >
              <Accessibility className="w-3 h-3" />
              <span>Screen Reader</span>
            </button>
            <span className="text-gray-400">/</span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleFontSizeChange("small")}
                className={`hover:text-orange-300 px-2 py-1 rounded text-xs transition-colors ${fontSize === "small" ? "bg-orange-600" : "bg-gray-800"}`}
                title="Decrease font size"
                aria-label="Small font size"
              >
                A-
              </button>
              <button 
                onClick={() => handleFontSizeChange("normal")}
                className={`hover:text-orange-300 px-2 py-1 rounded text-xs transition-colors ${fontSize === "normal" ? "bg-orange-600" : "bg-gray-700"}`}
                title="Normal font size"
                aria-label="Normal font size"
              >
                A
              </button>
              <button 
                onClick={() => handleFontSizeChange("large")}
                className={`hover:text-orange-300 px-2 py-1 rounded text-xs transition-colors ${fontSize === "large" ? "bg-orange-600" : "bg-gray-600"}`}
                title="Increase font size"
                aria-label="Large font size"
              >
                A+
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - White */}
      <div className="bg-white py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <img 
                src="/icons/ministry-corporate-affairs-official.png" 
                alt="Ministry of Corporate Affairs" 
                className="h-16 w-auto"
              />
              <img 
                src="/icons/pm-internship-logo.svg" 
                alt="PM Internship" 
                className="h-16 w-auto"
              />
            </div>

            <div className="hidden md:flex items-center gap-2">
              <Button
                size="sm"
                className="bg-orange-600 text-white hover:bg-orange-700 border-none text-xs px-3 py-1"
                asChild
                title="Login"
                aria-label="Login"
              >
                <Link href="/login">
                  <User className="w-3 h-3 mr-1" />
                  Login
                </Link>
              </Button>
              <Button
                size="sm"
                className="bg-orange-600 text-white hover:bg-orange-700 border-none text-xs px-3 py-1"
                asChild
                title="Youth Registration"
                aria-label="Youth Registration"
              >
                <Link href="/registration">
                  <UserPlus className="w-3 h-3 mr-1" />
                  Youth Registration
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar - Blue */}
      <div className="bg-[#0d47a1] text-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <a 
              href="/" 
              className="flex items-center gap-2 px-4 py-3 hover:bg-blue-700 transition-colors"
              title="Go to Homepage"
            >
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">{t.home?.toUpperCase()}</span>
            </a>
            <button 
              onClick={() => scrollToSection('opportunities')}
              className="flex items-center gap-2 px-4 py-3 hover:bg-blue-700 transition-colors"
              title="View Internship Opportunities"
            >
              <FileText className="w-4 h-4" />
              <span className="text-sm font-medium">{t.opportunities?.toUpperCase()}</span>
            </button>
            <button 
              onClick={() => scrollToSection('gallery')}
              className="flex items-center gap-2 px-4 py-3 hover:bg-blue-700 transition-colors"
              title="View Gallery"
            >
              <Camera className="w-4 h-4" />
              <span className="text-sm font-medium">{t.gallery?.toUpperCase()}</span>
            </button>
            <button 
              onClick={() => scrollToSection('eligibility')}
              className="flex items-center gap-2 px-4 py-3 hover:bg-blue-700 transition-colors"
              title="Check Eligibility Criteria"
            >
              <UserCheck className="w-4 h-4" />
              <span className="text-sm font-medium">{t.eligibility?.toUpperCase()}</span>
            </button>
            <button 
              onClick={() => scrollToSection('mobile-app')}
              className="flex items-center gap-2 px-4 py-3 hover:bg-blue-700 transition-colors"
              title="Download Mobile App"
            >
              <Smartphone className="w-4 h-4" />
              <span className="text-sm font-medium">{t.mobileApp?.toUpperCase()}</span>
            </button>
            <button 
              onClick={() => scrollToSection('support')}
              className="flex items-center gap-2 px-4 py-3 hover:bg-blue-700 transition-colors"
              title="Get Support & Help"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{t.support?.toUpperCase()}</span>
            </button>
            <button 
              onClick={() => scrollToSection('ai-matcher')}
              className="flex items-center gap-2 px-4 py-3 hover:bg-blue-700 transition-colors"
              title="Get Personalized Recommendations"
            >
              <Book className="w-4 h-4" />
              <span className="text-sm font-medium">{t.aiMatcher?.toUpperCase()}</span>
            </button>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <div className="flex items-center justify-between py-3">
              <span className="text-sm font-medium">PM Internship Portal</span>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 hover:bg-blue-700 rounded transition-colors"
                title="Toggle Menu"
                aria-label="Toggle Navigation Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
            
            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
              <div className="border-t border-blue-600 bg-blue-800">
                <nav className="flex flex-col">
                  <a 
                    href="/" 
                    className="flex items-center gap-3 px-4 py-3 hover:bg-blue-700 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Home className="w-4 h-4" />
                    <span className="text-sm">{t.home?.toUpperCase()}</span>
                  </a>
                  <button 
                    onClick={() => {
                      scrollToSection('opportunities')
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-blue-700 transition-colors text-left"
                  >
                    <FileText className="w-4 h-4" />
                    <span className="text-sm">{t.opportunities?.toUpperCase()}</span>
                  </button>
                  <button 
                    onClick={() => {
                      scrollToSection('gallery')
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-blue-700 transition-colors text-left"
                  >
                    <Camera className="w-4 h-4" />
                    <span className="text-sm">{t.gallery?.toUpperCase()}</span>
                  </button>
                  <button 
                    onClick={() => {
                      scrollToSection('eligibility')
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-blue-700 transition-colors text-left"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span className="text-sm">{t.eligibility?.toUpperCase()}</span>
                  </button>
                  <button 
                    onClick={() => {
                      scrollToSection('mobile-app')
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-blue-700 transition-colors text-left"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span className="text-sm">{t.mobileApp?.toUpperCase()}</span>
                  </button>
                  <button 
                    onClick={() => {
                      scrollToSection('support')
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-blue-700 transition-colors text-left"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span className="text-sm">{t.support?.toUpperCase()}</span>
                  </button>
                  <button 
                    onClick={() => {
                      scrollToSection('ai-matcher')
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-blue-700 transition-colors text-left"
                  >
                    <Book className="w-4 h-4" />
                    <span className="text-sm">{t.aiMatcher?.toUpperCase()}</span>
                  </button>
                  
                  {/* Login (Mobile) */}
                  <Link
                    href="/login"
                    className="flex items-center gap-3 px-4 py-3 transition-colors text-left border-t border-blue-600 mt-2 text-orange-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-medium">LOGIN</span>
                  </Link>
                  {/* Youth Registration (Mobile) */}
                  <Link
                    href="/registration"
                    className="flex items-center gap-3 px-4 py-3 transition-colors text-left text-orange-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserPlus className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-medium">YOUTH REGISTRATION</span>
                  </Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}