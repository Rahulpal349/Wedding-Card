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

export default function Venue() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('venue');
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 85%',
              once: true,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const venueName = locale === 'bn' ? event.venue.nameBn : event.venue.name;
  const city = locale === 'bn' ? event.venue.cityBn : event.venue.city;
  const address = locale === 'bn' ? event.venue.addressBn : event.venue.address;

  return (
    <section
      id="venue"
      ref={sectionRef}
      className="relative min-h-screen py-16 px-4 flex flex-col justify-between items-center text-[#FFF8EC] overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #1A0508 0%, #2A0910 40%, #150306 100%)',
      }}
    >
      {/* Golden Fairy Lights & Hanging Lanterns at Top (Screen 7 Atmosphere) */}
      <div className="absolute top-0 inset-x-0 pointer-events-none z-10 flex justify-center">
        <svg
          className="w-full max-w-[500px] h-24 overflow-visible"
          viewBox="0 0 500 90"
          fill="none"
          aria-hidden="true"
        >
          {/* Tree Canopy Silhouette */}
          <path
            d="M 0 0 C 100 35, 200 15, 300 35 C 400 15, 450 35, 500 0 L 500 0 L 0 0 Z"
            fill="#0D0204"
            opacity="0.8"
          />

          {/* Fairy Light Swags */}
          <path
            d="M 20 5 Q 120 40, 240 20 Q 360 40, 480 10"
            stroke="#F2B705"
            strokeWidth="1"
            strokeDasharray="2 6"
            opacity="0.6"
          />

          {/* Hanging Brass Lanterns with Warm Candlelight Glow */}
          {[90, 220, 380].map((lx, i) => (
            <g key={lx} transform={`translate(${lx}, ${15 + (i % 2) * 8})`}>
              {/* String */}
              <line x1="0" y1="0" x2="0" y2="35" stroke="#F2B705" strokeWidth="1" opacity="0.7" />
              {/* Lantern Frame */}
              <rect x="-7" y="35" width="14" height="20" rx="3" fill="#D99B00" stroke="#F2B705" strokeWidth="1" />
              {/* Glowing Glass */}
              <rect x="-5" y="38" width="10" height="14" rx="2" fill="#FFE082" />
              {/* Inner Flame Glow */}
              <circle cx="0" cy="45" r="4" fill="#FFF8EC" />
            </g>
          ))}
        </svg>
      </div>

      <div className="relative z-20 w-full max-w-[430px] mx-auto flex flex-col items-center mt-8">
        {/* Glowing Map Pin Icon */}
        <div className="w-12 h-12 rounded-full bg-[#F2B705]/20 border border-[#F2B705]/40 flex items-center justify-center text-[#F2B705] mb-2 shadow-lg shadow-[#F2B705]/10">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>

        {/* Title: অনুষ্ঠান স্থল / Wedding Venue */}
        <h2 className="font-display-bn text-3xl sm:text-4xl text-[#F2B705] font-bold drop-shadow-md text-center">
          {locale === 'bn' ? 'অনুষ্ঠান স্থল' : 'Wedding Venue'}
        </h2>

        {/* Venue & City with Flourishes */}
        <div className="flex items-center justify-center gap-2 mt-2 text-[#FFF8EC]">
          <span className="text-[#F2B705] select-none text-base">❧</span>
          <p className="font-display-bn text-2xl sm:text-3xl font-semibold tracking-wide text-center">
            {venueName}
          </p>
          <span className="text-[#F2B705] select-none text-base">❧</span>
        </div>
        <p className="font-display italic text-lg sm:text-xl text-[#FFF8EC]/90 text-center mb-1">
          {city}
        </p>

        {/* Date & Time */}
        <div className="flex items-center gap-4 text-xs sm:text-sm text-[#FFF8EC]/80 mt-1 mb-6">
          <div className="flex items-center gap-1.5">
            <span className="text-[#F2B705]">📅</span>
            <span>{locale === 'bn' ? 'বুধবার, ২৫ নভেম্বর ২০২৬' : 'Wed, 25 Nov 2026'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#F2B705]">⏰</span>
            <span>{locale === 'bn' ? event.ceremonyTimeBn : event.ceremonyTime}</span>
          </div>
        </div>

        {/* Action Button: View on Map */}
        <div className="mb-6">
          <a
            href={event.venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#FFF8EC]/15 hover:bg-[#FFF8EC]/25 text-[#FFF8EC] border border-[#F2B705]/50 backdrop-blur-md font-medium text-sm sm:text-base shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#F2B705] min-h-[44px]"
          >
            <svg className="w-4 h-4 text-[#F2B705]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{locale === 'bn' ? 'মানচিত্রে দেখুন' : 'View on Map'}</span>
          </a>
        </div>

        {/* Night Photo: Heritage Bengali Rajbari with Courtyard Alpona */}
        <div
          ref={cardRef}
          className="relative w-full aspect-[4/3] max-w-[390px] rounded-3xl overflow-hidden shadow-2xl border border-[#F2B705]/30 bg-[#1A0508] mb-6"
        >
          <Image
            src="/images/venue-rajbari-night.webp"
            alt="Heritage Bengali Rajbari courtyard lit with warm lanterns and central Alpona at twilight"
            fill
            sizes="(max-width: 430px) 100vw, 390px"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#150306]/70 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Additional Travel Assistance (Collapsible / Compact) */}
        <div className="w-full max-w-[390px] bg-[#1A0508]/80 border border-[#FFF8EC]/10 rounded-2xl p-4 text-xs sm:text-sm text-[#FFF8EC]/85 space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-[#F2B705] font-bold">📍</span>
            <span>{address}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#F2B705] font-bold">🚆</span>
            <span>
              {t('station')}: {locale === 'bn' ? event.venue.nearestStationBn : event.venue.nearestStation}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#F2B705] font-bold">✈️</span>
            <span>
              {t('airport')}: {locale === 'bn' ? event.venue.nearestAirportBn : event.venue.nearestAirport}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#F2B705] font-bold">🅿️</span>
            <span>
              {t('parking')}: {locale === 'bn' ? event.venue.parkingBn : event.venue.parking}
            </span>
          </div>

          {/* Helpline */}
          <div className="pt-2 border-t border-[#FFF8EC]/10 flex flex-col gap-2">
            <span className="text-[#F2B705] font-semibold text-xs">{t('helpline')}:</span>
            <div className="flex flex-wrap gap-2">
              {event.venue.helplineNumbers.map((hl, i) => (
                <a
                  key={i}
                  href={`tel:${hl.phone.replace(/[\s-]/g, '')}`}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#F2B705]/15 border border-[#F2B705]/30 text-[#F2B705] hover:bg-[#F2B705]/25 font-mono text-xs sm:text-sm min-h-[44px] transition-colors"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>{locale === 'bn' ? hl.nameBn : hl.name}: {hl.phone}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
