import fg from 'fast-glob';
import { syncFile } from './rollup-plugin-sync';

const paths = fg.sync([`src/workbench/**/*.json`]);

export const jsonFiles = paths.map((path) => path.replace(/^src\//, ''));

function normalize() {
  const list = [];
  jsonFiles.forEach((moduleId) => {
    list.push({
      moduleId: moduleId,
      src: `src/${moduleId}`,
      path: moduleId.replace(/\.json$/, '.js'),
    });
  });
  return list;
}

export function importmap() {
  const imports = {};
  normalize().forEach((c) => {
    if (c) imports[c.moduleId] = '/' + c.path;
  });
  return {
    imports,
  };
}

export const jsonSync = syncFile(
  'src/workbench',
  'dist/workbench',
  { default: false, json: true },
  (src, dest, content) => {
    return [dest.replace(/\.json$/, '.js'), `export default ${content}`];
  }
);
