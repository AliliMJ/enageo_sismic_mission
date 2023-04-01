import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      assets: fileURLToPath(new URL('./src/assets', import.meta.url)),
      database: fileURLToPath(new URL('./src/database', import.meta.url)),
      router: fileURLToPath(new URL('./src/router', import.meta.url)),
      app: fileURLToPath(new URL('./src/components/app', import.meta.url)),
      common: fileURLToPath(
        new URL('./src/components/common', import.meta.url)
      ),
      element: fileURLToPath(
        new URL('./src/components/element', import.meta.url)
      ),
      components: fileURLToPath(new URL('./src/components', import.meta.url)),
      stores: fileURLToPath(new URL('./src/stores', import.meta.url)),
      utils: fileURLToPath(new URL('./src/utils', import.meta.url)),
      config: fileURLToPath(new URL('./src/config', import.meta.url)),
      composables: fileURLToPath(new URL('./src/composables', import.meta.url)),
      licensing: fileURLToPath(new URL('./src/licensing', import.meta.url)),
    },
  },
  plugins: [vue()],
});
