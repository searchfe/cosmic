export interface Controller<T> {
  view: () => HTMLElement;
  init: (props: T) => Promise<Controller<T>>;
  viewWillAppear: () => void;
  viewDidAppear: () => void;

  viewWillDisappear: () => void;
  viewDidDisappear: () => void;

  destroy: () => void;
}

// declare type Props = Record<string, any>;
// interface IComponentOptions {
//   target: Element;
//   anchor?: Element;
//   props?: Props;
//   context?: Map<any, any>;
//   hydrate?: boolean;
//   intro?: boolean;
//   $$inline?: boolean;
// }
