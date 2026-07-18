/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Warm "paper" study-desk palette (light only)
        paper: '#FAF7F1', // page background
        surface: '#FFFDF9', // raised surfaces
        ink: '#2B2622', // primary text
        muted: '#6E655B', // secondary text
        faint: '#9C9287', // tertiary / meta
        line: '#E8E1D5', // hairline dividers
        clay: {
          50: '#F7EAE1',
          100: '#EFD6C6',
          200: '#E3B79E',
          300: '#D69476',
          400: '#CC7C55',
          500: '#C2683D', // accent (muted terracotta)
          600: '#A9542E',
          700: '#8A4224',
        },
        sage: {
          100: '#E4EBE0',
          500: '#6B8E6A', // "done" / positive
          600: '#557254',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(43, 38, 34, 0.04), 0 8px 24px -12px rgba(43, 38, 34, 0.10)',
      },
      maxWidth: {
        prose: '46rem',
      },
    },
  },
  plugins: [],
}
