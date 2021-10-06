import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import { configs as externalConfig, externals, importmap as externalMap } from './scripts/rollup-external.config';
import { configs as internalConfig, internals, importmap as internalMap } from './scripts/rollup-internal.config';
import { configs as moduleConfig, modules, importmap as moduleMap } from './scripts/rollup-module.config';
import {
  configs as packSmelteConfig,
  importMap as smelteMap,
  smelteExtractConfig,
} from './scripts/rollup-smelte-extract.config';
import { pluginsOptions } from './scripts/rollup-plugin-svelte';
import { syncFile } from './scripts/rollup-plugin-sync';
import { jsonFiles, importmap as jsonMap, jsonSync } from './scripts/rollup-json.config';
import { importDeclarationExtractPlugin } from './scripts/rollup-plugin-import-extract';

const production = !process.env.ROLLUP_WATCH;

export default [
  ...externalConfig(),
  ...internalConfig(),
  ...moduleConfig(),
  {
    input: 'src/workbench/desktop/main.ts',
    output: {
      sourcemap: !production,
      format: 'es',
      name: 'fluide',
      file: 'dist/workbench/desktop/main.js',
    },
    external: [...externals, ...internals, ...modules, ...jsonFiles, smelteExtractConfig.packedName],
    plugins: [
      syncFile('src/public', 'dist/workbench/desktop', { html: true, ico: true, js: true }, (src, dest, text) => {
        if (src !== 'src/public/index.html') return;
        const data = {
          imports: {
            ...externalMap().imports,
            ...internalMap().imports,
            ...moduleMap().imports,
            ...jsonMap().imports,
            ...smelteMap().imports,
          },
        };
        return text.toString().replace('__importmap_config__', JSON.stringify(data, null, ''));
      }),
      jsonSync,
      ...pluginsOptions('workbench/desktop', true),
      production && importDeclarationExtractPlugin(smelteExtractConfig),
      // In dev mode, call `npm run start` once
      // the bundle has been generated
      !production &&
        serve({
          host: 'localhost',
          port: 5000,
          contentBase: 'dist/',
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
  },
  ...packSmelteConfig(),
];
