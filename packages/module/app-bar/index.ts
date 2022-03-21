import type { Module } from '@cosmic/core/parts';
import root from './src/app-bar.vue';
import { WorkbenchBarService, type WorkbenchBarItemConfig } from './src/workbench-bar.service';

export default {
  root,
  providers: [ WorkbenchBarService ],
} as Module;

export {
  WorkbenchBarService,
  WorkbenchBarItemConfig,
};