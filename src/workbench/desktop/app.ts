import { Container } from 'inversify';
import { AppearanceType } from '@cosmic/core/common/appearance';
import { AppearanceService } from '@cosmic/workbench/services/appearance-service';
import { MenuGroupService } from '@cosmic/workbench/services/menu-group-service';
import { BaseMenu } from './base-menu/base-menu';
import {applicationMenus} from './base-menu/config';
import Navigation from '../ui/components/navigation/navigation-bar.svelte';
import StatusBar from '../ui/components/status/status-bar.svelte';
import ResourcePage from '../ui/components/resource/resource.svelte';
import PropertyPanel from '../ui/components/property/proterty.svelte';
import SplitBoardView from '@cosmic/core/browser/layout/split-board.view';
import SplitItemView from '@cosmic/core/browser/layout/split-item.view';
export default class App {
  private container: Container;
  private context = new Map<string, Container>();
  constructor(private root: HTMLElement) {
    this.container = new Container({ defaultScope: 'Singleton' });
    this.context.set('container', this.container);
    this.initPreferences();
    this.initStyle();
  }
  bootstrap(): void {
    this.initNavigationBar();
    this.initFlowTable();
    this.initStatusBar();
  }

  initPreferences(): void {
    this.container.bind(AppearanceService).to(AppearanceService);
    this.container.bind(MenuGroupService).to(MenuGroupService);
  }

  initStyle(): void {
    // this.container.bind(ColorSet).to(ColorSet);
    // const colorSetRoot = document.createElement('style');
    // this.container.bind(ColorSetRoot).toDynamicValue(() => colorSetRoot);
    // this.root.appendChild(colorSetRoot);
    // this.container.get(ColorSet);
    const aps = this.container.get(AppearanceService);
    aps.onModeChanged((type: AppearanceType) => this.initStyleMode(type));
    this.initStyleMode(AppearanceType.dark);
  }
  initStyleMode(type: AppearanceType): void {
    if (type === AppearanceType.dark) {
      document.body.classList.add('mode-dark');
    } else {
      document.body.classList.remove('mode-dark');
    }
  }

  initFrame(): void {
    // to do sth.

  }

  initNavigationBar(): void {
    // to do sth.
    const navigationBar = new Navigation({
      target: this.root,
      props: {},
      context: this.context,
    });
    this.initMenus();
  }

  initMenus(): void {
    const header = document.querySelector('#main-header');
    const groupMenu = this.container.get(MenuGroupService);
    groupMenu.initContainer(header as HTMLElement);
    for (const menu of applicationMenus) {
      groupMenu.getMenuInsatance().init(menu.title, menu.items);
    }
  }

  initFlowTable(): void {
    const splitBoard = new SplitBoardView().setFlow('1');
    const view0 = new SplitItemView().setContent(document.createElement('div'));
    const view1 = new SplitItemView().setContent(document.createElement('div'));
    const view2 = new SplitItemView().setContent(document.createElement('div'));
    splitBoard.addColumn(view0);
    splitBoard.addColumn(view1);
    splitBoard.addColumn(view2);
    splitBoard.applySplit('horizontal', [20, 60, 20]);

    this.root.appendChild(splitBoard.root);
    this.initResourcePanel(view0.contentView);
    this.initPropertyPanel(view2.contentView);
  }

  initResourcePanel(container: HTMLElement): void {
    new ResourcePage({
      target: container,
      props: {},
      context: this.context,
    });
  }

  initPropertyPanel(container: HTMLElement): void {
    new PropertyPanel({
      target: container,
      props: {},
      context: this.context,
    });
  }

  initWorkArea(): void {
    // to do sth.
  }

  initStatusBar(): void {
    new StatusBar({
      target: this.root,
      props: {},
      context: this.context,
    });
    // to do sth.
  }

}
