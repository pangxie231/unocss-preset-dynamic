import { definePreset } from '@unocss/core'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import sizeOf from 'image-size'
export interface StarterOptions {
  alias?: {[k:string]: string}
}

// 扩展类型
export interface DynamicAttributes {
  'bg-dynamic'?: string
}

const getImageAsUint8Array = (imgPath: string): Uint8Array => {
  // 解析图片路径
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const resolvedPath = path.resolve(__dirname, imgPath)

  // 读取图片文件内容并转换为 Uint8Array
  const buffer = fs.readFileSync(resolvedPath)

  // 将 Buffer 转换为 Uint8Array
  const uint8Array = new Uint8Array(buffer)

  return uint8Array
}

export const presetDynamic = definePreset((_options: StarterOptions = {}) => {
  const { alias = {} } = _options

  return {
    name: 'unocss-preset-starter',

    theme: {
      // Customize your theme here
    },

    // Customize your preset here
    rules: [
      [
        /^bg-dynamic-(.+)$/,
        ([_, imgPath]) => {
          let imgPath2: string = ''
          Object.entries(alias).some(([k, v])=> {
            if(imgPath.startsWith(k)) {
              imgPath2 = path.resolve(imgPath.replace(k,v))
              return true
            }
          })
           
          const unit8 = getImageAsUint8Array(imgPath2)
          try {
            const { width, height } = sizeOf(unit8)
            return {
              width: `${width}px`,
              height: `${height}px`,
              'background-image': `url(${imgPath})`,
              'background-size': `${width}px ${height}px`
            }
          } catch (error) {
            console.error(`Failed to process image: ${imgPath2}`, error);
            return {}
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
