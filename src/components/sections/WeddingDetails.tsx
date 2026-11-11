'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations, useLocale } from 'next-intl';
import { event } from '../../../content/event';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useLenisContext } from '@/hooks/useLenis';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WeddingDetails() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const t = useTranslations('weddingDetails');
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();
  const lenis = useLenisContext();

  const scrollToVenue = () => {
    if (lenis) {
      lenis.scrollTo('#venue', { duration: 1.2 });
    } else {
      document.getElementById('venue')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTheDay = () => {
    if (lenis) {
      lenis.scrollTo('#the-day', { duration: 1.2 });
    } else {
      document.getElementById('the-day')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const validItems = itemsRef.current.filter(Boolean);
      if (validItems.length > 0) {
        gsap.fromTo(
          validItems,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
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
      id="details"
      ref={sectionRef}
      className="relative min-h-0 py-8 sm:py-14 px-4 flex flex-col items-center bg-[#FFF8EC] text-[#3A0D14] overflow-hidden"
      style={{
        backgroundImage:
          'radial-gradient(circle at 50% 20%, rgba(246,233,210,0.7) 0%, rgba(255,248,236,1) 100%)',
      }}
    >
      <div className="w-full max-w-[430px] mx-auto flex flex-col items-center">
        {/* Top Decorative Terracotta Arch */}
        <div className="w-full flex justify-center mb-4">
          <svg
            className="w-full max-w-[320px] h-8 text-[#B5532E]"
            viewBox="0 0 320 32"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M 10 28 C 80 5, 240 5, 310 28"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 3"
            />
            <path
              d="M 20 28 C 90 10, 230 10, 300 28"
              stroke="#B3172F"
              strokeWidth="1.5"
            />
            <circle cx="160" cy="8" r="4" fill="#B3172F" />
            <circle cx="140" cy="11" r="2.5" fill="#B5532E" />
            <circle cx="180" cy="11" r="2.5" fill="#B5532E" />
          </svg>
        </div>

        {/* Section Heading */}
        <div className="text-center mb-6">
          <h2 className="font-display-bn text-3xl sm:text-4xl text-[#B3172F] font-bold drop-shadow-sm">
            {locale === 'bn' ? 'বিবাহের শুভদিন' : 'Wedding Details'}
          </h2>
          <div className="flex items-center justify-center gap-2 mt-1 text-[#B5532E]">
            <span className="text-sm select-none">❧</span>
            <p className="font-display italic text-lg sm:text-xl text-[#6F0E20]/90">
              {locale === 'bn' ? 'Wedding Details' : 'বিবাহের শুভদিন'}
            </p>
            <span className="text-sm select-none">❧</span>
          </div>
        </div>

        {/* 3 Detail Info Cards */}
        <div className="w-full flex flex-col gap-6 px-4">
          {/* 1. Wedding Date Card */}
          <div
            ref={(el) => {
              itemsRef.current[0] = el;
            }}
            className="flex items-center gap-5 p-4 rounded-2xl bg-[#F6E9D2]/70 border border-[#B3172F]/15 shadow-sm"
          >
            {/* Calendar Icon */}
            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#B3172F]/10 border border-[#B3172F]/30 flex items-center justify-center text-[#B3172F]">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <circle cx="8" cy="15" r="1" fill="currentColor" />
                <circle cx="12" cy="15" r="1" fill="currentColor" />
                <circle cx="16" cy="15" r="1" fill="currentColor" />
              </svg>
            </div>
            {/* Text */}
            <div className="flex-1">
              <h3 className="font-display-bn text-xl text-[#B3172F] font-bold">
                {locale === 'bn' ? 'বিবাহের দিন' : 'Wedding Date'}
              </h3>
              <p className="text-base font-semibold text-[#3A0D14] mt-0.5">
                {locale === 'bn' ? 'বুধবার, ২৫ নভেম্বর ২০২৬' : 'Wednesday, 25 November 2026'}
              </p>
              <p className="text-xs text-[#3A0D14]/70 italic font-serif">
                {locale === 'bn' ? 'Wedding: Wednesday, 25 November 2026' : 'বুধবার, ২৫ নভেম্বর ২০২৬'}
              </p>
            </div>
          </div>

          {/* 2. Wedding Ceremony / Homa Fire Card (Clickable to The Day Itinerary) */}
          <div
            ref={(el) => {
              itemsRef.current[1] = el;
            }}
            onClick={scrollToTheDay}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollToTheDay();
              }
            }}
            aria-label={`${locale === 'bn' ? 'মাঙ্গলিক সূচি দেখুন' : 'View Ceremony Itinerary'}`}
            className="group flex items-center gap-5 p-4 rounded-2xl bg-[#F6E9D2]/70 hover:bg-[#F6E9D2] active:scale-[0.99] border border-[#B3172F]/15 hover:border-[#B3172F]/35 shadow-sm transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B3172F]"
          >
            {/* Yajna / Mandap Icon */}
            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#B3172F]/10 group-hover:bg-[#B3172F]/20 border border-[#B3172F]/30 flex items-center justify-center text-[#B3172F] transition-colors">
              <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {/* Mandap Base */}
                <path d="M 4 26 L 28 26 L 24 21 L 8 21 Z" fill="currentColor" fillOpacity="0.15" />
                {/* Sacred Flames */}
                <path d="M 16 7 C 13 12, 11 15, 13 18 C 14 20, 18 20, 19 18 C 21 15, 19 12, 16 7 Z" fill="#F2B705" stroke="#B3172F" />
                <path d="M 16 11 C 15 13, 14 15, 15 17 C 15.5 18, 17 18, 17.5 17 C 18 15, 17 13, 16 11 Z" fill="#B3172F" />
              </svg>
            </div>
            {/* Text */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-display-bn text-xl text-[#B3172F] font-bold group-hover:underline">
                  {locale === 'bn' ? 'বিবাহ অনুষ্ঠান' : 'Wedding Ceremony'}
                </h3>
                <span className="text-xs text-[#B3172F] font-semibold opacity-75 group-hover:opacity-100 transition-opacity">
                  {locale === 'bn' ? 'সূচি ↓' : 'Schedule ↓'}
                </span>
              </div>
              <p className="text-base font-semibold text-[#3A0D14] mt-0.5">
                {locale === 'bn' ? event.ceremonyTimeBn : event.ceremonyTime}
              </p>
              <p className="text-xs text-[#3A0D14]/70 italic font-serif">
                {locale === 'bn' ? `Wedding Ceremony / ${event.ceremonyTime}` : `বিবাহ অনুষ্ঠান: ${event.ceremonyTimeBn}`}
              </p>
            </div>
          </div>

          {/* 3. Venue Location Card (Clickable to Venue Section) */}
          <div
            ref={(el) => {
              itemsRef.current[2] = el;
            }}
            onClick={scrollToVenue}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollToVenue();
              }
            }}
            aria-label={`${locale === 'bn' ? 'অনুষ্ঠান স্থল বিবরণ দেখুন' : 'View Venue Details'}: ${event.venue.name}`}
            className="group flex items-center gap-5 p-4 rounded-2xl bg-[#F6E9D2]/70 hover:bg-[#F6E9D2] active:scale-[0.99] border border-[#B3172F]/15 hover:border-[#B3172F]/35 shadow-sm transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B3172F]"
          >
            {/* Map Pin Icon */}
            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#B3172F]/10 group-hover:bg-[#B3172F]/20 border border-[#B3172F]/30 flex items-center justify-center text-[#B3172F] transition-colors">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            {/* Text */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-display-bn text-xl text-[#B3172F] font-bold group-hover:underline">
                  {locale === 'bn' ? 'অনুষ্ঠান স্থল' : 'Wedding Venue'}
                </h3>
                <span className="text-xs text-[#B3172F] font-semibold opacity-75 group-hover:opacity-100 transition-opacity">
                  {locale === 'bn' ? 'বিবরণ ↓' : 'Details ↓'}
                </span>
              </div>
              <p className="text-base font-semibold text-[#3A0D14] mt-0.5">
                {locale === 'bn' ? `${event.venue.nameBn}, ${event.venue.cityBn}` : `${event.venue.name}, ${event.venue.city}`}
              </p>
              <p className="text-xs text-[#3A0D14]/70 italic font-serif">
                {locale === 'bn' ? `Venue: ${event.venue.name}, ${event.venue.city}` : `অনুষ্ঠান স্থল: ${event.venue.nameBn}`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Folk Illustration: Bengali Village Mud Thatched Houses (Aatchala) & Coconut Palms */}
      <div className="w-full max-w-[430px] mt-5 sm:mt-8 pt-2 flex flex-col items-center">
        <svg
          className="w-full h-24 text-[#B3172F]/85"
          viewBox="0 0 400 90"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Coconut Palm Trees */}
          <g transform="translate(45, 0)">
            <path d="M 12 70 Q 15 40, 10 20" strokeWidth="2.5" />
            <path d="M 10 20 Q 25 10, 35 22 M 10 20 Q 20 2, 28 0 M 10 20 Q 5 2, -5 2 M 10 20 Q -10 10, -18 20" strokeWidth="1.8" />
          </g>
          <g transform="translate(345, 0)">
            <path d="M 10 70 Q 6 40, 12 20" strokeWidth="2.5" />
            <path d="M 12 20 Q 25 10, 35 20 M 12 20 Q 18 2, 26 0 M 12 20 Q 2 2, -6 2 M 12 20 Q -10 10, -18 22" strokeWidth="1.8" />
          </g>

          {/* Cottage 1 (Left Aatchala Thatched Hut) */}
          <g transform="translate(90, 25)">
            {/* Curved Thatched Roof */}
            <path d="M -5 25 Q 25 5, 55 25 Z" fill="#F6E9D2" stroke="#B3172F" strokeWidth="1.8" />
            <path d="M 5 20 Q 25 10, 45 20" stroke="#B3172F" strokeDasharray="2 2" />
            {/* Wall */}
            <rect x="5" y="25" width="40" height="25" fill="#FFF8EC" stroke="#B3172F" strokeWidth="1.8" />
            {/* Door & Window */}
            <rect x="18" y="32" width="14" height="18" fill="#B3172F" />
            <rect x="8" y="30" width="6" height="6" fill="#B3172F" fillOpacity="0.4" />
          </g>

          {/* Cottage 2 (Center Thatched Hut) */}
          <g transform="translate(170, 20)">
            {/* Curved Roof */}
            <path d="M -8 30 Q 30 5, 68 30 Z" fill="#F6E9D2" stroke="#B3172F" strokeWidth="2" />
            <path d="M 2 24 Q 30 12, 58 24" stroke="#B3172F" strokeDasharray="3 2" />
            {/* Wall */}
            <rect x="2" y="30" width="56" height="30" fill="#FFF8EC" stroke="#B3172F" strokeWidth="1.8" />
            {/* Door & Window */}
            <rect x="23" y="38" width="14" height="22" fill="#B3172F" />
            <rect x="8" y="36" width="8" height="8" fill="#B3172F" fillOpacity="0.4" />
            <rect x="44" y="36" width="8" height="8" fill="#B3172F" fillOpacity="0.4" />
          </g>

          {/* Cottage 3 (Right Thatched Hut) */}
          <g transform="translate(260, 25)">
            {/* Roof */}
            <path d="M -5 25 Q 25 5, 55 25 Z" fill="#F6E9D2" stroke="#B3172F" strokeWidth="1.8" />
            <path d="M 5 20 Q 25 10, 45 20" stroke="#B3172F" strokeDasharray="2 2" />
            {/* Wall */}
            <rect x="5" y="25" width="40" height="25" fill="#FFF8EC" stroke="#B3172F" strokeWidth="1.8" />
            {/* Door & Window */}
            <rect x="18" y="32" width="14" height="18" fill="#B3172F" />
            <rect x="36" y="30" width="6" height="6" fill="#B3172F" fillOpacity="0.4" />
          </g>

          {/* Ground Kantha Line with decorative fish / scallops */}
          <line x1="0" y1="80" x2="400" y2="80" stroke="#B3172F" strokeWidth="1.5" />
          <line x1="0" y1="84" x2="400" y2="84" stroke="#B3172F" strokeWidth="1" strokeDasharray="4 3" />
        </svg>
      </div>
    </section>
  );
}

