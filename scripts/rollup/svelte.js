import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';

const production = !process.env.ROLLUP_WATCH;

export default [
  svelte({
    preprocess: sveltePreprocess({ sourceMap: !production }),
    compilerOptions: { dev: !production, accessors: true }
  }),
  replace({
    'outros.c.push': 'if (outros === undefined) { block.o(local); return }\noutros.c.push'
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
