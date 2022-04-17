/* eslint-env node */

import {chrome} from '../../.electron-vendors.cache.json';
import {resolve, join} from 'path';
import {builtinModules} from 'module';
import { readdirSync, statSync } from 'fs-extra';
import vue from '@vitejs/plugin-vue';

import { cosmicCollectionFactory } from 'cosmic-icon';
import IconsResolver from 'unplugin-icons/resolver';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';

export function genConfig(PACKAGE_ROOT) {
  return {
    mode: process.env.MODE,
    root: PACKAGE_ROOT,
    resolve: {
      alias: {
        '@cosmic/core': join(PACKAGE_ROOT, '../../core/dist'),
        '@cosmic-module/': join(PACKAGE_ROOT, '../') + '/',
        'cosmic-ui': 'cosmic-ui-alpha',
      },
    },
    plugins: [
      vue(),
      Icons({
          compiler: 'vue3',
          scale: 1,
          customCollections: {
              ...cosmicCollectionFactory(),
          },
      }),
      Components({
          dts: true,
          resolvers: [
              IconsResolver({
                  customCollections: ['cosmic'],
              }),
          ],
      }),
    ],
    base: '',
    server: {
      fs: {
        strict: true,
      },
    },
    build: {
      sourcemap: true,
      target: `chrome${chrome}`,
      cssCodeSplit: true,
      outDir: './dist',
      lib: {
          entry: resolve(PACKAGE_ROOT, './index.ts'),
          name: 'index',
          fileName: 'index',
      },
      assetsDir: '.',
      rollupOptions: {
        output: [
          {
            entryFileNames: ({ name }) => `${name}.mjs`,
            format: 'esm',
            dir: resolve(PACKAGE_ROOT, './dist'),
          },
          {
            entryFileNames: ({ name }) => `${name}.cjs`,
            format: 'commonjs',
            exports: 'named',
            dir: resolve(PACKAGE_ROOT, './dist'),
          },
        ],
        external: [
          'vue',
          'cosmic-vue',
          'cosmic-ui',
          '@cosmic/core/browser',
          '@cosmic/core/parts',
          '@cosmic/core/inversify',
          '@cosmic/core/rxjs',
          '@cosmic/core/urql',
          '@cosmic/core/gql',
          '@cosmic/core/router',
          ...listOfModule().map(m => `@cosmic-module/${m}`),
          ...builtinModules.flatMap(p => [p, `node:${p}`]),
        ],
      },
      emptyOutDir: false,
      brotliSize: false,
    },
    test: {
      environment: 'happy-dom',
    },
  };
}
export default genConfig(process.cwd());


// list.map(dir => resolve(ROOT, dir)).filter(dir => statSync(dir).isDirectory()).map(dir => {
//   const output = execSync(`cd ${dir} && pnpm run build`, {
//       encoding: 'utf-8',
//   });
//   console.log(output.toString());
// });

export function listOfModule() {
  const list = readdirSync(resolve(__dirname, '../module')).filter(dir => statSync(resolve(__dirname, dir)).isDirectory());
  return list;
}
