'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { event } from '../../../content/event';
import Countdown from '@/components/ui/Countdown';
import PetalParticles from '@/components/ui/PetalParticles';
import { useReducedMotion } from '@/hooks/useReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('hero');
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              once: true,
            },
          },
        );
      }

      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 0.96, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 85%',
              once: true,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const brideName = locale === 'bn' ? event.bride.nameBn : event.bride.name;
  const groomName = locale === 'bn' ? event.groom.nameBn : event.groom.name;

  return (
    <div
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col items-center justify-between px-3 pt-14 pb-8 sm:px-4 sm:pt-16 sm:pb-10 overflow-hidden bg-[#FFF8EC]"
      style={{
        backgroundImage:
          'radial-gradient(circle at 50% 20%, rgba(246,233,210,0.8) 0%, rgba(255,248,236,1) 100%)',
      }}
    >
      {/* Drifting Petals Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <PetalParticles />
      </div>

      {/* Top Hanging Mango Leaf Garland with Brass Bells (Screen 2 Top) */}
      <div className="absolute top-0 inset-x-0 pointer-events-none z-20 flex justify-center">
        <svg
          className="w-full max-w-[500px] h-16 sm:h-20 text-[#2F5D3A] overflow-visible drop-shadow-sm"
          viewBox="0 0 500 80"
          fill="none"
          aria-hidden="true"
        >
          {/* Main Rope Garland */}
          <path
            d="M 0 5 Q 125 25, 250 25 Q 375 25, 500 5"
            stroke="#B5532E"
            strokeWidth="2.5"
            strokeDasharray="4 2"
          />

          {/* Hanging Mango Leaves (Aam Pata) */}
          {[20, 60, 100, 140, 180, 220, 260, 300, 340, 380, 420, 460].map((x, i) => (
            <g key={x} transform={`translate(${x}, ${15 + Math.sin(i * 0.5) * 6})`}>
              {/* Leaf */}
              <path
                d="M 0 0 C 8 18, 14 35, 0 55 C -14 35, -8 18, 0 0 Z"
                fill="#2F5D3A"
                opacity="0.9"
              />
              <path d="M 0 0 L 0 50" stroke="#487A54" strokeWidth="1" />
            </g>
          ))}

          {/* Hanging Golden Brass Bells (Ghonta) */}
          {[80, 250, 420].map((bx) => (
            <g key={bx} transform={`translate(${bx}, 22)`}>
              <line x1="0" y1="0" x2="0" y2="28" stroke="#F2B705" strokeWidth="1.5" />
              {/* Bell shape */}
              <path
                d="M -6 28 C -7 34, -10 38, -10 40 L 10 40 C 10 38, 7 34, 6 28 Z"
                fill="#F2B705"
                stroke="#B5532E"
                strokeWidth="1"
              />
              <circle cx="0" cy="42" r="2.5" fill="#B5532E" />
            </g>
          ))}
        </svg>
      </div>

      {/* Main Content (Centered max-w-md matching mobile card) */}
      <div className="relative z-20 w-full max-w-[420px] mx-auto flex flex-col items-center text-center mt-3 sm:mt-5">
        {/* Header Texts */}
        <div ref={textRef} className="px-3">
          {/* Main Invitation Title */}
          <h1 className="font-display-bn text-2xl sm:text-3xl md:text-4xl text-[#B3172F] font-bold leading-snug drop-shadow-sm">
            {locale === 'bn'
              ? 'আমাদের বিবাহে আপনাকে সাদর আমন্ত্রণ'
              : 'We Cordially Invite You to Our Wedding'}
          </h1>

          {/* Subtitle with names */}
          <div className="flex items-center justify-center gap-1.5 mt-1.5 text-[#3A0D14]/80 text-xs sm:text-sm md:text-base font-serif italic">
            <span className="text-[#B5532E] select-none">❧</span>
            <p>
              {locale === 'bn' ? (
                <>
                  শুভ বিবাহে সানন্দ নিমন্ত্রণ:{' '}
                  <span className="font-bold text-[#B3172F] not-italic font-display-bn text-base sm:text-lg">
                    {brideName} &amp; {groomName}
                  </span>
                </>
              ) : (
                <>
                  We are delighted to invite you to the wedding of{' '}
                  <span className="font-bold text-[#B3172F] not-italic">
                    {event.bride.name} &amp; {event.groom.name}
                  </span>
                </>
              )}
            </p>
            <span className="text-[#B5532E] select-none">❧</span>
          </div>
        </div>

        {/* Central Couple Artwork (Jhilik & Koushik) */}
        <div
          ref={imageRef}
          className="relative w-full aspect-[4/5] max-w-[300px] sm:max-w-[350px] max-h-[38vh] sm:max-h-[46vh] mt-3 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-3 border-[#F6E9D2] bg-[#F6E9D2]"
        >
          <Image
            src="/images/couple-hero.webp"
            alt="Jhilik and Koushik in traditional Bengali wedding attire"
            fill
            sizes="(max-width: 430px) 90vw, 350px"
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-[#B3172F]/20 pointer-events-none rounded-2xl sm:rounded-3xl" />
        </div>

        {/* Live Countdown Timer */}
        <div className="w-full max-w-sm mt-4 sm:mt-5 px-1">
          <Countdown />
        </div>

        {/* Down Scroll Indicator */}
        <motion.div
          className="mt-4 sm:mt-5 flex flex-col items-center text-[#B3172F]/70 cursor-pointer min-h-[44px] min-w-[44px] justify-center"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          onClick={() => {
            document.getElementById('couple')?.scrollIntoView({ behavior: 'smooth' });
          }}
          aria-label={t('scrollDown')}
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-[#B3172F]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
