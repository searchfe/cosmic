import type { SvelteComponentDev } from 'svelte/internal';
import type { Controller } from './controller';

export abstract class SVController implements Controller {
  private comp: SvelteComponentDev;
  private _view: HTMLElement;

  public view() {
    return this._view;
  }

  public init() {
    this._view = this._view || document.createElement('div');
    this.viewWillAppear();
    this.comp = this.initWithComponent(this._view);
    this.viewDidAppear();
    return this;
  }

  abstract initWithComponent(target: Element): SvelteComponentDev;

  abstract viewWillAppear(): void;
  abstract viewDidAppear(): void;

  abstract viewWillDisappear(): void;
  abstract viewDidDisappear(): void;

  public destroy() {
    this.viewWillDisappear();
    this.comp.$destroy();
    if (this._view.parentNode) {
      this._view.parentNode.removeChild(this._view);
    }
    this.viewDidDisappear();
  }
}
