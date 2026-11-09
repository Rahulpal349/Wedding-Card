'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations, useLocale } from 'next-intl';
import { event } from '../../../content/event';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import KanthaStitchSVG from '@/components/motifs/KanthaStitch';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function toBengaliDigits(str: string): string {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return str.replace(/\d/g, (d) => bnDigits[parseInt(d, 10)]);
}

export default function OurStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGLineElement>(null);
  const milestoneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const t = useTranslations('story');
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Dynamic vertical kantha stitch line drawing on scroll
      if (pathRef.current) {
        const line = pathRef.current;
        const length = typeof line.getTotalLength === 'function' ? line.getTotalLength() : 1000;
        gsap.set(line, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(line, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 85%',
            scrub: 0.8,
          },
        });
      }

      // Staggered reveal of milestone cards
      milestoneRefs.current.filter(Boolean).forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.1, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="bg-[#FFF8EC] py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24">
          <h2
            className={
              locale === 'bn'
                ? 'font-display-bn text-3xl sm:text-4xl md:text-5xl text-[#B3172F] font-bold mb-2'
                : 'font-display text-3xl sm:text-4xl md:text-5xl text-[#B3172F] font-bold mb-2'
            }
          >
            {t('title')}
          </h2>
          <p className="font-display text-base text-[#B5532E] tracking-widest uppercase mb-4">
            {t('subtitle')}
          </p>
          <div className="max-w-xs mx-auto text-[#B5532E]/40">
            <KanthaStitchSVG />
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Kantha Stitch Guide Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 -translate-x-1/2 w-8 flex justify-center pointer-events-none">
            <svg
              className="w-full h-full"
              viewBox="0 0 32 1000"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              <line
                x1="16"
                y1="0"
                x2="16"
                y2="1000"
                stroke="#B5532E"
                strokeWidth="2.5"
                strokeDasharray="8 8"
                strokeLinecap="round"
                opacity="0.3"
              />
              <line
                ref={pathRef}
                x1="16"
                y1="0"
                x2="16"
                y2="1000"
                stroke="#B3172F"
                strokeWidth="3.5"
                strokeDasharray="8 8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Milestones List */}
          <div className="space-y-12 sm:space-y-16">
            {event.story.map((item, index) => {
              const isEven = index % 2 === 0;
              const title = locale === 'bn' ? item.titleBn : item.titleEn;
              const desc = locale === 'bn' ? item.descBn : item.descEn;
              const year = locale === 'bn' ? toBengaliDigits(item.year) : item.year;

              return (
                <div
                  key={index}
                  ref={(el) => {
                    milestoneRefs.current[index] = el;
                  }}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row-reverse' : 'md:flex-row'
                  }`}
                >
                  {/* Milestone Marker Rosette on the central line */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 w-9 h-9 rounded-full bg-[#FFF8EC] border-2 border-[#B3172F] flex items-center justify-center shadow-md">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#F2B705]" />
                  </div>

                  {/* Milestone Content Card */}
                  <div
                    className={`ml-14 md:ml-0 md:w-1/2 ${
                      isEven ? 'md:pl-12' : 'md:pr-12 md:text-right'
                    }`}
                  >
                    <div className="bg-[#F6E9D2]/70 backdrop-blur-sm p-6 sm:p-7 rounded-2xl border border-[#B5532E]/25 shadow-md transition-transform duration-300 hover:-translate-y-0.5">
                      {/* Year badge */}
                      <span className="inline-block px-3 py-1 rounded-full bg-[#B3172F] text-[#FFF8EC] font-display text-xs sm:text-sm font-bold tracking-wider mb-2">
                        {year}
                      </span>

                      {/* Milestone Title */}
                      <h3
                        className={
                          locale === 'bn'
                            ? 'font-display-bn text-2xl sm:text-3xl font-bold text-[#6F0E20] mb-2'
                            : 'font-display text-2xl sm:text-3xl font-bold text-[#6F0E20] mb-2'
                        }
                      >
                        {title}
                      </h3>

                      {/* Milestone Description */}
                      <p className="text-sm sm:text-base text-[#3A0D14]/80 leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

