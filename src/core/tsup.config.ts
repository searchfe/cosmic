import type { Options } from 'tsup'

const config: Options = {
  format: ['esm'],
  entryPoints: [
    // 'browser/index.ts',
    // 'common/index.ts',
    // 'components/index.ts',
    // 'parts/index.ts',
  ],
  target: 'es2019',
  sourcemap: 'external'
}

export default config
