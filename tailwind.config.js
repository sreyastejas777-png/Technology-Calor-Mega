/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1C1C1C',
        secondary: '#B8850F',
        accent: '#E09F3E',
        paper: '#FFFFFF',
        success: '#3FA34D',
        // Custom variables mapped to CSS variables for the imported pages
        bg: 'var(--bg-color)',
        surface: 'var(--surface-color)',
        border: 'var(--surface-border)',
        'primary-text': 'var(--text-primary)',
        'secondary-text': 'var(--text-secondary)',
        'accent-glow': 'var(--accent-glow)',
        'toggle-bg': 'var(--toggle-bg)',
        'toggle-thumb': 'var(--toggle-thumb-bg)',
        'toggle-accent': 'var(--toggle-accent)',
        'brand-light': 'var(--brand-light)',
        whatsapp: '#25D366',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['"Roboto"', '"Inter"', 'sans-serif'],
        roboto: ['"Roboto"', 'sans-serif'],
        condensed: ['"Roboto Condensed"', 'sans-serif'],
        outfit: ['"Playfair Display"', 'serif'], // Match outfit headers to main display font
      },
      boxShadow: {
        soft: '0 10px 40px -10px rgba(28, 28, 28, 0.15)',
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'skeuo-in': 'var(--skeuo-inset)',
        'skeuo-out': 'var(--skeuo-outset)',
        'card-hover': 'var(--skeuo-card-hover)',
        btn: 'var(--btn-shadow)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
