"use client"

import { createContext, useContext, useState } from "react"
import { translations } from "@/lib/translations"

type Language = "en" | "ar"
type Translations = typeof translations.en

interface LanguageContextType {
  language: Language
  t: Translations
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const value = {
    language,
    t: translations[language],
    setLanguage,
  }

  return (
    <LanguageContext.Provider value={value}>
      <div dir={language === "ar" ? "rtl" : "ltr"} className="min-h-screen">
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

