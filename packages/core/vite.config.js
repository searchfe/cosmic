/* eslint-env node */

import { chrome } from '../../.electron-vendors.cache.json';
import { writeFileSync, ensureDirSync } from 'fs-extra';
import { join, resolve } from 'path';
import { builtinModules } from 'module';
import vue from '@vitejs/plugin-vue';


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

function output(subfix) {
    // facadeModuleId
    return ({ name }) => {
        ensureDirSync('./dist/');
        writeFileSync(`./dist/${name}.d.ts`, `export * from "../${name}/index"`);
        return `${name}.${subfix}`;
    };
}

export default config;
