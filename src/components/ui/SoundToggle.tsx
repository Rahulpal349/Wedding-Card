'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import {
  toggleWeddingMusic,
  isWeddingMusicActive,
} from '@/lib/audio';
import { event } from '../../../content/event';

export default function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const t = useTranslations('controls');
  const locale = useLocale();

  const songTitle =
    locale === 'bn'
      ? event.music?.titleBn || 'হিন্দি বিয়ের গান'
      : event.music?.titleEn || 'Hindi Wedding Song';

  useEffect(() => {
    setIsPlaying(isWeddingMusicActive());

    const handleMusicChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ playing: boolean }>;
      if (customEvent.detail?.playing !== undefined) {
        setIsPlaying(customEvent.detail.playing);
      }
    };

    window.addEventListener('wedding-music-changed', handleMusicChange);
    return () => window.removeEventListener('wedding-music-changed', handleMusicChange);
  }, []);

  const handleToggle = () => {
    const nextState = toggleWeddingMusic();
    setIsPlaying(nextState);
    try {
      localStorage.setItem('wedding-sound-enabled', String(nextState));
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-pressed={isPlaying}
      aria-label={isPlaying ? `${t('soundOff')} (${songTitle})` : `${t('soundOn')} (${songTitle})`}
      title={`${songTitle} • ${isPlaying ? t('soundOff') : t('soundOn')}`}
      className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full backdrop-blur-md font-semibold text-xs sm:text-sm border transition-all duration-200 min-h-[44px] min-w-[44px] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705] ${
        isPlaying
          ? 'bg-[#FFF8EC] text-[#B3172F] border-[#B3172F]/40 shadow-md hover:bg-[#F6E9D2]'
          : 'bg-[#FFF8EC]/90 text-[#3A0D14]/75 border-[#B5532E]/30 shadow-xs hover:bg-[#F6E9D2]'
      }`}
    >
      {isPlaying ? (
        <>
          {/* Animated Equalizer Wave Bars */}
          <span className="flex items-end gap-[2px] h-3.5" aria-hidden="true">
            <span
              className="w-[2.5px] bg-[#B3172F] rounded-full"
              style={{
                animation: 'musicBar 0.9s ease-in-out infinite',
                height: '8px',
              }}
            />
            <span
              className="w-[2.5px] bg-[#F2B705] rounded-full"
              style={{
                animation: 'musicBar 1.2s ease-in-out infinite 0.2s',
                height: '14px',
              }}
            />
            <span
              className="w-[2.5px] bg-[#B3172F] rounded-full"
              style={{
                animation: 'musicBar 0.8s ease-in-out infinite 0.4s',
                height: '10px',
              }}
            />
          </span>

          {/* Speaker With Sound Wave */}
          <svg
            className="w-4 h-4 text-[#B3172F]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
          <span className="hidden sm:inline font-medium text-[#6F0E20]">{t('soundOn')}</span>
        </>
      ) : (
        <>
          {/* Muted Speaker Icon */}
          <svg
            className="w-4 h-4 text-[#3A0D14]/70"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
          <span className="hidden sm:inline text-[#3A0D14]/70">{t('soundOff')}</span>
        </>
      )}
    </button>
  );
}
