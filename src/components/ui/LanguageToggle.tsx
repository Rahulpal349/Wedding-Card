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
      className="liquid-glass inline-flex items-center p-1 rounded-full min-h-[44px]"
    >
      <button
        type="button"
        onClick={() => switchLocale('bn')}
        className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer min-h-[36px] ${
          currentLocale === 'bn'
            ? 'bg-gradient-to-r from-[#B3172F] to-[#941224] text-white shadow-sm'
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
            ? 'bg-gradient-to-r from-[#B3172F] to-[#941224] text-white shadow-sm'
            : 'text-[#6F0E20] hover:text-[#B3172F]'
        }`}
        aria-pressed={currentLocale === 'en'}
      >
        EN
      </button>
    </div>
  );
}
