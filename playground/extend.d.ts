import type { AttributifyAttributes } from '@unocss/preset-attributify'
import type { DynamicAttributes } from '../src'

declare module '@vue/runtime-dom' {
  interface HTMLAttributes extends AttributifyAttributes, DynamicAttributes {
  }
}