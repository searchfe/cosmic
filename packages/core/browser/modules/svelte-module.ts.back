import { injectable } from 'inversify';
import type { SvelteComponentDev } from 'svelte/internal';
import { Controller } from '@cosmic/core/browser';
import type { Module } from './module';

@injectable()
export abstract class SvelteModule<T> extends Controller implements Module<T> {
    private comp: SvelteComponentDev;
    private _view: HTMLElement;
    public props: T;

    public view() {
        return this._view;
    }

    public async init(props: T) {
        this.props = props;
        this._view = this._view || document.createElement('div');
        return this;
    }

    abstract initWithComponent(target: Element): SvelteComponentDev;

    viewWillAppear() {
        this.comp = this.initWithComponent(this._view);
    }

    public async destroy() {
        this.comp.$destroy();
        if (this._view.parentNode) {
            this._view.parentNode.removeChild(this._view);
        }
        return this;
    }

    abstract serialize(): T;
}
