import type { Controller } from './modules/controller';
import { SVController } from './modules/svelte-controller';
import { ModuleFactory } from './modules/module-factory';
import type { ModuleConfig } from './modules/module-factory';

import inject from './ioc/inject';

export type { Controller, ModuleConfig };

export { inject, SVController, ModuleFactory };
