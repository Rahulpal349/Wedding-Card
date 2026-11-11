'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations, useLocale } from 'next-intl';
import { event } from '../../../content/event';
import JoraMachSVG from '@/components/motifs/JoraMach';
import PhotoHolder from '@/components/ui/PhotoHolder';
import { useReducedMotion } from '@/hooks/useReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TheCouple() {
  const sectionRef = useRef<HTMLElement>(null);
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
          { opacity: 0, y: 25, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.15,
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
      className="relative min-h-0 py-8 sm:py-12 px-4 flex flex-col items-center bg-[#FFF8EC] text-[#3A0D14] overflow-hidden"
      style={{
        backgroundImage:
          'radial-gradient(circle at 50% 30%, rgba(246,233,210,0.6) 0%, rgba(255,248,236,1) 100%)',
      }}
    >
      <div className="w-full max-w-[420px] mx-auto flex flex-col items-center">
        {/* Section Heading: আমাদের দু'জন / The Couple (Matches Screen 3) */}
        <div className="text-center mb-6">
          <h2 className="font-display-bn text-3xl sm:text-4xl text-[#B3172F] font-bold drop-shadow-sm">
            {locale === 'bn' ? "আমাদের দু'জন" : 'The Couple'}
          </h2>
          <div className="flex items-center justify-center gap-2 mt-1 text-[#B5532E]">
            <span className="text-sm select-none">❧</span>
            <p className="font-display italic text-lg sm:text-xl text-[#6F0E20] font-medium">
              {locale === 'bn' ? 'The Couple' : "আমাদের দু'জন"}
            </p>
            <span className="text-sm select-none">❧</span>
          </div>
        </div>

        {/* Dual Arched Portraits Grid */}
        <div className="w-full grid grid-cols-2 gap-3 sm:gap-5 px-1 sm:px-2 mb-4 max-w-[370px]">
          {/* Left Arch: Bride (Jhilik) */}
          <div ref={leftArchRef} className="flex flex-col items-center text-center">
            <div className="w-full max-w-[145px] sm:max-w-[165px]">
              <PhotoHolder
                src={event.photos.bride}
                alt={`${event.bride.name} - ${event.bride.role}`}
                aspect="aspect-[3/4]"
                shape="arch"
                labelBn={event.bride.nameBn}
                labelEn={event.bride.name}
                hintBn="কনের ছবির স্থান"
                hintEn="Bride's Photo"
                sizes="(max-width: 430px) 45vw, 165px"
              />
            </div>

            {/* Bride Details - Rich Crimson and Maroon Typography */}
            <div className="mt-2.5 sm:mt-3 flex flex-col items-center">
              <h3 className="font-display-bn text-xl sm:text-2xl text-[#B3172F] font-bold leading-tight">
                {event.bride.nameBn}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-[#6F0E20] italic">
                {event.bride.roleBn}
              </p>
              <p className="font-display text-sm sm:text-base text-[#B3172F] font-bold mt-0.5">
                {event.bride.name}
              </p>
              <p className="font-display italic text-xs sm:text-sm text-[#6F0E20] font-medium">
                {event.bride.role}
              </p>
            </div>
          </div>

          {/* Right Arch: Groom (Koushik) */}
          <div ref={rightArchRef} className="flex flex-col items-center text-center">
            <div className="w-full max-w-[145px] sm:max-w-[165px]">
              <PhotoHolder
                src={event.photos.groom}
                alt={`${event.groom.name} - ${event.groom.role}`}
                aspect="aspect-[3/4]"
                shape="arch"
                labelBn={event.groom.nameBn}
                labelEn={event.groom.name}
                hintBn="বরের ছবির স্থান"
                hintEn="Groom's Photo"
                sizes="(max-width: 430px) 45vw, 165px"
              />
            </div>

            {/* Groom Details - Rich Crimson and Maroon Typography */}
            <div className="mt-2.5 sm:mt-3 flex flex-col items-center">
              <h3 className="font-display-bn text-xl sm:text-2xl text-[#B3172F] font-bold leading-tight">
                {event.groom.nameBn}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-[#6F0E20] italic">
                {event.groom.roleBn}
              </p>
              <p className="font-display text-sm sm:text-base text-[#B3172F] font-bold mt-0.5">
                {event.groom.name}
              </p>
              <p className="font-display italic text-xs sm:text-sm text-[#6F0E20] font-medium">
                {event.groom.role}
              </p>
            </div>
          </div>
        </div>

        {/* Center Heart Emblem (Matches Screen 3) */}
        <div className="flex items-center justify-center my-1 text-[#B3172F]">
          <span className="text-xl select-none" aria-hidden="true">
            ♡
          </span>
        </div>

        {/* Jora Mach (Twin Fish) Sacred Folk Motif (Matches Screen 3) */}
        <div className="w-28 h-[72px] text-[#B3172F] my-2 drop-shadow-sm">
          <JoraMachSVG />
        </div>
      </div>

      {/* Bottom Scalloped Folk Border */}
      <div className="w-full max-w-[420px] mt-4 sm:mt-6 pt-3 border-t border-[#B3172F]/20 flex justify-center opacity-80">
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
