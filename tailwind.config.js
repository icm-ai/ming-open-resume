import animate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }
      md: '768px',
      // => @media (min-width: 768px) { ... }
      lg: '900px',
      // => @media (min-width: 900px) { ... }
      xl: '1280px',
      // => @media (min-width: 1280px) { ... }
      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-text-primary)',
        border: 'var(--color-border)',
        input: 'var(--color-border)', // Or a more specific input background/border
        ring: 'var(--color-primary)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--color-background)', // Assumes primary is dark, background is light. Adjust per palette or add specific var.
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          foreground: 'var(--color-text-primary)', // Assumes secondary is light.
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          foreground: 'var(--color-text-primary)', // Assumes accent is light/vibrant.
        },
        muted: {
          DEFAULT: 'var(--color-text-secondary)', // Often a dimmer version of text
          foreground: 'var(--color-text-secondary)', // Text on muted background
        },
        card: {
          DEFAULT: 'var(--color-secondary)', // Or var(--color-background)
          foreground: 'var(--color-text-primary)',
        },
        popover: {
          DEFAULT: 'var(--color-background)',
          foreground: 'var(--color-text-primary)',
        },
        // Keeping destructive and chart colors as they are, they might be independent of the theme
        destructive: {
          DEFAULT: 'hsl(0 84.2% 60.2%)', // Original values from index.css
          foreground: 'hsl(0 0% 98%)',    // Original values from index.css
        },
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
    },
  },
  plugins: [animate],
}
