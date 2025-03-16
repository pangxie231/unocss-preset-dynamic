import { defineConfig, presetUno, presetAttributify } from 'unocss'
import { presetStarter } from './src'
import { aliases } from './playground/vite.config'

// Just for Vscode Extension

export default defineConfig({
  presets: [
    presetUno(),
    presetStarter({
      // @ts-ignore
      alias: aliases
    }),
    presetAttributify()
  ],
})
