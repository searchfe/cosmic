import Component from './index.svelte';
import { SVController } from '@cosmic/core/parts';

export default class PropertyPanel extends SVController<null> {
  initWithComponent(target: Element) {
    return new Component({
      target,
    });
  }

  viewWillAppear(): void {
    /** to be completed */
  }
  viewDidAppear(): void {
    /** to be completed */
  }

  viewWillDisappear(): void {
    /** to be completed */
  }
  viewDidDisappear(): void {
    /** to be completed */
  }
}
