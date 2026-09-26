import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages base path — do not remove.
export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',
})
