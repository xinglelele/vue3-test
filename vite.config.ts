import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // @ 对应 src 目录（__dirname 代表当前配置文件所在的根目录）
      '@': resolve(__dirname, 'src')
    }
  }
})
