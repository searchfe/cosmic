import livereload from 'rollup-plugin-livereload';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import _serve from 'rollup-plugin-serve';
import sveltePlugins from '../../scripts/rollup/svelte';
import smeltePlugins from '../../scripts/rollup/smelte';
import internals from '../../scripts/rollup/internals';
import externals from '../../scripts/rollup/externals';

const production = !process.env.ROLLUP_WATCH;

function serve() {
  return _serve({ contentBase: '.', port: 5000 });
}

export default [
  ...externals.map(i => ({
    input: `externals/${i}.js`,
    output: {
      sourcemap: !production,
      format: 'es',
      file: `dist/externals/${i}.js`
    },
    plugins: [
      resolve({ browser: true }),
      commonjs(),
    ],
  })),
  {
    input: 'index.ts',
    output: {
      sourcemap: !production,
      format: 'es',
      file: 'dist/index.js'
    },
    external: [...internals],
    plugins: [
      ...sveltePlugins,
      ...smeltePlugins,
      !production && serve(),
      !production && livereload('dist'),
    ],
    watch: {
      clearScreen: false
    }
  }
];
