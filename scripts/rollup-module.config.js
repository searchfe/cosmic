import { existsSync, readdirSync, statSync } from 'fs';
import { resolve } from 'path';

import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import { externals } from './rollup-external.config';
import { internals } from './rollup-internal.config';
import { pluginsOptions } from './rollup-plugin-svelte';

const paths = readdirSync('src/modules');

export const modules = paths
  .filter((path) => !statSync(resolve('src/modules', path)).isFile())
  .filter((path) => existsSync(resolve('src/modules', path, 'index.ts')))
  .map((path) => 'modules/' + path);

const production = !process.env.ROLLUP_WATCH;
function normalize() {
  const list = [];
  modules.forEach((moduleId) => {
    list.push({
      moduleId: moduleId,
      src: `src/${moduleId}/index.ts`,
      path: moduleId,
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
    if (c) imports[c.moduleId] = '/' + c.path + (c.main || '');
  });
  return {
    imports,
  };
}
