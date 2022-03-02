import type { interfaces } from 'inversify';


type QuerySelector = string;
type ModuleId = string;

import type { DefineComponent } from 'vue';

export interface BootstrapOption {
  root: QuerySelector;
}

export interface Module {
  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
  root:  DefineComponent<{}, {}, any>,
  providers?: interfaces.ServiceIdentifier[],
  // declarations: [],
  imports?: ModuleId[],
}
export type { interfaces as inversify };