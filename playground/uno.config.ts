import { defineConfig, presetUno, presetAttributify } from 'unocss'
import { presetDynamic } from '../src'
import { fileURLToPath } from 'url'
import path from 'path'
// import { alias } from './vite.config'

// Just for Vscode Extension
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const alias = {
  '@': path.resolve(__dirname, 'src')
}
export default defineConfig({
  presets: [
    presetUno(),
    presetDynamic({
      alias
    }),
    presetAttributify(),
  ],
})
