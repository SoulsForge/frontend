import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Config = {
  content: [
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui({
    layout: {
      disabledOpacity: '0.3', // opacity-[0.3]
      radius: {
        small: '1px', // rounded-small
        medium: '3px', // rounded-medium
        large: '4px' // rounded-large
      },
      borderWidth: {
        small: '1px', // border-small
        medium: '1px', // border-medium
        large: '2px' // border-large
      }
    },
    themes: {
      light: {},
      dark: {
        colors: {
          background: '#060606'
        }
      }
    }
  })],
};
export default config;
