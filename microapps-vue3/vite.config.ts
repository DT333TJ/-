/*
 * @Author: DT333TJ
 * @Date: 2022-02-03 10:25:44
 * @LastEditTime: 2022-02-04 21:44:15
 * @LastEditors: DT333TJ
 * @Description: 
 * @FilePath: \vite-project\vite.config.ts
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:{
      '@': resolve(__dirname, './src')
    }
  }
})
