/* eslint-env node */

import {chrome} from '../../.electron-vendors.cache.json';
import {resolve, join} from 'path';
import {builtinModules} from 'module';
import vue from '@vitejs/plugin-vue';
import { cStyle } from 'cosmic-vue/plugin';

export function genConfig(PACKAGE_ROOT) {
  return {
    mode: process.env.MODE,
    root: PACKAGE_ROOT,
    resolve: {
      alias: {
        '@cosmic/core': join(PACKAGE_ROOT, '../../core/dist'),
        '@cosmic-module/': join(PACKAGE_ROOT, '../') + '/',
      },
    },
    plugins: [cStyle(), vue()],
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
          '@cosmic/core/browser',
          '@cosmic/core/parts',
          '@cosmic-module/frame-menu-bar',
          '@cosmic-module/frame-workbench',
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
