import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:{
      "@": path.resolve(__dirname, "src"),
    }
  },
  server: {
    port: 3000 // 修改为你想要的端口号
  }
})
