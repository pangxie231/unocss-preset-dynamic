import { defineConfig, presetUno, presetAttributify } from 'unocss'
import { presetStarter } from './src'

// Just for Vscode Extension

export default defineConfig({
  presets: [
    presetUno(),
    presetStarter({
      span: 24,
    }),
    presetAttributify()
  ],
})
