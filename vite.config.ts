import { fileURLToPath, URL } from 'node:url'
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import UnoCSS from 'unocss/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import autoprefixer from "autoprefixer"
// https://vitejs.dev/config/
export default defineConfig({
  base: "/mughome/",
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
        AntDesignVueResolver({
          importStyle: false,
        }),
      ],
    })
  ],
  server: {
    host: true
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer(),

      ]
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

})
