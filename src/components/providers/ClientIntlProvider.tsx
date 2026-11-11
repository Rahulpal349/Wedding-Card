'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';

export type AppLocale = 'bn' | 'en';

interface LocaleContextType {
  locale: AppLocale;
  setLocale: (locale: AppLocale) => void;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: 'bn',
  setLocale: () => {},
});

export function useAppLocale() {
  return useContext(LocaleContext);
}

interface ClientIntlProviderProps {
  initialLocale: string;
  bnMessages: Record<string, any>;
  enMessages: Record<string, any>;
  children: ReactNode;
}

export default function ClientIntlProvider({
  initialLocale,
  bnMessages,
  enMessages,
  children,
}: ClientIntlProviderProps) {
  const [locale, setLocaleState] = useState<AppLocale>(
    initialLocale === 'en' ? 'en' : 'bn'
  );

  // Sync with localStorage on client mount if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('preferred-locale');
      if (saved === 'en' || saved === 'bn') {
        if (saved !== locale) {
          setLocaleState(saved);
          window.history.replaceState(null, '', `/${saved}`);
          document.documentElement.lang = saved;
        }
      }
    } catch {}
  }, []);

  const setLocale = (newLocale: AppLocale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem('preferred-locale', newLocale);
      // Smoothly update browser URL bar without triggering Next.js route reload or scroll-to-top
      window.history.replaceState(null, '', `/${newLocale}`);
      document.documentElement.lang = newLocale;
    } catch {}
  };

  const messages = locale === 'en' ? enMessages : bnMessages;

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <div lang={locale}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </div>
    </LocaleContext.Provider>
  );
}

