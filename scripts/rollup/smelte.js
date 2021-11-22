import postcssImport from 'postcss-import'
import postcssUrl from 'postcss-url'
import postcssInputRange from 'postcss-input-range'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
import cssnano from 'cssnano';
import postcssPurgeCss from '@fullhuman/postcss-purgecss';
import smelteTailwindConfig from 'smelte/tailwind.config';
const extractor = require('smelte/src/utils/css-extractor');
const postcss = require('rollup-plugin-postcss');

const production = !process.env.ROLLUP_WATCH;
const purge = production;
const defaultWhitelist = ['html', 'body', 'stroke-primary', 'mode-dark'];
const defaultWhitelistPatterns = [
  // for JS ripple
  /ripple/,
  // date picker
  /* eslint-disable no-useless-escape */
  /w\-.\/7/,
];

const plugins = [
  postcssImport(),
  postcssUrl(),
  postcssInputRange(),
  autoprefixer(),
  tailwindcss(smelteTailwindConfig(require('../../tailwind.config.cjs'))),
  // purge && cssnano({
  //   preset: 'default',
  // }),
  // purge && postcssPurgeCss({
  //   content: ['./**/*.svelte'],
  //   extractors: [
  //     {
  //       extractor,
  //       extensions: ['svelte'],
  //     },
  //   ],
  //   whitelist: defaultWhitelist.filter(Boolean),
  //   whitelistPatterns: defaultWhitelistPatterns.filter(Boolean),
  //   whitelistPatternsChildren: defaultWhitelistPatterns.filter(Boolean),
  // }),
].filter(Boolean);

export default [
  postcss({ plugins, inject: true })
];
