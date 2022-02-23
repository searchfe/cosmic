const url = import.meta.url;
const moduleBasePath = url.split(/\/packages\/(module|site)\//)[0].replace(/^http:\/\/[^/]+/, '');

async function loadModule(src: string) {
    const url = moduleAssetPath(src, 'index.mjs');
    if (url === undefined) {
        throw(`Unsupported Module: ${src}`);
    }
    return await import(
        /* @vite-ignore */
        url
    );
}
function moduleAssetPath(src: string, path: string){
    if (src.match(/^@cosmic-module\/([\S]*)$/)) {
        return `${moduleBasePath}/packages/module/${RegExp.$1}/dist/${path}`;
    }
    return;
}
export { loadModule, moduleAssetPath, moduleBasePath };