/* eslint-env node */

import { chrome } from '../../.electron-vendors.cache.json';
import { writeFileSync, ensureDirSync } from 'fs-extra';
import { join, resolve } from 'path';
import { builtinModules } from 'module';
import vue from '@vitejs/plugin-vue';

import { cosmicCollectionFactory } from 'cosmic-icon';
import IconsResolver from 'unplugin-icons/resolver';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';

const PACKAGE_ROOT = __dirname;


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
            '@cosmic-module/': join(PACKAGE_ROOT, '../module') + '/',
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
        outDir: 'dist',
        cssCodeSplit: true,
        lib: {
            entry: resolve(__dirname, './index.ts'),
            name: 'index',
        },
        assetsDir: '.',
        rollupOptions: {
            input: {
                browser: resolve(__dirname, 'browser/index.ts'),
                parts: resolve(__dirname, 'parts/index.ts'),
                inversify: resolve(__dirname, './inversify.ts'),
                rxjs: resolve(__dirname, './rxjs.ts'),
                urql: resolve(__dirname, './urql.ts'),
                gql: resolve(__dirname, './gql.ts'),
                router: resolve(__dirname, './router.ts'),
            },
            output: [
                {
                    entryFileNames: output('mjs'),
                    format: 'esm',
                    dir: resolve(__dirname, 'dist/es'),
                },
                {
                    entryFileNames: output('cjs'),
                    format: 'commonjs',
                    exports: 'named',
                    dir: resolve(__dirname, 'dist/cjs'),
                },
            ],
            external: [
                'vue',
                'cosmic-vue',
                'cosmic-ui',
                '@cosmic/core/parts',
                '@cosmic/core/browser',
                '@cosmic/core/inversify',
                '@cosmic/core/rxjs',
                '@cosmic/core/urql',
                '@cosmic/core/gql',
                '@cosmic/core/router',
                '@cosmic-module/core',
                '@cosmic-module/san-loader',
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

function output(subfix) {
    // facadeModuleId
    return ({ name }) => {
        ensureDirSync('./dist/');
        writeFileSync(`./dist/${name}.d.ts`, `export * from "../${name}/index"`);
        return `${name}.${subfix}`;
    };
}

export default config;
