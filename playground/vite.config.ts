import Vue from '@vitejs/plugin-vue'
import path from 'path'
import UnoCSS from 'unocss/vite'
import { type AliasOptions, defineConfig } from 'vite'

const aliases: AliasOptions = {
  '@': path.resolve(__dirname, 'src/assets')
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [Vue(), UnoCSS()],
  // resolve: {
  //   alias: aliases
  // }
})
