'use client';

import { useAppLocale } from '@/components/providers/ClientIntlProvider';

export default function LanguageToggle() {
  const { locale: currentLocale, setLocale } = useAppLocale();

  const switchLocale = (targetLocale: 'bn' | 'en') => {
    if (targetLocale === currentLocale) return;
    setLocale(targetLocale);
  };

  return (
    <div
      role="group"
      aria-label="Language selection"
      className="inline-flex items-center p-1 rounded-full bg-[#FFF8EC]/95 backdrop-blur-md border border-[#B3172F]/20 shadow-md min-h-[44px]"
    >
      <button
        type="button"
        onClick={() => switchLocale('bn')}
        className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer min-h-[36px] ${
          currentLocale === 'bn'
            ? 'bg-[#B3172F] text-white shadow-sm'
            : 'text-[#6F0E20] hover:text-[#B3172F]'
        }`}
        aria-pressed={currentLocale === 'bn'}
      >
        বাংলা
      </button>

      <span className="text-[#B3172F]/30 text-xs px-0.5 select-none" aria-hidden="true">
        |
      </span>

      <button
        type="button"
        onClick={() => switchLocale('en')}
        className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer min-h-[36px] ${
          currentLocale === 'en'
            ? 'bg-[#B3172F] text-white shadow-sm'
            : 'text-[#6F0E20] hover:text-[#B3172F]'
        }`}
        aria-pressed={currentLocale === 'en'}
      >
        EN
      </button>
    </div>
  );
}
