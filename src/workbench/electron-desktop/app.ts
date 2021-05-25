import 'reflect-metadata';
import { Container } from 'inversify';

import AppearanceMode from '@cosmic-workbench/ui/components/appearance-mode.svelte';
import { ColorSetRoot, ColorSet } from '@cosmic-workbench/ui/style/color-set.comp';

import { AppearanceService } from '@cosmic-workbench/services/appearance-service';

export default class App {
  private container: Container;
  constructor(private root: HTMLElement) {
    this.container =  new Container({ defaultScope: 'Singleton' });
    this.container.bind(AppearanceService).to(AppearanceService);
    this.container.bind(ColorSet).to(ColorSet);
  }
  bootstrap() {
    const colorSetRoot = document.createElement('style');
    const appRoot = document.createElement('div');
    this.root.appendChild(colorSetRoot);
    this.root.appendChild(appRoot);

    this.container.bind(ColorSetRoot).toDynamicValue(() => colorSetRoot);

    const uic = this.container.get(ColorSet);

    const am = new AppearanceMode({
      target: appRoot,
      props: { appContainer: this.container },
    });
  }
}
