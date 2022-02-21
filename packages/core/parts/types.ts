type QuerySelector = string;

interface Modules {
  [index: string]: string;
}

export interface BootstrapOption {
  root: QuerySelector;
  modules: Modules;
}
