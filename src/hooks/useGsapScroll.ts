'use client';

import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export interface UseGsapScrollOptions {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  toggleActions?: string;
  pin?: boolean;
  once?: boolean;
}

export function useGsapScroll(
  containerRef: RefObject<HTMLElement | null>,
  animationFn: (container: HTMLElement, gsapInstance: typeof gsap) => gsap.core.Timeline | gsap.core.Tween | void,
  options: UseGsapScrollOptions = {}
) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    if (!containerRef.current) return;

    const container = containerRef.current;

    const ctx = gsap.context(() => {
      const result = animationFn(container, gsap);

      if (result) {
        ScrollTrigger.create({
          trigger: options.trigger ?? container,
          start: options.start ?? 'top 80%',
          end: options.end ?? 'bottom 20%',
          scrub: options.scrub ?? false,
          markers: options.markers ?? false,
          toggleActions: options.toggleActions ?? 'play none none none',
          pin: options.pin ?? false,
          once: options.once ?? true,
          animation: result,
        });
      }
    }, container);

    return () => {
      ctx.revert();
    };
  }, [containerRef, animationFn, options, reducedMotion]);
}
