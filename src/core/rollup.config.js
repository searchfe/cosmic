import livereload from 'rollup-plugin-livereload';
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
      file: `dist/${mod}/index.js`
    },
    external: [...internals, ...externals],
    plugins: [
      ...sveltePlugins,
      ...smeltePlugins,
      !production && livereload(`dist/${mod}`),
    ],
    watch: {
      clearScreen: false
    }
  }
};

export default [
  'browser',
  'common',
  'components',
  'parts'
].map(defineConfig)
