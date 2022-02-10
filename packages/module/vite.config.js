/* eslint-env node */

import {chrome} from '../../.electron-vendors.cache.json';
import {resolve} from 'path';
import {builtinModules} from 'module';
import vue from '@vitejs/plugin-vue';

export function genConfig(PACKAGE_ROOT) {
  return {
    mode: process.env.MODE,
    root: PACKAGE_ROOT,
    resolve: {
      alias: {
        '/@/': PACKAGE_ROOT + '/',
      },
    },
    plugins: [vue()],
    base: '',
    server: {
      fs: {
        strict: true,
      },
    },
    build: {
      sourcemap: true,
      target: `chrome${chrome}`,
      outDir: './',
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
            dir: resolve(PACKAGE_ROOT, './'),
          },
          {
            entryFileNames: ({ name }) => `${name}.cjs`,
            format: 'commonjs',
            exports: 'named',
            dir: resolve(PACKAGE_ROOT, './'),
          },
        ],
        external: [
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
