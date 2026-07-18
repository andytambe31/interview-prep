import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves a project site under /<repo>/, so the base must match.
// Locally (dev) the base is '/'. The build output (dist/) is published by the
// GitHub Actions workflow — nothing is committed to the repo.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/interview-prep/' : '/',
  plugins: [react()],
}))
