import {createApp} from 'vue';
import { App } from '@cosmic/core/browser';
import '@cosmic/core/style.css';
import 'cosmic-design/global.css';
import 'cosmic-vue/style.css';

// import a from '@cosmic-module/frame-menu-bar';
console.log(window.versions);

createApp(App).mount('#app');
