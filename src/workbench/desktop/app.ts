import { Container } from 'inversify';
import { AppearanceType } from '@cosmic/core/common/appearance';
import { AppearanceService } from '@cosmic/workbench/services/appearance-service';
import Navigation from '../ui/components/navigation/navigation-bar.svelte';
import StatusBar from '../ui/components/status/status-bar.svelte';
import SplitBoardView from '@cosmic/core/browser/layout/split-board.view';
import SplitItemView from '@cosmic/core/browser/layout/split-item.view';

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
    this.initStatusBar();
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
    new Navigation({
      target: this.root,
      props: { },
      context: this.context,
    });
  }

  initFlowTable() {
    const splitBoard = new SplitBoardView().setFlow('1');
    const view0 = new SplitItemView().setContent(document.createElement('div'));
    const view1 = new SplitItemView().setContent(document.createElement('div'));
    splitBoard.addColumn(view0);
    splitBoard.addColumn(view1);
  
    this.root.appendChild(splitBoard.root);

  }

  initWorkArea() {
    // to do sth.
  }

  initStatusBar() {
    new StatusBar({
      target: this.root,
      props: { },
      context: this.context,
    });
    // to do sth.
  }

}
