import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",    // simulate a browser DOM in Node
    globals: true,           // no need to import describe/it/expect in every file
    setupFiles: ["./src/setup.ts"],
  },
})