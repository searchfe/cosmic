import type { interfaces } from '@cosmic/core/inversify';
import type { App, DefineComponent } from 'vue';


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
  init?: (app: App<Element>) => void;
}
