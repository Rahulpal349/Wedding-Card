'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations, useLocale } from 'next-intl';
import { event } from '../../../content/event';
import { useReducedMotion } from '@/hooks/useReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Nimontron() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const kalashRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('nimontron');
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 85%',
              once: true,
            },
          },
        );
      }

      if (kalashRef.current) {
        gsap.fromTo(
          kalashRef.current,
          { scale: 0.92, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: kalashRef.current,
              start: 'top 85%',
              once: true,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="blessings"
      ref={sectionRef}
      className="relative min-h-0 py-8 sm:py-14 px-4 flex flex-col items-center bg-[#FFF8EC] text-[#3A0D14] overflow-hidden"
      style={{
        backgroundImage:
          'radial-gradient(circle at 50% 30%, rgba(246,233,210,0.6) 0%, rgba(255,248,236,1) 100%)',
      }}
    >
      <div className="w-full max-w-[430px] mx-auto flex flex-col items-center">
        {/* Top Bishnupur Terracotta Temple Relief Arch & Bankura Horses */}
        <div className="relative w-full aspect-[16/7] max-w-[390px] rounded-2xl overflow-hidden shadow-lg border-2 border-[#B5532E]/30 mb-8 bg-[#B5532E]/10">
          <Image
            src="/images/terracotta-arch-horses.webp"
            alt="Bankura terracotta horses and Bishnupur terracotta temple relief arch"
            fill
            sizes="(max-width: 430px) 100vw, 390px"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-[#B5532E]/30 rounded-2xl pointer-events-none" />
        </div>

        {/* Text Block (Screen 5) */}
        <div ref={textRef} className="text-center px-4 mb-6">
          <h2 className="font-display-bn text-2xl sm:text-3xl text-[#3A0D14] font-medium leading-relaxed mb-3">
            {event.nimontron.textBn}
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-[#6F0E20]/90 leading-relaxed max-w-sm mx-auto">
            &ldquo;{event.nimontron.textEn}&rdquo;
          </p>

          <div className="flex items-center justify-center gap-3 my-4 text-[#B5532E]">
            <span className="w-8 h-[1px] bg-[#B5532E]/30" />
            <span className="text-sm">✤</span>
            <span className="w-8 h-[1px] bg-[#B5532E]/30" />
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xs font-semibold text-[#B5532E] uppercase tracking-wider mb-1 font-serif">
              {locale === 'bn' ? '— নিমন্ত্রণে —' : '— Cordially Invited By —'}
            </span>
            <p className="font-display-bn text-xl sm:text-2xl text-[#B3172F] font-bold leading-tight">
              {event.nimontron.fromBn}
            </p>
            <p className="font-display italic text-sm sm:text-base text-[#6F0E20] font-medium mt-0.5">
              {event.nimontron.fromEn}
            </p>
          </div>
        </div>

        {/* Mangal Kalash with Mango Leaves, Coconut, and Jasmine Flowers */}
        <div
          ref={kalashRef}
          className="relative w-full max-w-[280px] aspect-[1/1] rounded-3xl overflow-hidden shadow-xl border border-[#B3172F]/15 bg-[#FFF8EC] my-2"
        >
          <Image
            src="/images/mangal-kalash-flowers.webp"
            alt="Sacred Mangal Kalash with coconut, fresh mango leaves, and white jasmine flowers"
            fill
            sizes="(max-width: 430px) 100vw, 280px"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Bottom Scalloped Terracotta Border */}
      <div className="w-full max-w-[430px] mt-4 sm:mt-6 pt-3 border-t border-[#B5532E]/20 flex justify-center opacity-80">
        <svg className="w-full h-4 text-[#B5532E]" viewBox="0 0 320 16" fill="currentColor">
          <pattern id="nimontron-terracotta-scallop" width="20" height="16" patternUnits="userSpaceOnUse">
            <path d="M 0 0 C 5 0, 5 8, 10 8 C 15 8, 15 0, 20 0" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="10" cy="11" r="1.5" />
          </pattern>
          <rect width="320" height="16" fill="url(#nimontron-terracotta-scallop)" />
        </svg>
      </div>
    </section>
  );
}
