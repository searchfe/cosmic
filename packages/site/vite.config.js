/* eslint-env node */

import {chrome} from '../../.electron-vendors.cache.json';
import {join, resolve} from 'path';
import {builtinModules} from 'module';
import vue from '@vitejs/plugin-vue';
import { cStyle } from 'cosmic-vue/plugin';
import { importMaps } from 'vite-plugin-import-maps';

const PACKAGE_ROOT = __dirname;
const APP_ROOT = process.env.MODE === 'production' ? '../../../' : `/@fs/${resolve(PACKAGE_ROOT, '../../')}/`;

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
const config = {
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  resolve: {
    alias: {
      '/@/': join(PACKAGE_ROOT, 'src') + '/',
      '@cosmic/core': join(PACKAGE_ROOT, '../core/dist'),
      '@cosmic-module/': join(PACKAGE_ROOT, '../module') + '/',
    },
  },
  plugins: [cStyle(),importMaps([{
      imports: {
        '@cosmic/core/browser':  APP_ROOT + 'packages/core/dist/browser.mjs',
        '@cosmic-module/core': APP_ROOT + 'packages/module/core/dist/index.mjs',
        'vue': APP_ROOT + 'node_modules/vue/dist/vue.runtime.esm-browser.prod.js',
      },
    }]), vue(), 
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
    outDir: 'dist',
    assetsDir: '.',
    rollupOptions: {
      input: 'index.html',
      external: [
        'vue',
        '@cosmic/core',
        '@cosmic/core/browser',
        '@cosmic-module/core',
        ...builtinModules.flatMap(p => [p, `node:${p}`]),
      ],
    },
    emptyOutDir: true,
    brotliSize: false,
  },
  test: {
    environment: 'happy-dom',
  },
};

export default config;
