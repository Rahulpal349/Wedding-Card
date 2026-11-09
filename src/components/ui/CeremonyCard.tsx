'use client';

import { useTranslations } from 'next-intl';
import { Ceremony } from '../../../content/event';
import CalendarLinks from './CalendarLinks';
import PaanLeafSVG from '@/components/motifs/PaanLeaf';

interface CeremonyCardProps {
  ceremony: Ceremony;
  locale: string;
}

export default function CeremonyCard({ ceremony, locale }: CeremonyCardProps) {
  const t = useTranslations('ceremonies');

  const name = locale === 'bn' ? ceremony.nameBn : ceremony.nameEn;
  const desc = locale === 'bn' ? ceremony.descBn : ceremony.descEn;
  const venue = locale === 'bn' ? ceremony.venueBn : ceremony.venue;
  const address = locale === 'bn' ? ceremony.addressBn : ceremony.address;
  const dressCode = locale === 'bn' ? ceremony.dressCodeBn : ceremony.dressCode;

  // Format date & time nicely with Asia/Kolkata timezone to avoid client hydration timezone drift
  const startDate = new Date(ceremony.date);
  const formattedDate = startDate.toLocaleDateString(locale === 'bn' ? 'bn-IN' : 'en-US', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  const formattedTime = startDate.toLocaleTimeString(locale === 'bn' ? 'bn-IN' : 'en-US', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <article
      className="flex-shrink-0 w-[300px] sm:w-[340px] md:w-[380px] bg-[#FFF8EC] rounded-2xl p-6 sm:p-7 border border-[#B5532E]/25 shadow-lg flex flex-col justify-between relative overflow-hidden snap-start transition-transform duration-300 hover:-translate-y-1"
    >
      {/* Decorative subtle Paan leaf watermark in background corner */}
      <div className="absolute -top-6 -right-6 w-24 h-24 opacity-10 pointer-events-none rotate-12">
        <PaanLeafSVG />
      </div>

      <div>
        {/* Top Tag: Date & Time */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F6E9D2] text-[#B3172F] text-xs font-semibold tracking-wide uppercase mb-4 border border-[#B5532E]/20">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <polyline points="12 6 12 12 16 14" strokeWidth="2" />
          </svg>
          <span>{formattedDate} • {formattedTime}</span>
        </div>

        {/* Ceremony Name */}
        <h3
          className={
            locale === 'bn'
              ? 'font-display-bn text-2xl sm:text-3xl text-[#B3172F] font-bold mb-2'
              : 'font-display text-2xl sm:text-3xl text-[#B3172F] font-bold mb-2'
          }
        >
          {name}
        </h3>

        {/* Description */}
        <p className="text-sm sm:text-base text-[#3A0D14]/80 leading-relaxed mb-5 min-h-[44px]">
          {desc}
        </p>

        {/* Venue & Address details */}
        <div className="space-y-2 mb-5 text-sm text-[#3A0D14]/90 border-t border-[#B5532E]/15 pt-4">
          <div className="flex items-start gap-2">
            <svg
              className="w-4 h-4 text-[#B5532E] flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <div>
              <span className="font-semibold block">{venue}</span>
              <span className="text-xs text-[#3A0D14]/70">{address}</span>
            </div>
          </div>

          {dressCode && (
            <div className="flex items-center gap-2 pt-1 text-xs text-[#2F5D3A]">
              <span className="font-semibold">{t('dressCode')}:</span>
              <span className="bg-[#2F5D3A]/10 px-2 py-0.5 rounded border border-[#2F5D3A]/20">
                {dressCode}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons: Add to Calendar & Open Map */}
      <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-[#B5532E]/15">
        <CalendarLinks
          title={name}
          start={ceremony.date}
          end={ceremony.endDate || ceremony.date}
          location={`${venue}, ${address}`}
          description={desc}
        />

        <a
          href={ceremony.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-[#B3172F]/30 bg-[#FFF8EC] text-[#B3172F] text-sm font-medium hover:bg-[#F6E9D2] transition-colors min-h-[44px] min-w-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
            <line x1="8" y1="2" x2="8" y2="18" />
            <line x1="16" y1="6" x2="16" y2="22" />
          </svg>
          <span>{t('openMap')}</span>
        </a>
      </div>
    </article>
  );
}

