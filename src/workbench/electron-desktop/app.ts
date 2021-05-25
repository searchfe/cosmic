import 'reflect-metadata';
import { Container } from 'inversify';

import mode from '@cosmic-workbench/ui/components/preferences/appearance/mode.svelte';
import { ColorSetRoot, ColorSet } from '@cosmic-workbench/ui/style/color-set.comp';

import { AppearanceService } from '@cosmic-workbench/services/appearance-service';

import { initStyle } from '@cosmic-workbench/ui/style/stylesheet';

export default class App {
  private container: Container;
  constructor(private root: HTMLElement) {
    this.container =  new Container({ defaultScope: 'Singleton' });
    this.initPreferences();
    this.initStyle();
  }
  bootstrap() {
    const appRoot = document.createElement('div');
    this.root.appendChild(appRoot);


    const am = new mode({
      target: appRoot,
      props: { appContainer: this.container },
    });
  }

  initPreferences() {
    this.container.bind(AppearanceService).to(AppearanceService);
  }

  initStyle() {
    this.container.bind(ColorSet).to(ColorSet);
    const colorSetRoot = document.createElement('style');
    this.container.bind(ColorSetRoot).toDynamicValue(() => colorSetRoot);
    this.root.appendChild(colorSetRoot);
    const uic = this.container.get(ColorSet);

    initStyle(this.root);
  }

  initFrame() {
    // to do sth.
  }

  initNavigationBar() {
    // to do sth.
  }

  initWorkArea() {
    // to do sth.
  }

  initStatusBar() {
    // to do sth.
  }

}
