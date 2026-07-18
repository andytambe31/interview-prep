import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves a project site under /<repo>/, so the base must match.
// Locally (dev) the base is '/'.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/interview-prep/' : '/',
  plugins: [react()],
}))
