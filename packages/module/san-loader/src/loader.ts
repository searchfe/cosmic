const url = import.meta.url;
const moduleBasePath = url.split(/\/packages\/(module|site)\//)[0].replace(/^http:\/\/[^/]+/, '');

function moduleAssetPath(src: string, path: string){
    if (src.match(/^@cosmic-module\/([\S]*)$/)) {
        return `${moduleBasePath}/packages/module/${RegExp.$1}/dist/${path}`;
    }
    return;
}
export { moduleAssetPath, moduleBasePath };