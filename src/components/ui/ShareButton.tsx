'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { event } from '../../../content/event';

export default function ShareButton() {
  const [copied, setCopied] = useState(false);
  const t = useTranslations('footer');
  const locale = useLocale();

  const handleShare = async () => {
    // Generate clean canonical share URL
    let url = event.siteUrl;
    if (typeof window !== 'undefined' && window.location.origin) {
      url = `${window.location.origin}/${locale}`;
    }

    const title =
      locale === 'bn'
        ? `${event.bride.nameBn} ও ${event.groom.nameBn} — শুভ বিবাহ`
        : `${event.bride.name} & ${event.groom.name} — Wedding Invitation`;
    const text =
      locale === 'bn'
        ? `${event.bride.nameBn} ও ${event.groom.nameBn} এর শুভ বিবাহের মাঙ্গলিক আমন্ত্রণপত্র।`
        : `Cordially inviting you to the wedding of ${event.bride.name} & ${event.groom.name}.`;

    // 1. Try Native Web Share API on mobile
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return; // Successfully shared or handled by system
      } catch (err: unknown) {
        // If the user cancelled or dismissed the share sheet, do NOT copy or flash alert
        if (err instanceof Error && (err.name === 'AbortError' || err.message.includes('canceled'))) {
          return;
        }
      }
    }

    // 2. Clipboard API fallback
    let copiedSuccess = false;
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(url);
        copiedSuccess = true;
      } catch {}
    }

    // 3. Fallback for older webviews / non-secure contexts
    if (!copiedSuccess && typeof document !== 'undefined') {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = url;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '-9999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        copiedSuccess = document.execCommand('copy');
        document.body.removeChild(textarea);
      } catch {}
    }

    if (copiedSuccess) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#B3172F] hover:bg-[#8F1124] active:scale-95 text-[#FFF8EC] text-base font-semibold shadow-xl border border-[#FFF8EC]/20 transition-all duration-200 min-h-[48px] w-full max-w-[280px] focus:outline-none focus:ring-2 focus:ring-[#F2B705] cursor-pointer"
      aria-label={copied ? t('copied') : t('copyLink')}
    >
      {copied ? (
        <>
          <svg className="w-5 h-5 text-[#F2B705]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{t('copied')}</span>
        </>
      ) : (
        <>
          <svg className="w-5 h-5 text-[#FFF8EC]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          <span>{t('copyLink')}</span>
        </>
      )}
    </button>
  );
}
