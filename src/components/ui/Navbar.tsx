'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useLenisContext } from '@/hooks/useLenis';
import LanguageToggle from './LanguageToggle';
import SoundToggle from './SoundToggle';
import PauseAnimations from './PauseAnimations';

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations('nav');
  const lenis = useLenisContext();

  // Close menu on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navItems: NavItem[] = [
    { id: 'hero', label: t('welcome'), icon: '🌸' },
    { id: 'couple', label: t('couple'), icon: '💑' },
    { id: 'details', label: t('details'), icon: '📅' },
    { id: 'blessings', label: t('blessings'), icon: '🪔' },
    { id: 'the-day', label: t('theDay'), icon: '🕊️' },
    { id: 'venue', label: t('venue'), icon: '🏛️' },
    { id: 'gallery', label: t('gallery'), icon: '🖼️' },
    { id: 'closing', label: t('closing'), icon: '🙏' },
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      if (lenis) {
        lenis.scrollTo(element, { offset: 0, duration: 1.2 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Top Floating Bar */}
      <header
        className="fixed top-3 right-3 sm:top-5 sm:right-6 z-40 flex items-center gap-1.5 sm:gap-2"
        role="banner"
      >
        {/* Pause Animations (Hidden on Mobile View) */}
        <div className="hidden sm:inline-flex">
          <PauseAnimations />
        </div>

        {/* Sound Toggle in Top Bar (Desktop / Tablet only) */}
        <div className="hidden sm:inline-flex">
          <SoundToggle />
        </div>

        <LanguageToggle />

        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="liquid-glass min-h-[44px] min-w-[44px] p-2.5 rounded-full flex items-center justify-center text-[#B3172F] hover:text-[#6F0E20] active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#B3172F] cursor-pointer"
          aria-label={t('menu')}
          aria-expanded={isOpen}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.2"
            aria-hidden="true"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>

      {/* Slide-over / Modal Navigation Menu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={t('menu')}
        >
          <div
            className="liquid-glass-drawer relative w-full max-w-[320px] sm:max-w-sm h-full text-[#3A0D14] p-5 sm:p-7 flex flex-col justify-between overflow-y-auto sm:rounded-l-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Liquid Glass Light Highlights */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-white/50 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute top-1/2 -left-20 w-44 h-44 bg-[#F2B705]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-[#B3172F]/10 rounded-full blur-3xl pointer-events-none" />
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#B3172F]/15">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B3172F] shadow-[0_0_8px_rgba(179,23,47,0.7)] animate-pulse" />
                  <span className="text-[#B3172F] text-lg sm:text-xl font-bold font-serif tracking-wide drop-shadow-sm">
                    {locale === 'bn' ? 'শুভ বিবাহ' : 'Shubho Bibaho'}
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full liquid-glass-pill text-[#B3172F] transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#B3172F] cursor-pointer"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-5 flex flex-col gap-2" role="navigation">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="liquid-glass-pill flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-left text-sm sm:text-base font-semibold text-[#3A0D14] hover:text-[#B3172F] active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-[#B3172F] group cursor-pointer"
                  >
                    <span
                      className="w-8 h-8 rounded-xl bg-white/70 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95)] flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition-transform"
                      aria-hidden="true"
                    >
                      {item.icon}
                    </span>
                    <span className="font-semibold tracking-tight">{item.label}</span>
                    <span className="ml-auto text-xs text-[#B3172F]/40 group-hover:text-[#B3172F] group-hover:translate-x-0.5 transition-all font-bold">
                      →
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Bottom Controls */}
            <div className="pt-5 border-t border-[#B3172F]/15 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <PauseAnimations
                  showLabel
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl liquid-glass-pill text-[#6F0E20] font-medium text-xs sm:text-sm cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between text-xs text-[#3A0D14]/75 px-1 pt-1 font-serif">
                <span className="font-semibold">{locale === 'bn' ? 'ঝিলিক ও কৌশিক' : 'Jhilik & Koushik'}</span>
                <span>25 Nov 2026</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Sound Toggle at Bottom-Right Corner in Mobile View */}
      <div className="fixed bottom-4 right-4 z-40 sm:hidden drop-shadow-xl">
        <SoundToggle />
      </div>
    </>
  );
}
