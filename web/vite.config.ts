import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Same-origin in production, proxied in development — so the frontend code
    // never knows the difference and there is no CORS to configure.
    proxy: { '/api': 'http://localhost:8010' },
  },
})
