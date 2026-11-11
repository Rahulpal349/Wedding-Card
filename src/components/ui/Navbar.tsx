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
        <PauseAnimations />
        <SoundToggle />
        <LanguageToggle />

        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="min-h-[44px] min-w-[44px] p-2.5 rounded-full bg-[#FFF8EC]/95 backdrop-blur-md border border-[#B3172F]/20 shadow-md flex items-center justify-center text-[#B3172F] hover:bg-[#F6E9D2] hover:border-[#B3172F]/40 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#B3172F]"
          aria-label={t('menu')}
          aria-expanded={isOpen}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
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
          className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={t('menu')}
        >
          <div
            className="relative w-full max-w-sm h-full bg-[#FFF8EC] text-[#3A0D14] shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto border-l border-[#B3172F]/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#B3172F]/20">
                <div className="flex items-center gap-2">
                  <span className="text-[#B3172F] text-lg font-bold font-serif">
                    {locale === 'bn' ? 'শুভ বিবাহ' : 'Shubho Bibaho'}
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="min-h-[44px] min-w-[44px] p-2 rounded-full hover:bg-[#F6E9D2] text-[#B3172F] transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#B3172F]"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-6 flex flex-col gap-1.5" role="navigation">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-left text-base sm:text-lg font-medium text-[#3A0D14] hover:bg-[#F6E9D2] hover:text-[#B3172F] active:bg-[#B3172F]/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#B3172F]"
                  >
                    <span className="text-xl" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Bottom Controls */}
            <div className="pt-6 border-t border-[#B3172F]/20 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <PauseAnimations
                  showLabel
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#F6E9D2] text-[#6F0E20] font-medium text-xs sm:text-sm border border-[#B5532E]/20"
                />
              </div>
              <div className="flex items-center justify-between text-xs text-[#3A0D14]/70 pt-2">
                <span>{locale === 'bn' ? 'ঝিলিক ও কৌশিক' : 'Jhilik & Koushik'}</span>
                <span>25 Nov 2026</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
