import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import { configs as externalConfig, externals, importmap as externalMap } from './scripts/rollup-external.config';
import { configs as internalConfig, internals, importmap as internalMap } from './scripts/rollup-internal.config';
import { configs as moduleConfig, modules, importmap as moduleMap } from './scripts/rollup-module.config';
import { pluginsOptions } from './scripts/rollup-plugin-svelte';
import replace from '@rollup/plugin-replace';
import { syncFile } from './scripts/rollup-plugin-sync';
import { jsonFiles, importmap as jsonMap, jsonSync } from './scripts/rollup-json.config';

import { relative, join } from 'path/posix';

const production = process.env.NODE_ENV === 'production';

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
    external: [...externals, ...internals, ...modules, ...jsonFiles],
    plugins: [
      syncFile('src/public', 'dist/workbench/desktop', { html: true, ico: true, js: true }, (src, dest, text) => {
        if (src !== 'src/public/index.html') return;
        const data = {
          imports: {
            ...externalMap().imports,
            ...internalMap().imports,
            ...moduleMap().imports,
            ...jsonMap().imports,
          },
        };
        const relativePath = relative('/workbench/desktop', '/');
        for (const [k, v] of Object.entries(data.imports)) {
          data.imports[k] = join(relativePath, v);
        }
        return text
          .toString()
          .replace('__importmap_config__', JSON.stringify(data, null, ''))
          .replace('process.env.NODE_ENV', JSON.stringify(production ? 'production' : ''));
      }),
      // urql should replace process
      replace({
        'process.env.NODE_ENV': JSON.stringify(production ? 'production' : ''),
      }),
      jsonSync,
      ...pluginsOptions('workbench/desktop', true),
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
    ],
    watch: {
      clearScreen: false,
    },
  },
];
