# unocss-preset-starter [![npm](https://img.shields.io/npm/v/unocss-preset-dynamic)](https://www.npmjs.com/package/unocss-preset-dynamic)

根据图片路径自动生成宽高和background-size

## Features
- 🔥 根据动态生成width和heigth
- 🔥 结合presetAttributify获得良好的智能提示


## Usage
```shell
npm i -D unocss-preset-dynamic
```

```ts
// uno.config.ts
import { defineConfig, presetAttributify } from 'unocss'
import { presetDynamic } from 'unocss-preset-dynamic'
import { aliases } from './playground/vite.config'

export default defineConfig({
  presets: [
    // @ts-ignore
    presetDynamic({
      // 为了识别vite中配置的别名
      // 最好传入该属性
      alias: aliases,
    }),
    presetAttributify()
  ],
})
```

```ts
// vite.config.ts
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url'
import UnoCSS from 'unocss/vite'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 导出给unocss-preset-dynamic使用
export const aliases = {
  '@': path.resolve(__dirname, 'src')
}
// https://vite.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom',
  },
  plugins: [
    vue(), 
    UnoCSS(),
  ],
  resolve: {
    alias: aliases
  },
})
```
如果需要获得良好的代码提示，还需要检查是否配置了tsconfig.json(jsconfig.json)

```json
// tsconfig.json 
// or jsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

如果需要获得良好的代码提示,还需要添加类型扩展文件
在src下新建global.d.ts

```ts
import type { AttributifyAttributes } from '@unocss/preset-attributify'
import type { DynamicAttributes } from 'unocss-preset-dynamic'

declare module '@vue/runtime-dom' {
  interface HTMLAttributes extends AttributifyAttributes, DynamicAttributes {
    // other
  }
}
```


## License

[MIT](./LICENSE) License © 2023 [pangxie231](https://github.com/pangxie231)
