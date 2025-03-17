import { defineConfig, presetUno, presetAttributify } from 'unocss'
import { presetDynamic } from './src'
import { aliases } from './playground/vite.config'

// Just for Vscode Extension

export default defineConfig({
  presets: [
    presetUno(),
    presetDynamic({
      // @ts-ignore
      alias: aliases
    }),
    presetAttributify()
  ],
})
