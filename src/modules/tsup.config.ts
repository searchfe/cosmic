import GlobalConfig from '../../tsup.config';
import { defineConfig } from 'tsup';

export default defineConfig({
  ...GlobalConfig,
  entry: [
    'draw-canvas/skia-wasm/index.ts',
    'menu-group/index.ts',
    'property-panel/index.ts',
    'resource-explorer/index.ts',
    'shape-canvas/index.ts',
    'workbench/index.ts',
  ],
});
