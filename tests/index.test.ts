import { createGenerator } from 'unocss'
import { expect, it, vi } from 'vitest'
import { presetDynamic } from '../src'


vi.mock('node:fs', ()=> ({
  existsSync: vi.fn(()=> true),
  readFileSync: vi.fn(),
}))

vi.mock('image-size', ()=> ({
  imageSize: vi.fn(()=> ({
    width: 100,
    height: 100
  }))
}))

it('presetStarter', async () => {
  const uno = await createGenerator({
    presets: [presetDynamic({
      alias: {
        '@': '/src'
      }
    })],
  })
  const presets = uno.config.presets
  expect(presets).toHaveLength(1)

  const { css } = await uno.generate('bg-dynamic-@/assets/images/dog.jpg size-dynamic-@/assets/images/dog.jpg')
  console.log('css',css)

  expect(css).toMatchInlineSnapshot(`
    "/* layer: default */
    .bg-dynamic-\\@\\/assets\\/images\\/dog\\.jpg{width:100px;height:100px;background-image:url(@/assets/images/dog.jpg);background-size:100px 100px;}
    .size-dynamic-\\@\\/assets\\/images\\/dog\\.jpg{width:100px;height:100px;}"
  `)
})
