// import { SvelteModule } from './modules/svelte-module';
import { ModuleFactory } from './modules/module-factory';
import type { ModuleConfig } from './modules/module-factory';
import type { Module } from './modules/module';

import inject from './ioc/inject';

export type { Module, ModuleConfig };

export { inject, ModuleFactory };
