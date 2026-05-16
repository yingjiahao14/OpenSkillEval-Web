import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        apps: path.resolve(__dirname, 'apps-build.html'),
        storefronts: path.resolve(__dirname, 'storefronts.html'),
        agents: path.resolve(__dirname, 'agents.html'),
        support: path.resolve(__dirname, 'support.html'),
      },
    },
  },
})
