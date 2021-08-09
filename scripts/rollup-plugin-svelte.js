import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import { syncFile } from './rollup-plugin-sync';

// import css from 'rollup-plugin-css-only';
// import alias from '@rollup/plugin-alias';
// import svg from 'rollup-plugin-svg-import';

import smelte from './rollup-plugin-smelte.js';

const tailwindConfig = require('./tailwind.config');

const production = !process.env.ROLLUP_WATCH;

export function pluginsOptions(path, separateCss) {
  return [
    syncFile(`src/${path}`, `dist/${path}`),
    svelte({
      preprocess: sveltePreprocess({
        sass: true,
      }),
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
        accessors: true,
      },
    }),
    smelte({
      purge: production,
      output: `dist/${path}/index.css`, // it defaults to static/global.css which is probably what you expect in Sapper
      inject: true,
      postcss: [], // Your PostCSS plugins
      whitelist: [], // Array of classnames whitelisted from purging
      whitelistPatterns: [], // Same as above, but list of regexes
      tailwind: tailwindConfig, // Any other props will be applied on top of default Smelte tailwind.config.js
    }),
    // we'll extract any component CSS out into
    // a separate file - better for performance

    // separateCss && css({
    //   output: 'main.css',
    //   mangle: production ? true : false,
    //   compress: production ? true : false,
    // }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    commonjs({}),
    typescript({
      tsconfig: production ? './tsconfig.svelte.prod.json' : './tsconfig.svelte.json',
      sourceMap: !production,
      inlineSources: !production,
    }),
    json(),
  ];
}
