'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { event } from '../../../content/event';

export default function LiveStreamBanner() {
  const [shouldShow, setShouldShow] = useState(false);
  const t = useTranslations('liveStream');

  useEffect(() => {
    try {
      const now = new Date();
      const liveTime = new Date(event.liveStream.enableAfter);
      const url = event.liveStream.url;
      const isTest =
        typeof window !== 'undefined' &&
        (window.location.search.includes('live=1') || window.location.search.includes('testLive=1'));

      if ((now >= liveTime || isTest) && url) {
        setShouldShow(true);
      }
    } catch {
      // In case date parsing fails
    }
  }, []);

  if (!shouldShow) return null;

  return (
    <aside
      aria-label="Live Stream"
      className="my-6 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#B3172F] text-[#FFF8EC] border-2 border-[#F2B705] shadow-xl animate-pulse"
    >
      <span className="relative flex h-3.5 w-3.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F2B705] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#F2B705]"></span>
      </span>
      <a
        href={event.liveStream.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm md:text-base font-bold tracking-wide hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF8EC] flex items-center gap-1.5"
      >
        <span>{t('watchLive')}</span>
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      </a>
    </aside>
  );
}
