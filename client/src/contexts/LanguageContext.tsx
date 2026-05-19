import React, { createContext, useContext, useState, useCallback } from 'react';

export type Language = 'ko' | 'en';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (ko: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ko',
  toggleLang: () => {},
  t: (ko) => ko,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('ko');

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'ko' ? 'en' : 'ko'));
  }, []);

  const t = useCallback(
    (ko: string, en: string) => (lang === 'ko' ? ko : en),
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
