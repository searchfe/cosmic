const { readdirSync, statSync, copySync } = require('fs-extra');
const { resolve, join } = require('path');
const { existsSync } = require('fs');
const { execSync } = require('child_process');

const ROOT = resolve(__dirname, '../packages/module');
const list = readdirSync(ROOT);

list.map(dir => resolve(ROOT, dir)).filter(dir => {
    return statSync(dir).isDirectory() && existsSync(join(dir, 'package.json'));
}).map(dir => {
    const output = execSync(`cd ${dir} && pnpm run build`, {
        encoding: 'utf-8',
    });
    console.log(output.toString());
    if(existsSync(`${dir}/assets`)) {
        copySync(`${dir}/assets`, `${dir}/dist`);
    }
});
