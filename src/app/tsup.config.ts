import type { Options } from 'tsup'

const config: Options = {
  format: ['cjs'],
  entryPoints: ['index.ts'],
  target: 'es2019',
  external: ['electron', 'electron-builder']
}

export default config
