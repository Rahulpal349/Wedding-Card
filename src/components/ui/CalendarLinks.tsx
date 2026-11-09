'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { downloadICS, getGoogleCalendarUrl, CalendarEvent } from '@/lib/calendar';

interface CalendarLinksProps {
  title: string;
  start: string;
  end: string;
  location: string;
  description: string;
}

export default function CalendarLinks({
  title,
  start,
  end,
  location,
  description,
}: CalendarLinksProps) {
  const t = useTranslations('ceremonies');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const eventData: CalendarEvent = {
    title,
    start: new Date(start),
    end: new Date(end),
    location,
    description,
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleDownloadICS = () => {
    downloadICS(eventData);
    setIsOpen(false);
  };

  const handleGoogleCalendar = () => {
    const url = getGoogleCalendarUrl(eventData);
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#B3172F] text-[#FFF8EC] text-sm font-medium hover:bg-[#6F0E20] transition-colors min-h-[44px] min-w-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705] shadow-sm"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span>{t('addToCalendar')}</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute left-0 mt-2 w-52 rounded-xl bg-[#FFF8EC] border border-[#B5532E]/30 shadow-xl z-30 py-1.5 focus:outline-none animate-fadeIn"
        >
          <button
            role="menuitem"
            type="button"
            onClick={handleDownloadICS}
            className="flex items-center w-full px-4 py-2.5 text-sm text-[#3A0D14] hover:bg-[#F6E9D2] transition-colors text-left min-h-[44px]"
          >
            <svg
              className="w-4 h-4 mr-2.5 text-[#B3172F]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {t('downloadICS')}
          </button>
          <button
            role="menuitem"
            type="button"
            onClick={handleGoogleCalendar}
            className="flex items-center w-full px-4 py-2.5 text-sm text-[#3A0D14] hover:bg-[#F6E9D2] transition-colors text-left min-h-[44px]"
          >
            <svg
              className="w-4 h-4 mr-2.5 text-[#B3172F]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            {t('googleCalendar')}
          </button>
        </div>
      )}
    </div>
  );
}

