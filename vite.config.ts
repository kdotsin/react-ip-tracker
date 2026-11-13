import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves this site from /react-ip-tracker/, not the domain root
  base: '/react-ip-tracker/',
})
