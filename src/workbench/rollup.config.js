import livereload from 'rollup-plugin-livereload';
import sveltePlugins from '../../scripts/rollup/svelte';
import smeltePlugins from '../../scripts/rollup/smelte';
import internals from '../../scripts/rollup/internals';
import externals from '../../scripts/rollup/externals';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'desktop/app.ts',
	output: {
		sourcemap: false,
		format: 'es',
		file: 'dist/index.js'
	},
  external: [...internals, ...externals],
	plugins: [
    ...sveltePlugins,
    ...smeltePlugins,
    !production && livereload('dist'),
  ],
	watch: {
		clearScreen: false
	}
};
