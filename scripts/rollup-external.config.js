import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { existsSync } from 'fs';

const production = process.env.NODE_ENV === 'production';

/** 不参与全部构建的外部依赖，会编译到core/external/中 */
export const externals = ['tslib', 'reflect-metadata', 'color', 'inversify'];

function normalize() {
  const list = [];
  externals.forEach((moduleId) => {
    const config = require(`${moduleId}/package.json`);
    if (!config) return;
    const srcPath = `node_modules/${moduleId}/${config['jsnext:main'] || config.module || config.main || 'index.js'}`;
    if (!existsSync(srcPath)) return;
    list.push({
      moduleId: moduleId,
      src: srcPath,
      path: 'core/external',
      main: `/${moduleId}.js`,
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
    plugins: [
      resolve({
        browser: true,
      }),
      commonjs({}),
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
