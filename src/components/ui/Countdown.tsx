'use client';

import { useState, useEffect, memo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { event } from '../../../content/event';

interface CountdownProps {
  targetDate?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
  isArchived: boolean;
}

function toBengaliDigits(num: number): string {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .padStart(2, '0')
    .split('')
    .map((d) => (/\d/.test(d) ? bnDigits[parseInt(d, 10)] : d))
    .join('');
}

function calculateTimeLeft(target: Date): TimeLeft {
  const now = new Date().getTime();
  const diff = target.getTime() - now;
  // Archive threshold: 2 days after wedding date (after reception)
  const archiveThreshold = target.getTime() + 2 * 24 * 60 * 60 * 1000;

  if (now > archiveThreshold) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true, isArchived: true };
  }
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true, isArchived: false };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isPast: false,
    isArchived: false,
  };
}

export const Countdown = memo(function Countdown({
  targetDate = event.weddingDate,
}: CountdownProps) {
  const t = useTranslations('countdown');
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => {
    return calculateTimeLeft(new Date(targetDate));
  });

  useEffect(() => {
    setMounted(true);
    const target = new Date(targetDate);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(target));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNum = (n: number) => {
    if (locale === 'bn') {
      return toBengaliDigits(n);
    }
    return n.toString().padStart(2, '0');
  };

  if (!mounted) {
    return (
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5 max-w-sm mx-auto opacity-0" aria-hidden="true">
        <div className="h-14 sm:h-16" />
      </div>
    );
  }

  if (timeLeft.isArchived) {
    return (
      <div
        className="bg-[#F6E9D2] border border-[#B3172F]/30 text-[#6F0E20] font-display-bn text-sm sm:text-base py-3 px-5 rounded-2xl shadow-sm text-center leading-relaxed"
        aria-live="polite"
      >
        {t('archived')}
      </div>
    );
  }

  if (timeLeft.isPast) {
    return (
      <div
        className="bg-[#F6E9D2] border border-[#B3172F]/30 text-[#B3172F] font-display-bn text-base sm:text-xl font-bold py-2.5 px-6 rounded-2xl shadow-sm text-center"
        aria-live="polite"
      >
        {t('weddingDay')}
      </div>
    );
  }

  const units = [
    { label: t('days'), value: timeLeft.days },
    { label: t('hours'), value: timeLeft.hours },
    { label: t('minutes'), value: timeLeft.minutes },
    { label: t('seconds'), value: timeLeft.seconds },
  ];

  return (
    <div
      className="grid grid-cols-4 gap-1.5 sm:gap-2.5 max-w-sm mx-auto"
      aria-label="Wedding Countdown"
      aria-live="polite"
    >
      {units.map((unit, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#F6E9D2] border border-[#B3172F]/20 shadow-sm"
        >
          <span
            className={
              locale === 'bn'
                ? 'font-display-bn text-xl sm:text-2xl font-bold text-[#B3172F] tracking-wider leading-none'
                : 'font-display text-xl sm:text-2xl font-bold text-[#B3172F] leading-none'
            }
          >
            {formatNum(unit.value)}
          </span>
          <span className="text-[11px] sm:text-xs text-[#6F0E20] font-semibold mt-1">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
});

export default Countdown;
