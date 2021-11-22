import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';

const production = !process.env.ROLLUP_WATCH;

export default [
  svelte({
    preprocess: sveltePreprocess({ sourceMap: !production }),
    compilerOptions: { dev: !production, accessors: true }
  }),
  resolve({
    browser: true,
    dedupe: ['svelte']
  }),
  commonjs(),
  typescript({
    sourceMap: !production,
    inlineSources: !production,
    tsconfig: '../../tsconfig.json'
  }),
  production && terser()
];
