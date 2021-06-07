import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import smelte from 'smelte/rollup-plugin-smelte';
import copy from 'rollup-plugin-copy';
const tailwindConfig = require('./tailwind.config');

const production = !process.env.ROLLUP_WATCH;

// function serve() {
//   let server;

//   function toExit() {
//     if (server) server.kill(0);
//   }

//   return {
//     writeBundle() {
//       if (server) return;
//       server = require("child_process").spawn("npm", ["run", "start:frontend"], {
//         stdio: ["ignore", "inherit", "inherit"],
//         shell: true,
//       });

//       process.on("SIGTERM", toExit);
//       process.on("exit", toExit);
//     },
//   };
// }

export default {
  input: 'src/workbench/desktop/main.ts',
  output: {
    sourcemap: !production,
    format: 'iife',
    name: 'fluide',
    file: 'dist/workbench/desktop/main.js',
  },
  plugins: [
    copy({
      targets: [
        { src: 'src/public/**/*', dest: 'dist/workbench/desktop' },
      ],
    }),
    svelte({
      preprocess: sveltePreprocess(),
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      },
    }),
		smelte({
			purge: production,
			output: 'dist/workbench/desktop/assets/global.css', // it defaults to static/global.css which is probably what you expect in Sapper
			postcss: [], // Your PostCSS plugins
			whitelist: [], // Array of classnames whitelisted from purging
			whitelistPatterns: [], // Same as above, but list of regexes
			tailwind: tailwindConfig, // Any other props will be applied on top of default Smelte tailwind.config.js
		}),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({
      output: 'assets/main.css',
      mangle: production ? true : false,
      compress: production ? true : false,
    }),

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

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production &&
      serve({
        host: 'localhost',
        port: 5000,
        contentBase: 'dist/workbench/desktop',
        // verbose: true,
      }),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production &&
      livereload({
        watch: 'dist/workbench/desktop',
        // verbose: true,
      }),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production &&
      terser({
        compress: true,
        mangle: true,
      }),
  ],
  watch: {
    clearScreen: false,
  },
};
