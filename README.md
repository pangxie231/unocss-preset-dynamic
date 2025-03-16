# unocss-preset-starter [![npm](https://www.npmjs.com/package/unocss-preset-dynamic)](https://npmjs.com/package/unocss-preset-starter)

UnoCSS preset quickstart template.

## Features
- 🔥 Description of the preset

## Usage
```shell
pnpm i -D unocss-preset-dynamic unocss
```

```ts
// uno.config.ts
import { defineConfig } from 'unocss'
import { presetStarter } from 'unocss-preset-starter'

export default defineConfig({
  presets: [
    // ...
    presetStarter(),
  ],
})
```

## License

[MIT](./LICENSE) License © 2023 [pangxie231](https://github.com/pangxie231)
