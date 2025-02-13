import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgr from 'vite-plugin-svgr'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools(), svgr()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // Resolve the @stackit/icons package (e.g., for iconList)
      '@stackit/icons': path.resolve(__dirname, '../icon-library'),
      // Resolve the icons folder for specific icon imports
      '@stackit/icons/assets/icons': path.resolve(__dirname, '../icon-library/assets/icons'),
    },
  },
})
