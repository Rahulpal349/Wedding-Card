'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { event } from '../../../content/event';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { playAuspiciousChime, playWeddingMusic, pauseWeddingMusic } from '@/lib/audio';

export default function Gate() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const autoTimerRef = useRef<NodeJS.Timeout | null>(null);
  const openCalledRef = useRef(false);

  const t = useTranslations('gate');
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();

  // Restore open state if gate was already opened in this session, check sound pref
  useEffect(() => {
    try {
      if (sessionStorage.getItem('wedding-gate-opened') === 'true') {
        setIsOpen(true);
        setIsHidden(true);
      }
      const savedSound = localStorage.getItem('wedding-sound-enabled');
      if (savedSound === 'false') {
        setSoundOn(false);
      } else {
        setSoundOn(true);
      }
    } catch {}
  }, []);

  // Entrance animations for Gate content
  useEffect(() => {
    if (isOpen || isHidden) return;

    if (prefersReducedMotion) {
      if (contentRef.current) contentRef.current.style.opacity = '1';
      if (buttonRef.current) buttonRef.current.style.opacity = '1';
      return;
    }

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' },
      );
    }

    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, delay: 0.4, ease: 'power2.out' },
      );
    }
  }, [isOpen, isHidden, prefersReducedMotion]);

  // Main Open Gate Handler
  const handleOpen = useCallback(() => {
    if (openCalledRef.current || isOpen) return;
    openCalledRef.current = true;

    if (autoTimerRef.current) {
      clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
    }

    setIsOpen(true);
    try {
      sessionStorage.setItem('wedding-gate-opened', 'true');
    } catch {}

    if (containerRef.current) {
      containerRef.current.style.pointerEvents = 'none';
    }

    if (soundOn) {
      playAuspiciousChime();
      playWeddingMusic();
    }

    const left = leftDoorRef.current;
    const right = rightDoorRef.current;

    if (prefersReducedMotion) {
      gsap.to([left, right, contentRef.current], {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => setIsHidden(true),
      });
      return;
    }

    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        scale: 0.96,
        duration: 0.6,
        ease: 'power2.in',
      });
    }

    gsap.to(left, {
      x: '-100%',
      duration: 1.3,
      ease: 'power3.inOut',
    });
    gsap.to(right, {
      x: '100%',
      duration: 1.3,
      ease: 'power3.inOut',
      onComplete: () => setIsHidden(true),
    });
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 1.3,
        ease: 'power2.inOut',
      });
    }

    // Fallback timer to guarantee unmounting even if tab is throttled or animation frame paused
    setTimeout(() => {
      setIsHidden(true);
    }, 1400);
  }, [isOpen, prefersReducedMotion, soundOn]);

  // 8-Second Auto-Open Timer fallback if user does not click
  useEffect(() => {
    if (isOpen || isHidden || openCalledRef.current) return;

    autoTimerRef.current = setTimeout(() => {
      handleOpen();
    }, 8000);

    return () => {
      if (autoTimerRef.current) {
        clearTimeout(autoTimerRef.current);
        autoTimerRef.current = null;
      }
    };
  }, [isOpen, isHidden, handleOpen]);

  // Fallback: Ensure music starts on the very first touch/click/scroll if browser restricted auto-play
  useEffect(() => {
    if (!soundOn) return;

    const handleFirstGesture = () => {
      if (soundOn) {
        playWeddingMusic();
      }
    };

    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true });
    window.addEventListener('scroll', handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('scroll', handleFirstGesture);
    };
  }, [soundOn]);

  if (isHidden) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-[#6F0E20]"
      role="dialog"
      aria-modal="true"
      aria-label={t('title')}
    >
      {/* Left Door */}
      <div
        ref={leftDoorRef}
        className="absolute top-0 left-0 w-[calc(50%+1px)] h-full bg-[#6F0E20] shadow-2xl"
        style={{
          backgroundImage:
            'radial-gradient(circle at 100% 50%, rgba(179, 23, 47, 0.4) 0%, rgba(111, 14, 32, 1) 70%)',
        }}
      />

      {/* Right Door */}
      <div
        ref={rightDoorRef}
        className="absolute top-0 right-0 w-1/2 h-full bg-[#6F0E20] shadow-2xl"
        style={{
          backgroundImage:
            'radial-gradient(circle at 0% 50%, rgba(179, 23, 47, 0.4) 0%, rgba(111, 14, 32, 1) 70%)',
        }}
      />

      {/* Central Content Card */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-[340px] sm:max-w-md w-full mx-4 px-5 py-6 sm:py-8 flex flex-col items-center text-center select-none"
      >
        {/* Top Bird / Auspicious Bengali Emblem */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 text-[#FFF8EC] mb-2 drop-shadow-md">
          <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full opacity-90">
            <path d="M50 15 C45 25, 35 30, 25 35 C35 40, 45 45, 50 65 C55 45, 65 40, 75 35 C65 30, 55 25, 50 15 Z" />
            <circle cx="50" cy="18" r="4" fill="#F2B705" />
            <circle cx="44" cy="12" r="2.5" fill="#FFF8EC" />
            <circle cx="56" cy="12" r="2.5" fill="#FFF8EC" />
            <path d="M 46 8 Q 50 4 54 8" stroke="#F2B705" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* Shuvo Bibaho Heading */}
        <div className="space-y-1 mb-2">
          <h1 className="font-display-bn text-3xl sm:text-4xl text-[#FFF8EC] font-bold tracking-wide drop-shadow-lg">
            {locale === 'bn' ? 'শুভ বিবাহ' : 'Shubho Bibaha'}
          </h1>
          <p className="font-display text-xs sm:text-sm text-[#F2B705] tracking-widest uppercase font-semibold">
            {locale === 'bn' ? 'The Wedding of' : 'Auspicious Bengali Wedding'}
          </p>
          <h2 className="font-display-bn text-2xl sm:text-3xl text-[#FFF8EC] font-bold mt-1 drop-shadow-md">
            {event.bride.nameBn} <span className="text-[#F2B705] font-serif">&amp;</span> {event.groom.nameBn}
          </h2>
          <p className="font-display text-xs sm:text-sm text-[#FFF8EC]/90 italic font-medium">
            {event.bride.name} &amp; {event.groom.name}
          </p>

          <div className="flex items-center justify-center gap-2 pt-1 text-[#F2B705]/80">
            <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#FFF8EC]/60" />
            <span className="text-sm">✤</span>
            <span className="text-lg">❖</span>
            <span className="text-sm">✤</span>
            <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#FFF8EC]/60" />
          </div>
        </div>

        {/* Ceremonial Still Life Artwork (Diya, Shankha, Shankha-Pola, Jasmine) */}
        <div className="relative w-full max-w-[300px] aspect-[4/3] max-h-[28vh] rounded-2xl overflow-hidden shadow-2xl border border-[#FFF8EC]/20 my-2">
          <Image
            src="/images/gate-pradip-shankha.webp"
            alt="Traditional Bengali wedding offerings: Pradip diya, holy Shankha, and Shankha-Pola bangles"
            fill
            sizes="(max-width: 430px) 90vw, 300px"
            className="object-cover object-bottom"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3A0D14]/80 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Interactive Action Controls (Open Invitation + 8s Auto-Open + Sound) */}
        <div className="w-full flex flex-col items-center gap-2.5 pt-2">
          {/* Main Open Button */}
          <button
            id="open-gate-btn"
            ref={buttonRef}
            onClick={handleOpen}
            className="w-full max-w-[280px] bg-[#FFF8EC] text-[#6F0E20] font-bold text-base sm:text-lg py-3.5 px-6 rounded-full
                       shadow-xl hover:bg-[#F6E9D2] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300
                       min-h-[48px] cursor-pointer border border-[#F2B705]/40 focus:outline-none focus:ring-2 focus:ring-[#F2B705]"
            aria-label={t('openButton')}
          >
            {locale === 'bn' ? 'আমন্ত্রণপত্র উন্মোচন করুন' : 'Open the Invitation'}
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={() => {
              const next = !soundOn;
              setSoundOn(next);
              try {
                localStorage.setItem('wedding-sound-enabled', String(next));
              } catch {}
              if (!next) {
                pauseWeddingMusic();
              } else {
                playWeddingMusic();
              }
            }}
            aria-pressed={soundOn}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3A0D14]/60 hover:bg-[#3A0D14]/90 text-[#FFF8EC]/90 text-xs sm:text-sm font-medium border border-[#FFF8EC]/15 transition-all min-h-[40px] cursor-pointer"
          >
            {soundOn ? (
              <>
                <svg
                  className="w-4 h-4 text-[#F2B705]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
                <span>{locale === 'bn' ? 'গান চালু (Music On)' : 'Music On'}</span>
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4 text-[#FFF8EC]/60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
                <span>{locale === 'bn' ? 'গান বন্ধ (Music Off)' : 'Music Off'}</span>
              </>
            )}
          </button>
        </div>

        {/* Bottom Terracotta / Alpona Border Motif */}
        <div className="w-full mt-2 pt-2 border-t border-[#FFF8EC]/10 flex justify-center opacity-70">
          <svg className="w-full max-w-[280px] h-4 text-[#FFF8EC]" viewBox="0 0 280 16" fill="currentColor">
            <pattern id="gate-border-scallop" width="20" height="16" patternUnits="userSpaceOnUse">
              <path d="M 0 16 C 5 16, 5 8, 10 8 C 15 8, 15 16, 20 16" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="10" cy="5" r="1.5" />
            </pattern>
            <rect width="280" height="16" fill="url(#gate-border-scallop)" />
          </svg>
        </div>
      </div>
    </div>
  );
}
