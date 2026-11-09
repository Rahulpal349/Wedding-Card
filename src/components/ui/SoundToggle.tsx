'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function SoundToggle() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const t = useTranslations('controls');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('wedding-sound-enabled');
      if (saved === 'true') {
        setSoundEnabled(true);
        window.dispatchEvent(new CustomEvent('sound-toggle-changed', { detail: { enabled: true } }));
      }
    } catch {}

    const handleCustomChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ enabled: boolean }>;
      if (customEvent.detail !== undefined) {
        setSoundEnabled(customEvent.detail.enabled);
      }
    };

    window.addEventListener('sound-toggle-changed', handleCustomChange);
    return () => window.removeEventListener('sound-toggle-changed', handleCustomChange);
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    try {
      localStorage.setItem('wedding-sound-enabled', String(next));
    } catch {}
    window.dispatchEvent(new CustomEvent('sound-toggle-changed', { detail: { enabled: next } }));
  };

  return (
    <button
      type="button"
      onClick={toggleSound}
      aria-pressed={soundEnabled}
      aria-label={soundEnabled ? t('soundOff') : t('soundOn')}
      title={soundEnabled ? t('soundOff') : t('soundOn')}
      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-[#FFF8EC]/90 hover:bg-[#F6E9D2] backdrop-blur-md text-[#6F0E20] font-semibold text-xs sm:text-sm border border-[#B5532E]/30 shadow-md transition-all duration-200 min-h-[44px] min-w-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705] cursor-pointer"
    >
      {soundEnabled ? (
        <>
          {/* Sound On Icon */}
          <svg className="w-4 h-4 text-[#B3172F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
          <span className="hidden sm:inline">{t('soundOn')}</span>
        </>
      ) : (
        <>
          {/* Sound Off (Muted) Icon */}
          <svg className="w-4 h-4 text-[#3A0D14]/70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
          <span className="hidden sm:inline">{t('soundOff')}</span>
        </>
      )}
    </button>
  );
}

