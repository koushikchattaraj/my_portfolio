import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Listen on LAN so you can open http://<your-ip>:5173 from phone (same Wi‑Fi).
    host: true,
    port: 5173,
  },
  build: {
    // Hosts configured for CRA/default "build" folder (e.g. Netlify) expect this path;
    // Vite's default is dist/.
    outDir: 'build',
    chunkSizeWarningLimit: 1600,
  },
})
