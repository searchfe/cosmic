import { dirname } from 'path';
import fg from 'fast-glob';
import { ensureDirSync, copyFileSync, readFileSync, writeFileSync } from 'fs-extra';

export function syncFile(src, dest, extnames, transform) {
  if (extnames && extnames.default === 'false') {
    extnames = {};
  }
  extnames = {
    woff2: true,
    svg: true,
    png: true,
    jpeg: true,
    jpg: true,
    gif: true,
    ...extnames,
  };
  const list = Object.keys(extnames).filter((name) => extnames[name]);
  return {
    name: 'copy',
    buildEnd: function () {
      const files = fg.sync([`${src}/**/*.{${list.join(',')}}`]);
      console.log('copy----->', src, files);
      files.forEach((file) => {
        const r = new RegExp(`^${src}`);
        const d = file.replace(r, dest);
        ensureDirSync(dirname(d));
        let rs;
        if (transform) {
          rs = transform(file, d, readFileSync(file));
          if (rs && !Array.isArray(rs)) rs = [d, rs];
        }
        if (rs) {
          writeFileSync(rs[0], rs[1]);
        } else {
          copyFileSync(file, d);
        }
      });
    },
  };
}
