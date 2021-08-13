import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import { externals } from './rollup-external.config';
import { pluginsOptions } from './rollup-plugin-svelte';

const production = !process.env.ROLLUP_WATCH;

let paths = ['core/browser', 'core/common', 'core/components', 'core/parts'];
export const internals = paths.map((path) => {
  return '@cosmic/' + path;
});
/** 不参与workbench构建的依赖，会编译到core/中 */

function normalize() {
  const list = [];
  paths.forEach((moduleId) => {
    list.push({
      moduleId: moduleId,
      src: `src/${moduleId}/index.ts`,
      path: `${moduleId}`,
      main: '/index.js',
    });
  });
  return list;
}

function options(config) {
  return {
    input: config.src,
    output: {
      sourcemap: !production,
      format: 'es',
      file: `dist/${config.path}${config.main || ''}`,
    },
    external: [...externals, ...internals],
    plugins: [
      ...pluginsOptions(config.path),
      !production &&
        livereload({
          watch: `dist/${config.path}`,
        }),
      production &&
        terser({
          compress: true,
          mangle: true,
        }),
    ],
  };
}

export function configs() {
  return normalize().map((config) => options(config));
}
export function importmap() {
  const imports = {};
  normalize().forEach((c) => {
    if (c) imports['@cosmic/' + c.moduleId] = '/' + c.path + (c.main || '');
  });
  return {
    imports,
  };
}
