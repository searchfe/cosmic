import type { Module } from '@cosmic/core/parts';
import root from './src/workbench.vue';
export default {
  root,
  imports: [
    '@cosmic-module/frame-workbench',
  ],
} as Module;
