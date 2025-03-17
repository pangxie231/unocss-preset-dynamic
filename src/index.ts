import { definePreset } from '@unocss/core'
import path from 'path'
import fs from "fs";
import { fileURLToPath } from 'url'
import { imageSize } from 'image-size'
import { readFile } from 'node:fs/promises'
import { existsSync, readFileSync } from 'node:fs';
export interface StarterOptions {
  alias?: {[k:string]: string}
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 ~ __dirname:', __dirname)

const imageSizes = new Map();
// const imgDir = path.resolve(__dirname, "./images");

// const buffer = await readFile(imgPath2)
// const { width, height } = imageSize(buffer)
const files = fs.readdirSync(path.resolve(__dirname, '../playground/src/assets'))
for(const file of files) {
  const filePath = path.join(path.resolve(__dirname, '../playground/src/assets'), file)
  
  if(existsSync(filePath)) {
    const buffer = readFileSync(filePath)
    imageSizes.set(filePath.replace(/\\/g, '/'), imageSize(buffer))
  }
}
console.log('🚀 ~ imageSizes:', imageSizes)

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
        ([_, imgPath]) => {

         
        let imgPath2: string = ''
        Object.entries(_options.alias || {}).some(([k, v])=> {
          if(imgPath.startsWith(k)) {
            imgPath2 = imgPath.replace(k,v).replace(/\\/g, '/')
            return true
          }
        })
          if(imageSizes.has(imgPath2)) {
            // imageSizes.has(imgPath2)


            const { width, height } = imageSizes.get(imgPath2)
  
            return {
              width: `${width}px`,
              height: `${height}px`,
              'background-image': `url(${imgPath})`,
              'background-size': `${width}px ${height}px`
            }
          } else {
            return {
              '--null': 'vscode下无法查看，但是不影响功能'
            }
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
