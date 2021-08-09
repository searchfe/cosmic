export interface Controller {
  view: () => HTMLElement;
  init: () => Controller;
  viewWillAppear: () => void;
  viewDidAppear: () => void;

  viewWillDisappear: () => void;
  viewDidDisappear: () => void;

  destroy: () => void;
}

declare type Props = Record<string, any>;
interface IComponentOptions {
  target: Element;
  anchor?: Element;
  props?: Props;
  context?: Map<any, any>;
  hydrate?: boolean;
  intro?: boolean;
  $$inline?: boolean;
}
