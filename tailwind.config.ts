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
        display: ['Cormorant Garamond', 'serif'],
        'display-bn': ['Galada', 'cursive'],
        body: ['Hind Siliguri', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
