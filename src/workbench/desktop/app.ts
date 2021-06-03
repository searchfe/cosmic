import { Container } from 'inversify';

import { ColorSetRoot, ColorSet } from '@cosmic/workbench/ui/style/color-set.comp';

import { AppearanceService } from '@cosmic/workbench/services/appearance-service';

import { initStyle } from '../ui/style/stylesheet';

import Navigation from '../ui/components/navigation/navigation-bar.svelte';

export default class App {
  private container: Container;
  private context = new Map<string, Container>();
  constructor(private root: HTMLElement) {
    this.container =  new Container({ defaultScope: 'Singleton' });
    this.context.set('container', this.container);
    this.initPreferences();
    this.initStyle();
  }
  bootstrap() {
    this.initNavigationBar();
    // const appRoot = document.createElement('div');
    // this.root.appendChild(appRoot);

    // const am = new mode({
    //   target: appRoot,
    //   // props: {},
    //   context: map,
    // });
  }

  initPreferences() {
    this.container.bind(AppearanceService).to(AppearanceService);
  }

  initStyle() {
    this.container.bind(ColorSet).to(ColorSet);
    const colorSetRoot = document.createElement('style');
    this.container.bind(ColorSetRoot).toDynamicValue(() => colorSetRoot);
    this.root.appendChild(colorSetRoot);
    this.container.get(ColorSet);

    initStyle(this.root);
  }

  initFrame() {
    // to do sth.

  }

  initNavigationBar() {
    // to do sth.
    const appHeader = document.createElement('div');
    this.root.appendChild(appHeader);
    new Navigation({
      target: appHeader,
      props: { },
      context: this.context,
    });
  }

  initWorkArea() {
    // to do sth.
  }

  initStatusBar() {
    // to do sth.
  }

}
