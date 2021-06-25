import { Container } from 'inversify';
import { AppearanceType } from '@cosmic/core/common/appearance';
import { AppearanceService } from '@cosmic/workbench/services/appearance-service';
import Navigation from '../ui/components/navigation/navigation-bar.svelte';
import SpliBoardView from '@cosmic/core/browser/layout/split-board.view';

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
    this.initFlowTable();
  }

  initPreferences() {
    this.container.bind(AppearanceService).to(AppearanceService);
  }

  initStyle() {
    // this.container.bind(ColorSet).to(ColorSet);
    // const colorSetRoot = document.createElement('style');
    // this.container.bind(ColorSetRoot).toDynamicValue(() => colorSetRoot);
    // this.root.appendChild(colorSetRoot);
    // this.container.get(ColorSet);
    const aps = this.container.get(AppearanceService);
    aps.onModeChanged((type: AppearanceType) => this.initStyleMode(type));
    this.initStyleMode(AppearanceType.dark);
  }
  initStyleMode(type: AppearanceType) {
    if (type === AppearanceType.dark) {
      document.body.classList.add('mode-dark');
    } else {
      document.body.classList.remove('mode-dark');
    }
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

  initFlowTable() {
    this.root.appendChild(new SpliBoardView().setFlow('1').root);
  }

  initWorkArea() {
    // to do sth.
  }

  initStatusBar() {
    // to do sth.
  }

}
