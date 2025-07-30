import { createContext, useContext, useState, ReactNode } from "react";
import { translations, Language } from "@shared/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (section: keyof typeof translations.it, key?: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("it");

  const t = (section: keyof typeof translations.it, key?: string) => {
    const sectionData = translations[language][section];
    if (key && typeof sectionData === 'object' && sectionData !== null) {
      return (sectionData as any)[key] || translations.it[section][key as keyof typeof translations.it[typeof section]];
    }
    return sectionData || translations.it[section];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}