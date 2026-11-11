'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { event } from '../../../content/event';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { playAuspiciousChime } from '@/lib/audio';

export default function Gate() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations('gate');
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();

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

  const handleOpen = useCallback(() => {
    if (isOpen) return;
    setIsOpen(true);

    if (containerRef.current) {
      containerRef.current.style.pointerEvents = 'none';
    }

    if (soundOn) {
      playAuspiciousChime();
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
  }, [isOpen, prefersReducedMotion, soundOn]);

  if (isHidden) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center"
      aria-label={t('title')}
    >
      {/* Split Doors Background */}
      <div
        ref={leftDoorRef}
        className="absolute inset-y-0 left-0 w-1/2 bg-[#5A0A19] overflow-hidden"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 100% 50%, rgba(179,23,47,0.35) 0%, rgba(58,13,20,0.95) 100%)',
        }}
      />
      <div
        ref={rightDoorRef}
        className="absolute inset-y-0 right-0 w-1/2 bg-[#5A0A19] overflow-hidden"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 0% 50%, rgba(179,23,47,0.35) 0%, rgba(58,13,20,0.95) 100%)',
        }}
      />

      {/* Main Gate Card Container (matches Screen 1) */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-[430px] h-full max-h-[920px] mx-auto flex flex-col justify-between items-center px-6 py-8 text-center text-[#FFF8EC]"
      >
        {/* Top Ornate Arch & Folk Bird Crest */}
        <div className="w-full flex flex-col items-center pt-2">
          {/* Folk Bird Crest (Alpona linework) */}
          <svg
            className="w-20 h-16 text-[#FFF8EC]/90 drop-shadow-md mb-2"
            viewBox="0 0 100 80"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {/* Folk Bird Head & Beak */}
            <path d="M 45 35 C 45 28, 52 22, 60 22 C 68 22, 73 28, 70 36 C 67 44, 58 48, 50 48 Z" />
            <circle cx="62" cy="28" r="2" fill="currentColor" />
            <path d="M 72 30 L 82 32 L 72 36" />
            {/* Crown Feathers */}
            <path d="M 58 22 C 55 14, 52 10, 50 8" />
            <circle cx="50" cy="8" r="1.5" fill="currentColor" />
            <path d="M 62 21 C 63 13, 65 8, 65 6" />
            <circle cx="65" cy="6" r="1.5" fill="currentColor" />
            <path d="M 66 23 C 71 16, 75 12, 78 11" />
            <circle cx="78" cy="11" r="1.5" fill="currentColor" />
            {/* Wing Feathers */}
            <path d="M 48 38 C 38 25, 20 18, 10 22 C 16 32, 28 42, 45 46" />
            <path d="M 43 42 C 34 33, 20 28, 14 32 C 20 40, 30 46, 42 47" />
            {/* Tail */}
            <path d="M 48 48 C 38 58, 26 65, 16 68 C 24 64, 34 58, 44 52" />
            <path d="M 46 52 C 36 64, 25 72, 14 76 C 24 70, 36 62, 44 56" />
          </svg>

          {/* Heading: শুভ বিবাহ */}
          <h1 className="font-display-bn text-4xl sm:text-5xl text-[#FFF8EC] tracking-wide drop-shadow-md">
            শুভ বিবাহ
          </h1>

          {/* English Subtitle */}
          <p className="font-display italic text-lg sm:text-xl text-[#FFF8EC]/90 mt-1">
            The Wedding of
          </p>

          {/* Names */}
          <h2 className="font-display-bn text-3xl sm:text-4xl text-[#FFF8EC] font-bold mt-2 tracking-wide drop-shadow-md">
            {event.bride.nameBn} &amp; {event.groom.nameBn}
          </h2>
          <p className="font-display italic text-lg sm:text-xl text-[#FFF8EC]/90 mt-0.5">
            {event.bride.name} &amp; {event.groom.name}
          </p>

          {/* Ornate Flourish Divider */}
          <div className="flex items-center justify-center gap-3 my-3 text-[#FFF8EC]/70" aria-hidden="true">
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

        {/* Interactive Action Controls (Open Invitation + Sound) */}
        <div className="w-full flex flex-col items-center gap-3 pt-2">
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
            onClick={() => setSoundOn(!soundOn)}
            aria-pressed={soundOn}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3A0D14]/60 hover:bg-[#3A0D14]/90 text-[#FFF8EC]/90 text-xs sm:text-sm font-medium border border-[#FFF8EC]/15 transition-all min-h-[44px]"
          >
            {soundOn ? (
              <>
                <svg className="w-4 h-4 text-[#F2B705]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
                <span>শব্দ চালু (Sound On)</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 text-[#FFF8EC]/60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
                <span>শব্দ বন্ধ (Sound Off)</span>
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
