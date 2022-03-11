import type { interfaces } from 'inversify';
import type { DefineComponent } from 'vue';


type QuerySelector = string;
type ModuleId = string;


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
