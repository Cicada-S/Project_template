import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({ // 自动引入，不需要手动去写import
      // 这里可以不需要写import调用大部分vue/vue-router/pinia方法（记住是大部分）
      imports: ['vue', 'vue-router', 'pinia'],
      // element需要通过resolvers引用
      resolvers: [ElementPlusResolver()],
      // 会自动生成eslint规则，防止eslint报错，后续selint配置的时候会讲到
      eslintrc: {
        enabled: true
      }
    }),
    Components({ // 按需引入，避免没使用的组件也打包
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: { api: 'modern-compiler' },
    }
  },
})
