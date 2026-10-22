import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // third argument '' loads ALL variables, not just ones prefixed with VITE_
  const env = loadEnv(mode, process.cwd(), '')
  const target = env.VITE_BACKEND_URL || 'http://localhost:5000'

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: 5173,
      proxy: {
        '/auth':    { target, changeOrigin: true },
        '/message': { target, changeOrigin: true },
        '/users':   { target, changeOrigin: true },
      },
    },
  }
})