import type { Module } from '@cosmic/core/parts';
import { GesturePlugin } from '@vueuse/gesture';
import creator from './src/common/creator';
import stroke from './src/common/stroke';
import effect from './src/common/effect';
import radius from './src/common/radius';
import root from './src/index.vue';
import childrenRender from './src/render/children.vue';
import NodeControllService from './src/service/node-controll.service';
export default {
  root,
  imports: [
    '@cosmic-module/app-editor',
  ],
  init: (app) => {
    app.use(GesturePlugin);
    app.directive('creator', creator);
    app.directive('stroke', stroke);
    app.directive('effect', effect);
    app.directive('radius', radius);
    app.component('ChildrenRender', childrenRender);
  },
  providers: [NodeControllService],
} as Module;
