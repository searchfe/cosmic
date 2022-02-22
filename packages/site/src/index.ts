import { bootstrap } from '@cosmic/core/browser';
import '@cosmic/core/browser.css';

// console.log(window.versions);
// console.log('xx', xx, import.meta);

// const module = await load('@cosmic-module/frame-menu-bar');
// console.log(module);

bootstrap({
  root: 'body',
  modules: {
    'frame-menu-bar': '@cosmic-module/frame-menu-bar',
  },
});
