/* eslint-env node */
import { listOfModule } from '../module/vite.config';
import {chrome} from '../../.electron-vendors.cache.json';
import {join, resolve, sep} from 'path';
import {builtinModules} from 'module';
import vue from '@vitejs/plugin-vue';
import { importMaps } from 'vite-plugin-import-maps';
import { sync } from 'resolve';

const development = process.env.MODE === 'development';
const PACKAGE_ROOT = __dirname;
const APP_ROOT = development ? `/@fs/${resolve(PACKAGE_ROOT, '../../')}/` : '../../../';

function resolveLib(pkg) {
  const libPath = sync(pkg);
  return APP_ROOT + libPath.replace(resolve(PACKAGE_ROOT, '../../') + sep, '');
}

function moduleImports() {
  const imps = {};
  listOfModule().forEach(m => {
    imps[`@cosmic-module/${m}`] = `${APP_ROOT}packages/module/${m}/dist/index.mjs`;
  });
  return imps;
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
      '@cosmic/core/browser': join(PACKAGE_ROOT, '../core/dist/es'),
      '@cosmic/core/parts': join(PACKAGE_ROOT, '../core/dist/es'),
      '@cosmic/core/rxjs':  join(PACKAGE_ROOT, 'packages/core/dist/es'),
      '@cosmic/core/urql':  join(PACKAGE_ROOT, 'packages/core/dist/es'),
      '@cosmic/core/gql':  join(PACKAGE_ROOT, 'packages/core/dist/es'),
      '@cosmic/core/router':  join(PACKAGE_ROOT, 'packages/core/dist/es'),
      '@cosmic/core/inversify':  join(PACKAGE_ROOT, 'packages/core/dist/es'),
      '@cosmic/core/lodash':  join(PACKAGE_ROOT, 'packages/core/dist/es'),
      '@cosmic/core': join(PACKAGE_ROOT, '../core/dist'),
      'cosmic-ui': 'cosmic-ui-alpha',
      // '@cosmic-module/': join(PACKAGE_ROOT, '../module') + '/',
    },
  },
  plugins: [importMaps([{
      imports: {
        '@cosmic/core/browser':  APP_ROOT + 'packages/core/dist/es/browser.mjs',
        '@cosmic/core/parts':  APP_ROOT + 'packages/core/dist/es/parts.mjs',
        '@cosmic/core/rxjs':  APP_ROOT + 'packages/core/dist/es/rxjs.mjs',
        '@cosmic/core/urql':  APP_ROOT + 'packages/core/dist/es/urql.mjs',
        '@cosmic/core/gql':  APP_ROOT + 'packages/core/dist/es/gql.mjs',
        '@cosmic/core/router':  APP_ROOT + 'packages/core/dist/es/router.mjs',
        '@cosmic/core/inversify':  APP_ROOT + 'packages/core/dist/es/inversify.mjs',
        '@cosmic/core/lodash':  APP_ROOT + 'packages/core/dist/es/lodash.mjs',
        'san':  APP_ROOT + 'packages/module/renderer-san/dist/index.mjs',
        ...moduleImports(),
        ...development? {} :{
          'cosmic-ui': resolveLib('cosmic-ui-alpha/dist/index.es.js'),
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
