import {createApp} from 'vue';
import App from '/@/App.vue';
import { inject } from '@cosmic/core/browser';
import m from '@cosmic-module/frame-menu-bar';

console.log(inject, m);

createApp(App).mount('#app');
