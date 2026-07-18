import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves a project site under /<repo>/, so the base must match.
// Locally (dev) the base is '/'.
//
// Pages is configured as "Deploy from a branch" (main → /docs), which serves
// files as-is without running a build. So we commit the build output into
// /docs. `emptyOutDir` keeps it clean on each rebuild.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/interview-prep/' : '/',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
  plugins: [react()],
}))
