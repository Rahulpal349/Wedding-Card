'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const LenisContext = createContext<Lenis | null>(null);

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      // Don't enable smooth scroll for users who prefer reduced motion
      return;
    }

    const instance = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    lenisRef.current = instance;
    setLenis(instance);

    // Integrate with GSAP ticker
    const tickerCallback = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Integrate with ScrollTrigger
    instance.on('scroll', ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(tickerCallback);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, [reducedMotion]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}

export function useLenisContext(): Lenis | null {
  return useContext(LenisContext);
}
