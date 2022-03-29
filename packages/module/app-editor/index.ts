import type { Module } from '@cosmic/core/parts';
import { GesturePlugin } from '@vueuse/gesture';
import root from './src/index.vue';
export default {
  root,
  imports: [
    '@cosmic-module/app-editor',
  ],
  init: (app) => {
    app.use(GesturePlugin);
  },
} as Module;
