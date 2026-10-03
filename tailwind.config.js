/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#0B0F19',
        brick: '#B4533C',
        parchment: '#F6F1E9',
        brass: '#EAD7C3',
        amber: '#FFB84D',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        hand: ['Caveat', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      keyframes: {
        filament: { '0%, 100%': { opacity: '0.68', filter: 'brightness(1)' }, '48%': { opacity: '1', filter: 'brightness(1.7)' }, '51%': { opacity: '0.73', filter: 'brightness(1)' } },
        steam: { '0%': { transform: 'translateY(5px) scale(.65)', opacity: '0' }, '25%': { opacity: '.72' }, '100%': { transform: 'translateY(-46px) translateX(9px) scale(1.35)', opacity: '0' } },
        ember: { '0%': { transform: 'translateY(0) scale(.7)', opacity: '0' }, '18%': { opacity: '.95' }, '100%': { transform: 'translateY(-135px) translateX(28px) scale(.1)', opacity: '0' } },
        vinyl: { to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        filament: 'filament 3.2s ease-in-out infinite',
        steam: 'steam 3s ease-out infinite',
        ember: 'ember 3.6s ease-out infinite',
        vinyl: 'vinyl 3.2s linear infinite',
      },
    },
  },
  plugins: [],
}
