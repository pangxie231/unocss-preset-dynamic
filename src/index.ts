import { definePreset } from '@unocss/core'
import { imageSize } from 'image-size'
import { existsSync, readFileSync, statSync } from 'node:fs';
export interface StarterOptions {
  alias?: { [k: string]: string }
}

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// eslint-disable-next-line node/prefer-global/process
const isNode = typeof process !== 'undefined' && process.stdout && !process.versions.deno
// eslint-disable-next-line node/prefer-global/process
const isVSCode = isNode && !!process.env.VSCODE_CWD



// function findAssetsDirDown(dir: string): string | null {
//   // 检查当前目录下是否存在 "assets" 文件夹
//   const candidate = path.join(dir, 'assets');
//   if (existsSync(candidate) && statSync(candidate).isDirectory()) {
//     return candidate;
//   }
//   // 读取当前目录下的所有条目，过滤掉 "node_modules"
//   const entries = readdirSync(dir);
//   for (const entry of entries) {
//     if (entry === 'node_modules') continue; // 忽略 node_modules
//     const fullPath = path.join(dir, entry);
//     if (statSync(fullPath).isDirectory()) {
//       const found = findAssetsDirDown(fullPath);
//       if (found) return found;
//     }
//   }
//   return null;
// }
// const imageSizes = new Map();

// // 递归assets，找到所有的 .png
// function findAllImg(dir: string, imgs: string[]) {

//   if (dir && statSync(dir).isDirectory()) {
//     const files = readdirSync(dir)
//     for (const file of files) {
//       if (statSync(path.join(dir, file)).isDirectory()) {
//         findAllImg(path.join(dir, file), imgs)
//       } else {
//         // console.log('🚀 ~ findAllImg ~ path.extname(file):', path.extname(file))
//         if (/\.(jpg|png|gif)$/.test(file)) {
//           imgs.push(path.join(dir, file))
//         }
//       }

//     }
//   }

//   return imgs
// }

// if (!isVSCode) {
//   const assetsDir = findAssetsDirDown(process.cwd());
//   const imgs = findAllImg(assetsDir!, [])

//   // console.log('🚀 ~ imgs:', imgs)

//   for (const filePath of imgs) {
//     if (filePath && existsSync(filePath)) {
//       const buffer = readFileSync(filePath)
//       imageSizes.set(filePath.replace(/\\/g, '/'), imageSize(buffer))
//     }
//   }
// }

// 扩展类型
export interface DynamicAttributes {
  'bg-dynamic'?: string
  'size-dynamic'?: string
}


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
          const [fullMatch, _, imgPath] = args[0]
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
          }

          let imgPath2: string = ''
          Object.entries(_options.alias || {}).some(([k, v]) => {
            if (imgPath.startsWith(k)) {
              imgPath2 = imgPath.replace(k, v)
              return true
            }
          })
          if(imgPath2 && existsSync(imgPath2)) {
            const buffer = readFileSync(imgPath2)
            const { width, height } = imageSize(buffer)
            if (isBgDynamic) {
              return {
                width: `${width}px`,
                height: `${height}px`,
                'background-image': `url(${imgPath})`,
                'background-size': `${width}px ${height}px`
              }
            } else if (isSizeDynamic) {
              return {
                width: `${width}px`,
                height: `${height}px`,
              }
            }
          } else {
            console.error('未找到图片路径', imgPath2)
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
