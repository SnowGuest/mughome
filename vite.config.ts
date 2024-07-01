import { fileURLToPath, URL } from 'node:url'
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import UnoCSS from 'unocss/vite'
import {
  AntDesignVueResolver,
} from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    UnoCSS(),
    AutoImport({
      dts: "./types/auto-imports.d.ts",
      imports: [
        'vue',
        'vue-router',
      ]
    }),
    Components({
      dts: "./types/components.d.ts",
      resolvers: [
        AntDesignVueResolver(),
      ],
    })
  ],
  server: {
    host: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
