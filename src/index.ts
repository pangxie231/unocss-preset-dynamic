import { definePreset } from '@unocss/core'
import path from 'path'
import { imageSize } from 'image-size'
import { readFile } from 'node:fs/promises'
export interface StarterOptions {
  alias?: {[k:string]: string}
}

// 扩展类型
export interface DynamicAttributes {
  'bg-dynamic'?: string
}

export const presetDynamic = definePreset((_options: StarterOptions = {}) => {

  return {
    name: 'unocss-preset-dynamic',

    theme: {
      // Customize your theme here
    },

    // Customize your preset here
    rules: [
      [
        /^bg-dynamic-(.+)$/,
        async([_, imgPath]) => {
         
        let imgPath2: string = ''
        Object.entries(_options.alias || {}).some(([k, v])=> {
          if(imgPath.startsWith(k)) {
            imgPath2 = path.resolve(imgPath.replace(k,v))
            return true
          }
        })

        const buffer = await readFile(imgPath2)
          const { width, height } = imageSize(buffer)
          return {
            width: `${width}px`,
            height: `${height}px`,
            'background-image': `url(${imgPath})`,
            'background-size': `${width}px ${height}px`
          }
        },

      ],
    ],

    // Customize your variants here
    variants: [
      // ...
    ],

    // You can also define built-in presets
    presets: [
      // ...
    ],

    // You can also define built-in transformers
    transformers: [
      // ...
    ],

    // Customize AutoComplete
    autocomplete: {
      // ...
    },
  }
})
