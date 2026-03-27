import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Hosts configured for CRA/default "build" folder (e.g. Netlify) expect this path;
    // Vite's default is dist/.
    outDir: 'build',
    chunkSizeWarningLimit: 1600,
  },
})
