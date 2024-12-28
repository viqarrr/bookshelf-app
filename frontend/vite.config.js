import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://deafening-clerissa-viqarr-a8530182.koyeb.app',
        changeOrigin: true,   
        secure: false,        
      },
    },
  }
})
