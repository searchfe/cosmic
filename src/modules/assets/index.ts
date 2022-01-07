import Component from './index.svelte';
import { SvelteModule } from '@cosmic/core/parts';

export default class Assets extends SvelteModule<unknown> {
  initWithComponent(target: Element) {
    return new Component({
      target,
    });
  }
  serialize() {
    return {};
  }
}
