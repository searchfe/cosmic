import { bootstrap } from '@cosmic/core/browser';
import '@cosmic/core/browser.css';

import { modulePath } from '@cosmic-module/frame-module-loader';

// console.log(window.versions);
// console.log('xx', xx, import.meta);
const a = 'frame-menu-bar';

import(
  /* @vite-ignore */
  `${modulePath}${a}/dist/index.mjs`
).then(x => {
  console.log('1', x.default);
});

bootstrap({
  root: 'body',
  modules: {
    'frame-menu-bar': '@cosmic-module/frame-menu-bar',
  },
});
