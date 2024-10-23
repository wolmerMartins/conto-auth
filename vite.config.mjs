import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [svelte({ preprocess: sveltePreprocess() })],
  test: {
    globals: true,
    environment: 'jsdom',
    alias: [
      {
        find: /^svelte$/,
        replacement: 'svelte/internal'
      }
    ]
  }
})
