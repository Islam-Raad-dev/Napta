/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    // ── Proxy آمن: يُعيد توجيه /api/* للخادم المحلي (port 3001) ──────────
    // المفاتيح تبقى في الخادم ولا تُضمَّن في bundle المتصفح أبداً
    proxy: {
      '/api': {
        target:       'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.js',
  }
})
