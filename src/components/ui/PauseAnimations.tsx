'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface PauseAnimationsProps {
  className?: string;
  showLabel?: boolean;
}

export default function PauseAnimations({
  className = '',
  showLabel = false,
}: PauseAnimationsProps) {
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
    <button
      type="button"
      onClick={() => setIsPaused(!isPaused)}
      aria-pressed={isPaused}
      aria-label={isPaused ? t('resumeAnimations') : t('pauseAnimations')}
      title={isPaused ? t('resumeAnimations') : t('pauseAnimations')}
      className={
        className ||
        'liquid-glass inline-flex items-center justify-center gap-1.5 p-2.5 rounded-full text-[#6F0E20] font-semibold text-xs transition-all duration-200 min-h-[44px] min-w-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705] cursor-pointer'
      }
    >
      {isPaused ? (
        /* Play / Resume Icon */
        <>
          <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          {showLabel && <span>{t('resumeAnimations')}</span>}
        </>
      ) : (
        /* Pause Icon */
        <>
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
          {showLabel && <span>{t('pauseAnimations')}</span>}
        </>
      )}
    </button>
  );
}
