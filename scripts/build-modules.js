const {readdirSync, statSync} = require('fs-extra');
const {resolve} = require('path');
const {execSync} = require('child_process');

const ROOT = resolve(__dirname, '../packages/module');
const list = readdirSync(ROOT);

list.map(dir => resolve(ROOT, dir)).filter(dir => statSync(dir).isDirectory()).map(dir => {
    const output = execSync(`cd ${dir} && pnpm run build`, {
        encoding: 'utf-8',
    });
    console.log(output.toString());
});
