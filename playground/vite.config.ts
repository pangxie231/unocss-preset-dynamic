import Vue from '@vitejs/plugin-vue'
import path from 'path'
import UnoCSS from 'unocss/vite'
import { type AliasOptions, defineConfig } from 'vite'
export const alias = {
  '@': path.resolve(__dirname, 'src')
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [Vue(), UnoCSS()],
  resolve: {
    alias
  }
})
