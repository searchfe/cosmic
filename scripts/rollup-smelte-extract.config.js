import { pluginsOptions } from './rollup-plugin-svelte';
const fs=require('fs');
const production = !process.env.ROLLUP_WATCH;

function normalize() {
  const {tmpFileName, packedName} = smelteExtractConfig;
  const list = [];
  [packedName].forEach((moduleId) => {
    list.push({
      moduleId: moduleId,
      src: tmpFileName,
      path: 'core/external',
      main: `/${moduleId}.js`,
    });
  });
  return list;
}

export function rmSmelteTmpPlugin(filePath) {
  return {
    buildEnd() {
      if (fs.existsSync(filePath)) {
        //file exists
        fs.unlink(filePath, e => { e && console.log(e);});
      }
    },
  };
}

function options(config) {
  const path = 'core/external';
  return {
    input: config.src,
    output: {
      sourcemap: !production,
      format: 'es',
      file: `dist/${config.path}${config.main || ''}`,
    },
    plugins: [
      ...pluginsOptions(path, true),
      production && rmSmelteTmpPlugin(config.src),
    ],
  };
}

// for rollup config, compile after generate
export function configs() {
  return production ?  normalize().map((config) => options(config)) : [];
}

// for import
export function importMap() {
  const imports = {};
  normalize().forEach(c => {
    if (c) imports[c.moduleId] = '/' + c.path + (c.main || '');
  });
  return {
    imports,
  };
}

export const smelteExtractConfig = {
  identifier: new RegExp(/smelte(\/[a-zA-Z.]+)*/),
  tmpFileName: 'smelteTMP.js',
  packedName: 'smelte',
};
