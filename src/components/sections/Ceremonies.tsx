'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations, useLocale } from 'next-intl';
import { event, Ceremony } from '../../../content/event';
import CalendarLinks from '@/components/ui/CalendarLinks';
import { useReducedMotion } from '@/hooks/useReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function CeremonyIcon({ type }: { type?: string }) {
  if (type === 'haldi') {
    return (
      <svg className="w-10 h-10 text-[#F2B705]" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        {/* Brass Bowl */}
        <path d="M 6 22 C 6 32, 34 32, 34 22 Z" fill="#D99B00" stroke="#8C6300" strokeWidth="1.5" />
        <ellipse cx="20" cy="22" rx="14" ry="4" fill="#F2B705" stroke="#8C6300" strokeWidth="1.5" />
        {/* Haldi Mound */}
        <path d="M 12 22 Q 20 14, 28 22 Z" fill="#FFC72C" />
        {/* Green Mango Leaves */}
        <path d="M 10 18 Q 4 10, 8 4 Q 14 10, 14 18 Z" fill="#2F5D3A" stroke="#1E3E26" strokeWidth="1" />
        <path d="M 28 18 Q 36 10, 32 4 Q 26 10, 26 18 Z" fill="#2F5D3A" stroke="#1E3E26" strokeWidth="1" />
      </svg>
    );
  }

  if (type === 'topor') {
    return (
      <svg className="w-10 h-10 text-[#FFF8EC]" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        {/* Sholapith Topor (Conical Groom Headgear) */}
        <path d="M 20 4 L 32 32 L 8 32 Z" fill="#FFF8EC" stroke="#B3172F" strokeWidth="1.5" />
        {/* Decorative Bands */}
        <line x1="10" y1="28" x2="30" y2="28" stroke="#B3172F" strokeWidth="1.2" />
        <line x1="12" y1="24" x2="28" y2="24" stroke="#F2B705" strokeWidth="1.2" />
        <line x1="15" y1="18" x2="25" y2="18" stroke="#B3172F" strokeWidth="1.2" />
        {/* Top finial / feather */}
        <circle cx="20" cy="4" r="2" fill="#F2B705" />
        <path d="M 20 2 Q 18 -2, 20 -4 Q 22 -2, 20 2" fill="#B3172F" />
        {/* Side hanging tassels */}
        <path d="M 8 32 Q 5 36, 6 40" stroke="#F2B705" strokeWidth="1.5" />
        <path d="M 32 32 Q 35 36, 34 40" stroke="#F2B705" strokeWidth="1.5" />
      </svg>
    );
  }

  // Boubhat / Reception Bells & Conch
  return (
    <svg className="w-10 h-10 text-[#F2B705]" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      {/* Wedding Bells */}
      <g transform="translate(10, 6)">
        <path d="M 2 8 C 2 2, 14 2, 14 8 L 16 18 L 0 18 Z" fill="#F2B705" stroke="#B5532E" strokeWidth="1.5" />
        <ellipse cx="8" cy="18" rx="8" ry="3" fill="#D99B00" stroke="#B5532E" strokeWidth="1.5" />
        <circle cx="8" cy="21" r="2" fill="#B5532E" />
      </g>
      <g transform="translate(18, 12)">
        <path d="M 2 8 C 2 2, 14 2, 14 8 L 16 18 L 0 18 Z" fill="#FFE082" stroke="#B5532E" strokeWidth="1.5" />
        <ellipse cx="8" cy="18" rx="8" ry="3" fill="#F2B705" stroke="#B5532E" strokeWidth="1.5" />
        <circle cx="8" cy="21" r="2" fill="#B5532E" />
      </g>
    </svg>
  );
}

