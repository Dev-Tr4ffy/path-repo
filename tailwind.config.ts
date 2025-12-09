import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'fps-blue': '#1E3A8A',
        'fps-lightblue': '#3B82F6',
        'fps-text': '#E5E7EB',
      },
    },
  },
  plugins: [],
};
export default config;
