'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { event } from '../../../content/event';
import JoraMachSVG from '@/components/motifs/JoraMach';
import KanthaStitchSVG from '@/components/motifs/KanthaStitch';
import { useReducedMotion } from '@/hooks/useReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Blessings() {
  const sectionRef = useRef<HTMLElement>(null);
  const invocationRef = useRef<HTMLDivElement>(null);
  const joraMachRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('blessings');
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      /* Invocation fade in and up */
      if (invocationRef.current) {
        gsap.fromTo(
          invocationRef.current,
          { opacity: 0.05, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: invocationRef.current,
              start: 'top 80%',
              once: true,
            },
          },
        );
      }

      /* JoraMach scale in */
      if (joraMachRef.current) {
        gsap.fromTo(
          joraMachRef.current,
          { scale: 0.8, opacity: 0.05 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: joraMachRef.current,
              start: 'top 85%',
              once: true,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const invocationLine =
    locale === 'bn' ? event.invocation.line : event.invocation.lineEn;
  const blessingText =
    locale === 'bn'
      ? event.invocation.blessingText
      : event.invocation.blessingTextEn;

  const brideFather =
    locale === 'bn'
      ? event.brideFamily.fatherNameBn
      : event.brideFamily.fatherName;
  const brideMother =
    locale === 'bn'
      ? event.brideFamily.motherNameBn
      : event.brideFamily.motherName;
  const groomFather =
    locale === 'bn'
      ? event.groomFamily.fatherNameBn
      : event.groomFamily.fatherName;
  const groomMother =
    locale === 'bn'
      ? event.groomFamily.motherNameBn
      : event.groomFamily.motherName;

  return (
    <section
      ref={sectionRef}
      className="bg-[#FFF8EC] py-20 md:py-28 px-6"
    >
      <div className="max-w-2xl mx-auto text-center">
        {/* Invocation */}
        <div ref={invocationRef}>
          <p
            className="font-display-bn text-2xl md:text-3xl text-[#B3172F] mb-4"
            style={{ textShadow: '0 1px 4px rgba(179,23,47,0.15)' }}
          >
            {invocationLine}
          </p>
          <p className="text-base md:text-lg text-[#3A0D14]/80 leading-relaxed mb-10">
            {blessingText}
          </p>
        </div>

        {/* JoraMach divider */}
        <div
          ref={joraMachRef}
          className="flex justify-center mb-10"
        >
          <div className="w-[100px] h-[100px] text-[#B3172F]">
            <JoraMachSVG />
          </div>
        </div>

        {/* Parents' names */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Bride's family */}
          <div>
            <h3 className="font-display-bn text-lg text-[#B3172F] mb-3">
              {t('brideFamily')}
            </h3>
            <p className="text-[#3A0D14]/80 mb-1">{brideFather}</p>
            <p className="text-[#3A0D14]/80">{brideMother}</p>
          </div>

          {/* Groom's family */}
          <div>
            <h3 className="font-display-bn text-lg text-[#B3172F] mb-3">
              {t('groomFamily')}
            </h3>
            <p className="text-[#3A0D14]/80 mb-1">{groomFather}</p>
            <p className="text-[#3A0D14]/80">{groomMother}</p>
          </div>
        </div>

        {/* Kantha stitch bottom border */}
        <div className="mt-16 text-[#B5532E]/40">
          <KanthaStitchSVG />
        </div>
      </div>
    </section>
  );
}
