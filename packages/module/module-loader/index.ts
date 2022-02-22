const url = import.meta.url;
const modulePath = url.split('module-loader')[0];

export default async function load(module: string) {
  if (module.match(/^@cosmic-module\/([\S]*)$/)) {
    return await import(
      /* @vite-ignore */
      `${modulePath}${RegExp.$1}/dist/index.mjs`
    );
  } else {
    return;
  }
}
