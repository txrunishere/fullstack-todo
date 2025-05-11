import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      '/server': {
        target: "http://localhost:8080/api/v1",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/server/, '')
      }
    }
  }
})
