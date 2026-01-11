/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ============================================
      // CUSTOM COLOR PALETTE - Dark luxurious theme
      // Inspired by Serhii Korzhov's design
      // ============================================
      colors: {
        // Primary dark backgrounds
        'void': '#0a0a0a',        // Deepest black
        'obsidian': '#0f0f0f',    // Primary background
        'carbon': '#141414',      // Card backgrounds
        'graphite': '#1a1a1a',    // Elevated surfaces
        'slate': '#242424',       // Borders, dividers
        
        // Accent colors - Electric cyan with warm gold contrast
        'electric': '#00f0ff',    // Primary accent (cyan)
        'azure': '#0ea5e9',       // Secondary accent (blue)
        'plasma': '#7c3aed',      // Tertiary accent (purple)
        'gold': '#f59e0b',        // Warm accent
        'ember': '#ef4444',       // Error/hot accent
        
        // Text hierarchy
        'pearl': '#fafafa',       // Primary text
        'silver': '#a1a1aa',      // Secondary text
        'steel': '#52525b',       // Muted text
        
        // Gradients base colors
        'gradient-start': '#00f0ff',
        'gradient-mid': '#7c3aed',
        'gradient-end': '#f59e0b',
      },
      
      // ============================================
      // TYPOGRAPHY - Bold, editorial choices
      // ============================================
      fontFamily: {
        // Display font - bold, geometric for headlines
        'display': ['"Bebas Neue"', '"Oswald"', 'Impact', 'sans-serif'],
        // Heading font - refined, modern
        'heading': ['"Clash Display"', '"Space Grotesk"', 'system-ui', 'sans-serif'],
        // Body font - highly legible
        'body': ['"Satoshi"', '"DM Sans"', 'system-ui', 'sans-serif'],
        // Mono font - for code/tech elements
        'mono': ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      
      fontSize: {
        // Massive display sizes for hero sections
        'display-xl': ['clamp(4rem, 15vw, 12rem)', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(3rem, 10vw, 8rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2rem, 6vw, 5rem)', { lineHeight: '1', letterSpacing: '-0.01em' }],
        'display-sm': ['clamp(1.5rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
      },
      
      // ============================================
      // SPACING & LAYOUT
      // ============================================
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      
      // ============================================
      // ANIMATIONS - Smooth, cinematic
      // ============================================
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-left': 'slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-right': 'slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'reveal': 'reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'line-grow': 'lineGrow 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'text-shimmer': 'textShimmer 2s ease-in-out infinite',
        'magnetic': 'magnetic 0.3s ease-out',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        reveal: {
          '0%': { 
            clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
            opacity: '0'
          },
          '100%': { 
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            opacity: '1'
          },
        },
        glowPulse: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.3), 0 0 40px rgba(0, 240, 255, 0.1)'
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(0, 240, 255, 0.5), 0 0 60px rgba(0, 240, 255, 0.2)'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        lineGrow: {
          '0%': { transform: 'scaleX(0)', transformOrigin: 'left' },
          '100%': { transform: 'scaleX(1)', transformOrigin: 'left' },
        },
        textShimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      
      // ============================================
      // TRANSITIONS - Butter smooth
      // ============================================
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in-out': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'bounce-out': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
      },
      
      // ============================================
      // EFFECTS & FILTERS
      // ============================================
      backdropBlur: {
        'xs': '2px',
        '3xl': '64px',
      },
      
      boxShadow: {
        'glow': '0 0 20px rgba(0, 240, 255, 0.3)',
        'glow-lg': '0 0 40px rgba(0, 240, 255, 0.4), 0 0 80px rgba(0, 240, 255, 0.2)',
        'glow-purple': '0 0 20px rgba(124, 58, 237, 0.3)',
        'glow-gold': '0 0 20px rgba(245, 158, 11, 0.3)',
        'inner-glow': 'inset 0 0 30px rgba(0, 240, 255, 0.1)',
        'elevated': '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
      },
      
      // ============================================
      // BORDERS & SHAPES
      // ============================================
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      
      // ============================================
      // Z-INDEX SCALE
      // ============================================
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [],
}
