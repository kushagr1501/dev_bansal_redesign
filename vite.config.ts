import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  build: {
    // Enable tree shaking and minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Code splitting for optimal loading
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for React
          vendor: ['react', 'react-dom'],
          // Animation libraries in separate chunk
          animations: ['gsap', 'framer-motion'],
          // Smooth scroll in separate chunk
          scroll: ['lenis'],
        },
      },
    },
    // Enable source maps for debugging
    sourcemap: false,
    // Chunk size warnings
    chunkSizeWarningLimit: 500,
  },
  // Performance optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', 'gsap', 'framer-motion'],
  },
  // CSS optimizations
  css: {
    devSourcemap: true,
  },
})
