// language-context.tsx
import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { translations, Language } from "@shared/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (section: keyof typeof translations.it, key?: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper per risolvere "form.name" su oggetti annidati
function getByPath(obj: any, path?: string) {
  if (!path) return obj;
  return path.split(".").reduce((acc, k) => (acc != null ? acc[k] : undefined), obj);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("it");

  const t = useCallback(
    (section: keyof typeof translations.it, key?: string) => {
      // base corrente
      const base = translations[language][section];

      // 1) prova lingua corrente
      const v1 = getByPath(base, key);
      if (v1 != null) return v1;

      // 2) fallback italiano
      const v2 = getByPath(translations.it[section], key);
      if (v2 != null) return v2;

      // 3) fallback inglese
      const v3 = getByPath(translations.en[section], key);
      if (v3 != null) return v3;

      // 4) fallback minimale: ritorna la chiave
      return key ?? section;
    },
    [language]
  );

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