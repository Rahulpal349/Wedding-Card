export const COLORS = {
  sindoor: '#B3172F',
  maroon: '#6F0E20',
  rice: '#FFF8EC',
  rice2: '#F6E9D2',
  haldi: '#F2B705',
  terracotta: '#B5532E',
  leaf: '#2F5D3A',
  ink: '#3A0D14',
} as const;

export const ANIMATION = {
  duration: {
    slow: 1.2,
    medium: 0.8,
    fast: 0.6,
  },
  ease: 'power2.out',
} as const;

export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
} as const;
