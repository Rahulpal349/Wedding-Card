'use client';

import { useLocale } from 'next-intl';

interface DateMedallionProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function DateMedallion({ className = '', size = 'md' }: DateMedallionProps) {
  const locale = useLocale();

  return (
    <div
      className={`inline-flex flex-col items-center justify-center select-none ${className}`}
      aria-label={
        locale === 'bn'
          ? '২৫ নভেম্বর ২০২৬, বুধবার সকাল ১০:৩০ থেকে'
          : 'November 25, 2026, Wednesday 10:30 am onwards'
      }
    >
      {/* Outer Metallic Gold Border Ring with Warm Drop Shadow */}
      <div
        className="w-[144px] h-[144px] sm:w-[156px] sm:h-[156px] rounded-full p-[6px] sm:p-[7px] flex items-center justify-center transition-transform hover:scale-[1.02] duration-300"
        style={{
          background: 'linear-gradient(145deg, #F3DC9E 0%, #D4A74F 28%, #A67527 68%, #E5C77F 100%)',
          boxShadow:
            '0 12px 28px -6px rgba(166, 117, 39, 0.35), 0 6px 14px -4px rgba(0, 0, 0, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.6)',
        }}
      >
        {/* Inner White Porcelain Disc */}
        <div
          className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center text-center px-2 py-1 relative overflow-hidden"
          style={{
            boxShadow:
              'inset 0 2px 4px rgba(0, 0, 0, 0.05), inset 0 -1px 2px rgba(212, 167, 79, 0.2)',
          }}
        >
          {/* Subtle inner parchment radial sheen */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background: 'radial-gradient(circle at 50% 30%, #FFFFFF 0%, #FAF5EC 100%)',
            }}
          />

          {/* Month: NOVEMBER */}
          <span className="relative z-10 font-sans text-[11px] sm:text-xs font-bold tracking-[0.24em] text-[#3D2C42] uppercase leading-none mt-0.5">
            {locale === 'bn' ? 'নভেম্বর' : 'NOVEMBER'}
          </span>

          {/* Day: 25 */}
          <span className="relative z-10 font-serif sm:font-display text-[42px] sm:text-[46px] font-bold text-[#352538] leading-none my-0.5 tracking-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
            {locale === 'bn' ? '২৫' : '25'}
          </span>

          {/* Year: 2026 */}
          <span className="relative z-10 font-sans text-xs sm:text-[13px] font-semibold tracking-wider text-[#3D2C42] leading-none mb-1">
            {locale === 'bn' ? '২০২৬' : '2026'}
          </span>

          {/* Day of Week · Time: Wednesday · 10:30 am onwards */}
          <span className="relative z-10 font-serif italic text-[10.5px] sm:text-[11.5px] text-[#78667B] leading-tight tracking-normal">
            {locale === 'bn' ? 'বুধবার · সকাল ১০:৩০ থেকে' : 'Wednesday · 10:30 am onwards'}
          </span>
        </div>
      </div>
    </div>
  );
}
