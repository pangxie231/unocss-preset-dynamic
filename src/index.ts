import { definePreset } from '@unocss/core'
import path from 'path'
import { imageSize } from 'image-size'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
export interface StarterOptions {
  alias?: { [k: string]: string }
}

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


function findAssetsDirDown(dir: string): string | null {
  // 检查当前目录下是否存在 "assets" 文件夹
  const candidate = path.join(dir, 'assets');
  if (existsSync(candidate) && statSync(candidate).isDirectory()) {
    return candidate;
  }
  // 读取当前目录下的所有条目，过滤掉 "node_modules"
  const entries = readdirSync(dir);
  for (const entry of entries) {
    if (entry === 'node_modules') continue; // 忽略 node_modules
    const fullPath = path.join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      const found = findAssetsDirDown(fullPath);
      if (found) return found;
    }
  }
  return null;
}

const assetsDir = findAssetsDirDown(process.cwd());

const imageSizes = new Map();

if (assetsDir && statSync(assetsDir!).isDirectory()) {
  const files = readdirSync(assetsDir!)

  for (const file of files) {
    const filePath = path.join(assetsDir!, file)

    if (filePath && existsSync(filePath)) {
      const buffer = readFileSync(filePath)
      imageSizes.set(filePath.replace(/\\/g, '/'), imageSize(buffer))
    }
  }
}
console.log("🚀 ~ imageSizes:", imageSizes)


// 扩展类型
export interface DynamicAttributes {
  'bg-dynamic'?: string
  'size-dynamic'?: string
}

// eslint-disable-next-line node/prefer-global/process
const isNode = typeof process !== 'undefined' && process.stdout && !process.versions.deno
// eslint-disable-next-line node/prefer-global/process
const isVSCode = isNode && !!process.env.VSCODE_CWD

const bgDynamicRE = /^bg-dynamic-(.+)$/
const sizeDynamicRE = /^size-dynamic-(.+)$/

export const presetDynamic = definePreset((_options: StarterOptions = {}) => {

  return {
    name: 'unocss-preset-dynamic',

    theme: {
      // Customize your theme here
    },

    // Customize your preset here
    rules: [
      [
        /^(bg|size)-dynamic-(.+)$/,
        (...args) => {

        // console.log('🚀 ~ presetDynamic ~ imgPath:', args)
        const [fullMatch, _, imgPath] = args[0]


          let imgPath2: string = ''
          Object.entries(_options.alias || {}).some(([k, v]) => {
            if (imgPath.startsWith(k)) {
              imgPath2 = imgPath.replace(k, v).replace(/\\/g, '/')
              return true
            }
          })

          const isBgDynamic = bgDynamicRE.test(fullMatch)
          const isSizeDynamic = sizeDynamicRE.test(fullMatch)
          if (isVSCode) {
            if (isBgDynamic) {
              return {
                width: '[dynamic-width]px',
                height: '[dynamic-height]px',
                'background-image': 'url(imgPath)',
                'background-size': '[dynamic-width]px [dynamic-height]px',
              }
            } else if (isSizeDynamic) {
              return {
                width: '[dynamic-width]px',
                height: '[dynamic-height]px',
              }
            }
          } else {
            const { width, height } = imageSizes.get(imgPath2)
            if (isBgDynamic) {
              return {
                width: `${width}px`,
                height: `${height}px`,
                'background-image': `url(${imgPath})`,
                'background-size': `${width}px ${height}px`
              }
            } else if (sizeDynamicRe) {
              return {
                width: `${width}px`,
                height: `${height}px`,
              }
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
