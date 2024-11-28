import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'dark-bg': '#1e1e1e',
        'dark-text': '#f0f0f0',
        primary: '#0066ff',
        'primary-dark': '#ffd000',
      },
    },
  },
  safelist: [
    {
      pattern: /text-(primary|primary-dark)/,
    },
  ],
  important: true,
  plugins: [],
};
export default config;
