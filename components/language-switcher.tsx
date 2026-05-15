"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { languages } from "@/lib/i18n"

interface LanguageSwitcherProps {
  currentLang: string
  onLanguageChange: (lang: string) => void
}

export function LanguageSwitcher({ currentLang, onLanguageChange }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="text-white hover:bg-slate-700 px-3 py-1 text-sm"
      >
        {languages[currentLang as keyof typeof languages] || "English"}
        <ChevronDown className="w-3 h-3 ml-1" />
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[120px]">
          {Object.entries(languages).map(([code, name]) => (
            <button
              key={code}
              onClick={() => {
                onLanguageChange(code)
                setIsOpen(false)
              }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                currentLang === code ? "bg-orange-50 text-orange-600" : "text-gray-700"
              }`}
              dir={code === "ur" ? "rtl" : "ltr"}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
