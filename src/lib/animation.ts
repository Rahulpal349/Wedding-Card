import gsap from 'gsap';

export const defaultEase = 'power2.out';
export const ceremonialEase = 'power3.out';

export const fadeInUp = (element: Element, delay = 0) =>
  gsap.fromTo(
    element,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, delay, ease: defaultEase }
  );

export const fadeIn = (element: Element, delay = 0) =>
  gsap.fromTo(
    element,
    { opacity: 0 },
    { opacity: 1, duration: 0.6, delay, ease: defaultEase }
  );

export const drawSVG = (element: Element, duration = 1.2) =>
  gsap.fromTo(
    element,
    { strokeDashoffset: gsap.getProperty(element, 'strokeDasharray') as number },
    { strokeDashoffset: 0, duration, ease: ceremonialEase }
  );
