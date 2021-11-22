import type { Options } from 'tsup'

const config: Options = {
  format: ['esm'],
  entryPoints: [
    // 'draw-canvas/skia-wasm/index.ts',
    // 'menu-group/index.ts',
    // 'property-panel',
    // 'resource-explorer',
    // 'shape-canvas',
    // 'workbench/index.ts'
  ],
  target: 'es2019',
  sourcemap: 'external'
}

export default config
