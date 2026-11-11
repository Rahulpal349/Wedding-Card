import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}', './content/**/*.ts'],
  theme: {
    extend: {
      colors: {
        sindoor: '#B3172F',
        maroon: '#6F0E20',
        rice: '#FFF8EC',
        'rice-2': '#F6E9D2',
        haldi: '#F2B705',
        terracotta: '#B5532E',
        leaf: '#2F5D3A',
        ink: '#3A0D14',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'var(--font-cormorant)', 'serif'],
        'display-bn': ['"Galada"', 'var(--font-galada)', 'cursive'],
        body: ['"Hind Siliguri"', 'var(--font-hind-siliguri)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
