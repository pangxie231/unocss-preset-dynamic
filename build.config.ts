import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  clean: true,
  declaration: true,
  externals: ['unocss', 'path', 'fs', 'url', 'node:fs/promises', 'image-size'],
  rollup: {
    emitCJS: true,
  },
  failOnWarn: false
})
