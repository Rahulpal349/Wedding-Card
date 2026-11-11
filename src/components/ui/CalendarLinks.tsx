'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import { downloadICS, getGoogleCalendarUrl, CalendarEvent } from '@/lib/calendar';

interface CalendarLinksProps {
  title: string;
  start: string;
  end: string;
  location: string;
  description: string;
  compact?: boolean;
  align?: 'left' | 'right' | 'center';
  variant?: 'default' | 'compact' | 'hero';
  label?: string;
  className?: string;
  buttonClassName?: string;
}

export default function CalendarLinks({
  title,
  start,
  end,
  location,
  description,
  compact = false,
  align = 'left',
  variant = 'default',
  label,
  className = '',
  buttonClassName,
}: CalendarLinksProps) {
  const t = useTranslations('ceremonies');
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
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

  // Determine button styling based on variant
  const getButtonClass = () => {
    if (buttonClassName) return buttonClassName;

    if (variant === 'hero') {
      return 'inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#B3172F] via-[#941224] to-[#6F0E20] text-[#FFF8EC] border-2 border-[#F2B705]/70 shadow-lg hover:shadow-xl hover:brightness-110 active:scale-95 transition-all text-xs sm:text-sm font-bold tracking-wider cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F2B705] min-h-[46px] select-none';
    }

    if (compact || variant === 'compact') {
      return 'inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-[#B3172F] text-[#FFF8EC] text-xs font-semibold hover:bg-[#6F0E20] transition-colors min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705] shadow-sm cursor-pointer select-none';
    }

    return 'inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#B3172F] text-[#FFF8EC] text-sm font-medium hover:bg-[#6F0E20] transition-colors min-h-[44px] min-w-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705] shadow-sm cursor-pointer select-none';
  };

  // Dropdown alignment classes
  const getMenuAlignmentClass = () => {
    if (align === 'center') {
      return 'left-1/2 -translate-x-1/2';
    }
    if (align === 'right') {
      return 'right-0 sm:right-0 left-auto';
    }
    return 'left-0';
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={getButtonClass()}
      >
        {/* Calendar Icon */}
        <svg
          className={variant === 'hero' ? 'w-4 h-4 text-[#F2B705]' : 'w-3.5 h-3.5'}
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

        <span>{label || t('addToCalendar')}</span>

        {/* Dropdown Chevron */}
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            variant === 'hero' ? 'text-[#F2B705]' : ''
          } ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Modal Dialog for Hero Variant (Never gets clipped by parent overflow!) */}
      {isOpen && variant === 'hero' && mounted && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={label || t('addToCalendar')}
        >
          <div
            className="relative w-full max-w-[340px] sm:max-w-sm rounded-3xl bg-[#FFF8EC] border-2 border-[#F2B705] shadow-2xl p-6 text-center flex flex-col items-center select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-[#3A0D14]/10 hover:bg-[#3A0D14]/20 text-[#3A0D14] flex items-center justify-center transition-colors cursor-pointer text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#B3172F]"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Header Icon */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#B3172F] to-[#6F0E20] text-[#F2B705] flex items-center justify-center shadow-md mb-2.5">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>

            {/* Title & Date */}
            <h3 className="font-display-bn text-2xl text-[#6F0E20] font-bold">
              {label || 'SAVE THE DATE'}
            </h3>
            <p className="text-sm font-semibold text-[#3A0D14] mt-0.5">
              Wednesday, 25 November 2026
            </p>
            <p className="text-xs text-[#B5532E] font-serif mb-4">
              ২৫ নভেম্বর ২০২৬ • সন্ধ্যা ৭:০০ থেকে
            </p>

            {/* Action Buttons */}
            <div className="w-full flex flex-col gap-2.5">
              {/* Google Calendar */}
              <button
                type="button"
                onClick={handleGoogleCalendar}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-white hover:bg-[#F6E9D2] border border-[#B3172F]/20 shadow-sm hover:shadow transition-all text-left min-h-[52px] cursor-pointer group"
              >
                <span className="w-9 h-9 rounded-xl bg-[#4285F4]/10 flex items-center justify-center text-xl shrink-0">
                  📅
                </span>
                <div className="flex-1">
                  <p className="font-bold text-sm text-[#3A0D14] group-hover:text-[#B3172F] leading-tight">
                    Google Calendar
                  </p>
                  <p className="text-[11px] text-[#6F0E20]/75">
                    Open &amp; save to your Google Calendar
                  </p>
                </div>
                <span className="text-[#B3172F] text-base font-bold transition-transform group-hover:translate-x-0.5">→</span>
              </button>

              {/* Apple / Outlook */}
              <button
                type="button"
                onClick={handleDownloadICS}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-white hover:bg-[#F6E9D2] border border-[#B3172F]/20 shadow-sm hover:shadow transition-all text-left min-h-[52px] cursor-pointer group"
              >
                <span className="w-9 h-9 rounded-xl bg-[#6F0E20]/10 flex items-center justify-center text-xl shrink-0">
                  🍏
                </span>
                <div className="flex-1">
                  <p className="font-bold text-sm text-[#3A0D14] group-hover:text-[#B3172F] leading-tight">
                    Apple / Outlook / Phone
                  </p>
                  <p className="text-[11px] text-[#6F0E20]/75">
                    Download .ics event file
                  </p>
                </div>
                <span className="text-[#B3172F] text-base font-bold transition-transform group-hover:translate-x-0.5">→</span>
              </button>
            </div>
          </div>
        </div>,
        document.body,
      )}

      {/* In-place Dropdown for non-hero variants */}
      {isOpen && variant !== 'hero' && (
        <div
          role="menu"
          aria-orientation="vertical"
          className={`absolute mt-2.5 w-60 rounded-2xl bg-[#FFF8EC] border-2 border-[#B3172F]/30 shadow-2xl z-40 py-2 focus:outline-none animate-fadeIn ${getMenuAlignmentClass()}`}
        >
          {/* Header Label inside popup */}
          <div className="px-4 py-1.5 border-b border-[#B5532E]/15 mb-1">
            <p className="text-[11px] font-bold text-[#6F0E20] uppercase tracking-wider">
              {label || t('addToCalendar')}
            </p>
            <p className="text-[10px] text-[#B5532E]/80">
              ২৫ নভেম্বর ২০২৬ • 25 Nov 2026
            </p>
          </div>

          {/* Google Calendar option */}
          <button
            role="menuitem"
            type="button"
            onClick={handleGoogleCalendar}
            className="flex items-center w-full px-4 py-2.5 text-xs sm:text-sm font-medium text-[#3A0D14] hover:bg-[#F6E9D2] hover:text-[#B3172F] transition-colors text-left min-h-[44px] cursor-pointer"
          >
            <span className="w-6 h-6 rounded-full bg-[#B3172F]/10 flex items-center justify-center mr-2.5 shrink-0 text-[#B3172F]">
              📅
            </span>
            <div className="flex flex-col">
              <span className="font-semibold text-xs sm:text-sm">{t('googleCalendar')}</span>
              <span className="text-[10px] text-[#6F0E20]/70">Google Calendar</span>
            </div>
          </button>

          {/* Apple Calendar / Outlook / ICS option */}
          <button
            role="menuitem"
            type="button"
            onClick={handleDownloadICS}
            className="flex items-center w-full px-4 py-2.5 text-xs sm:text-sm font-medium text-[#3A0D14] hover:bg-[#F6E9D2] hover:text-[#B3172F] transition-colors text-left min-h-[44px] cursor-pointer"
          >
            <span className="w-6 h-6 rounded-full bg-[#B3172F]/10 flex items-center justify-center mr-2.5 shrink-0 text-[#B3172F]">
              🍏
            </span>
            <div className="flex flex-col">
              <span className="font-semibold text-xs sm:text-sm">{t('downloadICS')}</span>
              <span className="text-[10px] text-[#6F0E20]/70">Apple / Outlook / Phone (.ics)</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
