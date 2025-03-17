import { defineConfig, presetUno, presetAttributify } from 'unocss'
import { presetDynamic } from './src'
import { fileURLToPath } from 'url'
import path from 'path'

// Just for Vscode Extension
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default defineConfig({
  presets: [
    presetUno(),
    presetDynamic({
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }),
    presetAttributify(),
  ],
})
