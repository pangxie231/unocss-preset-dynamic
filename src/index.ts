import { definePreset } from '@unocss/core'
import path from 'path'
import fs from "fs";
import { imageSize } from 'image-size'
import { existsSync, readFileSync } from 'node:fs';
export interface StarterOptions {
  alias?: {[k:string]: string}
}

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


function findAssetsDirDown(dir: string): string | null {
  // 检查当前目录下是否存在 "assets" 文件夹
  const candidate = path.join(dir, 'assets');
  if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
    return candidate;
  }
  
  // 读取当前目录下的所有条目，过滤掉 "node_modules"
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    if (entry === 'node_modules') continue; // 忽略 node_modules
    const fullPath = path.join(dir, entry);
    if (fs.statSync(fullPath).isDirectory()) {
      const found = findAssetsDirDown(fullPath);
      if (found) return found;
    }
  }
  return null;
}

const assetsDir = findAssetsDirDown(process.cwd());

const imageSizes = new Map();


const files = fs.readdirSync(assetsDir!)
for(const file of files) {
  const filePath = path.join(assetsDir!, file)
  
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