export default function Ceremonies() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const t = useTranslations('ceremonies');
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const validItems = itemsRef.current.filter(Boolean);
      if (validItems.length > 0) {
        gsap.fromTo(
          validItems,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
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
      id="events"
      ref={sectionRef}
      className="relative min-h-screen py-16 px-4 flex flex-col justify-between items-center bg-[#FFF8EC] text-[#3A0D14] overflow-hidden"
      style={{
        backgroundImage:
          'radial-gradient(circle at 50% 30%, rgba(246,233,210,0.6) 0%, rgba(255,248,236,1) 100%)',
      }}
    >
      <div className="w-full max-w-[430px] mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <div className="text-center mb-8">
          <h2 className="font-display-bn text-3xl sm:text-4xl text-[#B3172F] font-bold drop-shadow-sm">
            {locale === 'bn' ? 'অনুষ্ঠানের পর্বসমূহ' : 'Wedding Events'}
          </h2>
          <div className="flex items-center justify-center gap-2 mt-1 text-[#B5532E]">
            <span className="text-sm select-none">❧</span>
            <p className="font-display italic text-lg sm:text-xl text-[#6F0E20]/90">
              {locale === 'bn' ? 'Wedding Events' : 'অনুষ্ঠানের সূচি'}
            </p>
            <span className="text-sm select-none">❧</span>
          </div>
        </div>

        {/* Vertical Timeline with Continuous Rail Line */}
        <div className="relative w-full pl-3 pr-1 sm:pl-6 sm:pr-2">
          {/* Vertical Continuous Red Line */}
          <div className="absolute left-[31px] sm:left-[38px] top-6 bottom-6 w-[2px] bg-[#B3172F]/40" />

          {/* Ceremony Events */}
          <div className="flex flex-col gap-6 sm:gap-8">
            {event.ceremonies.map((ceremony, idx) => {
              const name = locale === 'bn' ? ceremony.nameBn : ceremony.nameEn;
              const dayName = locale === 'bn' ? ceremony.dayNameBn : ceremony.dayNameEn;
              const timeText = locale === 'bn' ? ceremony.timeTextBn : ceremony.timeTextEn;

              return (
                <div
                  key={ceremony.id}
                  ref={(el) => {
                    itemsRef.current[idx] = el;
                  }}
                  className="relative flex items-start gap-3 sm:gap-4"
                >
                  {/* Timeline Node Icon */}
                  <div className="relative z-10 flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#FFF8EC] border-2 border-[#B3172F] shadow-md flex items-center justify-center p-1.5 sm:p-2">
                    <CeremonyIcon type={ceremony.iconType} />
                  </div>

                  {/* Event Details Card */}
                  <div className="flex-1 bg-[#F6E9D2]/70 rounded-2xl p-3.5 sm:p-4 border border-[#B3172F]/15 shadow-sm">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-display-bn text-2xl text-[#B3172F] font-bold">
                        {name}
                      </h3>
                      <span className="font-display italic text-xs text-[#6F0E20] font-medium">
                        {ceremony.nameEn}
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-[#3A0D14] mt-1">
                      {dayName}
                    </p>
                    <p className="text-xs text-[#3A0D14]/75 mt-0.5">
                      {timeText}
                    </p>

                    {ceremony.dressCode && (
                      <p className="text-xs text-[#6F0E20] italic mt-1.5">
                        <span className="font-semibold not-italic">
                          {t('dressCode')}:
                        </span>{' '}
                        {locale === 'bn' ? ceremony.dressCodeBn : ceremony.dressCode}
                      </p>
                    )}

                    {/* Calendar Links Button (.ics & Google Calendar) & Map Link */}
                    <div className="mt-3 pt-2.5 border-t border-[#B3172F]/15 flex flex-wrap items-center justify-between gap-2">
                      <CalendarLinks
                        title={locale === 'bn' ? ceremony.fullNameBn : ceremony.fullNameEn}
                        start={ceremony.date}
                        end={ceremony.endDate}
                        location={locale === 'bn' ? `${ceremony.venueBn}, ${ceremony.addressBn}` : `${ceremony.venue}, ${ceremony.address}`}
                        description={locale === 'bn' ? ceremony.descBn : ceremony.descEn}
                      />

                      <a
                        href={ceremony.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#B3172F] hover:bg-[#FFF8EC] border border-[#B3172F]/20 transition-colors min-h-[44px]"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>{t('openMap')}</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Scalloped Folk Border */}
      <div className="w-full max-w-[430px] pt-8 border-t border-[#B3172F]/20 flex justify-center opacity-80 mt-6">
        <svg className="w-full h-4 text-[#B3172F]" viewBox="0 0 320 16" fill="currentColor">
          <pattern id="ceremonies-scallop-border" width="20" height="16" patternUnits="userSpaceOnUse">
            <path d="M 0 0 C 5 0, 5 8, 10 8 C 15 8, 15 0, 20 0" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="10" cy="11" r="1.5" />
          </pattern>
          <rect width="320" height="16" fill="url(#ceremonies-scallop-border)" />
        </svg>
      </div>
    </section>
  );
}
