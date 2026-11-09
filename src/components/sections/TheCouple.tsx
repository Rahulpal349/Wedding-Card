'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations, useLocale } from 'next-intl';
import { event } from '../../../content/event';
import JoraMachSVG from '@/components/motifs/JoraMach';
import { useReducedMotion } from '@/hooks/useReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TheCouple() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftArchRef = useRef<HTMLDivElement>(null);
  const rightArchRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('theCouple');
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (leftArchRef.current && rightArchRef.current) {
        gsap.fromTo(
          [leftArchRef.current, rightArchRef.current],
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
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
      id="couple"
      ref={sectionRef}
      className="relative min-h-screen py-16 px-4 flex flex-col justify-between items-center bg-[#FFF8EC] text-[#3A0D14] overflow-hidden"
      style={{
        backgroundImage:
          'radial-gradient(circle at 50% 30%, rgba(246,233,210,0.6) 0%, rgba(255,248,236,1) 100%)',
      }}
    >
      <div className="w-full max-w-[430px] mx-auto flex flex-col items-center">
        {/* Section Heading: আমাদের দু'জন / The Couple */}
        <div className="text-center mb-8">
          <h2 className="font-display-bn text-3xl sm:text-4xl text-[#B3172F] font-bold drop-shadow-sm">
            {locale === 'bn' ? 'আমাদের দু’জন' : 'The Couple'}
          </h2>
          <div className="flex items-center justify-center gap-2 mt-1 text-[#B5532E]">
            <span className="text-sm select-none">❧</span>
            <p className="font-display italic text-lg sm:text-xl text-[#6F0E20]/90">
              {locale === 'bn' ? 'The Couple' : "আমাদের দু'জন"}
            </p>
            <span className="text-sm select-none">❧</span>
          </div>
        </div>

        {/* Dual Arched Portraits Grid */}
        <div className="w-full grid grid-cols-2 gap-3 sm:gap-6 px-1 sm:px-2 mb-6 max-w-[380px]">
          {/* Left Arch: Bride (Jhilik) */}
          <div ref={leftArchRef} className="flex flex-col items-center text-center">
            <div className="relative w-full aspect-[3/4] max-w-[150px] sm:max-w-[170px] rounded-t-full rounded-b-2xl overflow-hidden border-3 sm:border-4 border-[#B3172F] shadow-xl bg-[#F6E9D2]">
              <Image
                src="/images/bride-portrait.webp"
                alt="Jhilik - The Bride"
                fill
                sizes="(max-width: 430px) 45vw, 170px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-[#B3172F]/30 rounded-t-full rounded-b-2xl pointer-events-none" />
            </div>

            {/* Bride Details */}
            <div className="mt-2.5 sm:mt-3">
              <h3 className="font-display-bn text-xl sm:text-2xl text-[#B3172F] font-bold">
                {event.bride.nameBn}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-[#6F0E20]">
                {event.bride.roleBn}
              </p>
              <p className="font-display italic text-sm sm:text-base text-[#3A0D14]/80 mt-0.5">
                {event.bride.name}
              </p>
              <p className="font-display italic text-[11px] sm:text-xs text-[#3A0D14]/60">
                {event.bride.role}
              </p>
            </div>
          </div>

          {/* Right Arch: Groom (Koushik) */}
          <div ref={rightArchRef} className="flex flex-col items-center text-center">
            <div className="relative w-full aspect-[3/4] max-w-[150px] sm:max-w-[170px] rounded-t-full rounded-b-2xl overflow-hidden border-3 sm:border-4 border-[#B3172F] shadow-xl bg-[#F6E9D2]">
              <Image
                src="/images/groom-portrait.webp"
                alt="Koushik - The Groom"
                fill
                sizes="(max-width: 430px) 45vw, 170px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-[#B3172F]/30 rounded-t-full rounded-b-2xl pointer-events-none" />
            </div>

            {/* Groom Details */}
            <div className="mt-2.5 sm:mt-3">
              <h3 className="font-display-bn text-xl sm:text-2xl text-[#B3172F] font-bold">
                {event.groom.nameBn}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-[#6F0E20]">
                {event.groom.roleBn}
              </p>
              <p className="font-display italic text-sm sm:text-base text-[#3A0D14]/80 mt-0.5">
                {event.groom.name}
              </p>
              <p className="font-display italic text-[11px] sm:text-xs text-[#3A0D14]/60">
                {event.groom.role}
              </p>
            </div>
          </div>
        </div>

        {/* Center Heart Emblem */}
        <div className="flex items-center justify-center my-2 text-[#B3172F]">
          <span className="text-xl" aria-hidden="true">
            ♡
          </span>
        </div>

        {/* Quote / Subtext */}
        <p className="text-center text-sm sm:text-base text-[#3A0D14]/85 px-6 italic max-w-sm font-serif">
          {locale === 'bn' ? event.theCouple.quoteBn : event.theCouple.quoteEn}
        </p>

        {/* Jora Mach (Twin Fish) Sacred Folk Motif */}
        <div className="w-28 h-20 text-[#B3172F] mt-4 mb-2 drop-shadow-sm">
          <JoraMachSVG />
        </div>
      </div>

      {/* Bottom Scalloped Folk Border */}
      <div className="w-full max-w-[430px] pt-4 border-t border-[#B3172F]/20 flex justify-center opacity-80">
        <svg className="w-full h-4 text-[#B3172F]" viewBox="0 0 320 16" fill="currentColor">
          <pattern id="couple-scallop-border" width="20" height="16" patternUnits="userSpaceOnUse">
            <path d="M 0 0 C 5 0, 5 8, 10 8 C 15 8, 15 0, 20 0" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="10" cy="11" r="1.5" />
          </pattern>
          <rect width="320" height="16" fill="url(#couple-scallop-border)" />
        </svg>
      </div>
    </section>
  );
}

