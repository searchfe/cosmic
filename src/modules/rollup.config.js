import livereload from 'rollup-plugin-livereload';
import replace from '@rollup/plugin-replace';
import sveltePlugins from '../../scripts/rollup/svelte';
import smeltePlugins from '../../scripts/rollup/smelte';
import internals from '../../scripts/rollup/internals';
import externals from '../../scripts/rollup/externals';

const production = !process.env.ROLLUP_WATCH;

/**
 * @param {string} mod
 * @returns
 */
function defineConfig(mod) {
  return {
    input: `${mod}/index.ts`,
    output: {
      sourcemap: true,
      format: 'es',
      file: `dist/${mod}/index.js`,
    },
    external: [...internals, ...externals],
    plugins: [
      ...sveltePlugins,
      ...smeltePlugins,
      replace({
        'process.env.NODE_ENV': JSON.stringify(production ? 'production' : ''),
      }),
      !production && livereload(`dist/${mod}`),
    ],
    watch: {
      clearScreen: false,
    },
  };
}

export default [
  'draw-canvas/skia-wasm',
  'menu-group',
  'property-panel',
  'resource-explorer',
  'shape-canvas',
  'workbench',
].map(defineConfig);
