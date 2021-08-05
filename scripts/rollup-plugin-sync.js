import { dirname } from 'path';
import fg from 'fast-glob';
import { ensureDirSync, copyFileSync, readFileSync, writeFileSync } from 'fs-extra';

export function syncFile(src, dest, extnames, transform) {
    extnames = {
        woff2: true,
        svg: true,
        png: true,
        jpeg: true,
        jpg: true,
        gif: true,
        ...extnames,
    };
    const list = Object.keys(extnames).filter(name => extnames[name]);
    return {
        name: 'copy',
        buildEnd: function() {
        const files = fg.sync([`${src}/**/*.{${list.join(',')}}`]);
        console.log('----->', src, files);
        files.forEach(file => {
            const r = new RegExp(`^${src}`);
            const d = file.replace(r, dest);
            ensureDirSync(dirname(d));
            let rs;
            if (transform) {
                rs = transform(file, dest, readFileSync(file));
            }
            if (rs) {
                writeFileSync(d, rs);
            } else {
                copyFileSync(file, d);
            }

        });
        },
    };
}