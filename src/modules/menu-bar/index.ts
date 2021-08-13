import { injectable, inject } from 'inversify';
import type { Module, ModuleFactory, ModuleConfig } from '@cosmic/core/parts';
import { Controller, SplitBoardView, directionType } from '@cosmic/core/browser';
import type { ItemGenerateDelegate } from '@cosmic/core/browser';
import { Menu } from './menu';

interface MenuProps {
  title: string;
}

@injectable()
export default class MenuBar extends Controller implements Module<MenuProps> {
  props: MenuProps;
  private meuns!: Menu[];
  private _view: HTMLElement;
  view() {
    return this._view;
  }
  public async init(props: MenuProps) {
    this._view = document.createElement('div');
    return this;
  }
  viewWillAppear() {
    const id = Date.now() + '' + this.meuns.length;
    const menu = new Menu(this._view, id);
    this.meuns.push(menu);
  }
  serialize() {
    return { title: '' };
  }
  async destroy() {
    return this;
  }
  remove(menu: Menu) {
    this._view.removeChild(menu.container);
    this.meuns = this.meuns.filter((item) => item.id === menu.id);
  }
}
