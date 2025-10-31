/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui'] },
    extend: {
      colors: {
        brand: {
          yellow: '#F6C313',
          gray: '#6B7280',
          border: '#E5E7EB',
          card: '#F7F7F7',
          green: '#22C55E'
        }
      },
      borderRadius: { card: '10px', btn: '8px', pill: '999px' },
      boxShadow: { card: '0 1px 2px rgba(0,0,0,.05), 0 8px 24px rgba(0,0,0,.06)' }
    }
  },
  plugins: []
};
