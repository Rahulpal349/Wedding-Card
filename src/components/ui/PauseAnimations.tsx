'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function PauseAnimations() {
  const [isPaused, setIsPaused] = useState(false);
  const t = useTranslations('controls');

  useEffect(() => {
    if (isPaused) {
      document.documentElement.classList.add('animations-paused');
      window.dispatchEvent(new CustomEvent('animations-paused'));
    } else {
      document.documentElement.classList.remove('animations-paused');
      window.dispatchEvent(new CustomEvent('animations-resumed'));
    }
  }, [isPaused]);

  return (
    <div className="fixed bottom-3 left-3 sm:bottom-5 sm:left-5 z-40 pb-[env(safe-area-inset-bottom,0px)] pl-[env(safe-area-inset-left,0px)]">
      <button
        type="button"
        onClick={() => setIsPaused(!isPaused)}
        aria-pressed={isPaused}
        aria-label={isPaused ? t('resumeAnimations') : t('pauseAnimations')}
        title={isPaused ? t('resumeAnimations') : t('pauseAnimations')}
        className="w-11 h-11 rounded-full bg-[#3A0D14]/85 hover:bg-[#3A0D14] text-[#FFF8EC] backdrop-blur-md shadow-lg border border-[#FFF8EC]/20 flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705] cursor-pointer"
      >
        {isPaused ? (
          /* Play icon */
          <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        ) : (
          /* Pause icon */
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        )}
      </button>
    </div>
  );
}
