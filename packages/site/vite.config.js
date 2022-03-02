/* eslint-env node */

import {chrome} from '../../.electron-vendors.cache.json';
import {join, resolve} from 'path';
import {builtinModules} from 'module';
import vue from '@vitejs/plugin-vue';
import { cStyle } from 'cosmic-vue/plugin';
import { importMaps } from 'vite-plugin-import-maps';
import { sync } from 'resolve';

const development = process.env.MODE === 'development';
const PACKAGE_ROOT = __dirname;
const APP_ROOT = development ? `/@fs/${resolve(PACKAGE_ROOT, '../../')}/` : '../../../';

function resolveLib(pkg) {
  const libPath = sync(pkg);
  return APP_ROOT + libPath.replace(resolve(PACKAGE_ROOT, '../../') + '/', '');
}
/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
const config = {
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  resolve: {
    alias: {
      // '/@/': join(PACKAGE_ROOT, 'src') + '/',
      '@cosmic/core': join(PACKAGE_ROOT, '../core/dist'),
      // '@cosmic-module/': join(PACKAGE_ROOT, '../module') + '/',
    },
  },
  plugins: [cStyle(),importMaps([{
      imports: {
        '@cosmic/core/browser':  APP_ROOT + 'packages/core/dist/browser.mjs',
        '@cosmic/core/parts':  APP_ROOT + 'packages/core/dist/parts.mjs',
        '@cosmic-module/core': APP_ROOT + 'packages/module/core/dist/index.mjs',
        '@cosmic-module/frame-menu-bar': APP_ROOT + 'packages/module/frame-menu-bar/dist/index.mjs',
        '@cosmic-module/frame-workbench': APP_ROOT + 'packages/module/frame-workbench/dist/index.mjs',
        '@cosmic-module/frame-menu-bar/': APP_ROOT + 'packages/module/frame-menu-bar/dist/',
        '@cosmic-module/frame-workbench/': APP_ROOT + 'packages/module/frame-workbench/dist/',
        ...development? {} :{ 
          'cosmic-vue': resolveLib('cosmic-vue/dist/index.es.js'),
          'vue': resolveLib('vue/dist/vue.runtime.esm-browser.prod'),
        },
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
        // 'vue',
        // '@cosmic/core',
        // '@cosmic-module/core',
        '@cosmic/core/browser',
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
