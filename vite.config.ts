import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative assets work on GitHub Pages and local builds
  server: {
    port: 3000,
    open: false,
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split core React libraries into a vendor chunk
          'react-vendor': ['react', 'react-dom'],
          // Split Lucide icons into its own chunk so it doesn't block critical render path
          'icons': ['lucide-react'],
        },
      },
    },
    // Compress and remove unused code
    chunkSizeWarningLimit: 500,
  },
});