import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Reto-33/',
  plugins: [react()],
  build: {
    cssCodeSplit: false,
  }
})
