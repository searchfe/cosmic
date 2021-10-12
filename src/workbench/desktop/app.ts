import { Container } from 'inversify';
import { AppearanceType } from '@cosmic/core/common';
import { ModuleFactory } from '@cosmic/core/parts';
import { Controller } from '@cosmic/core/browser';
import { AppearanceService } from '@cosmic/workbench/services/appearance-service';
// import { MenuGroupService } from '@cosmic/workbench/services/menu-group-service';
// import { applicationMenus } from './base-menu/config';
import Navigation from '../ui/components/navigation/navigation-bar.svelte';
import StatusBar from '../ui/components/status/status-bar.svelte';
import ResourcePage from '../ui/components/resource/resource.svelte';
import PropertyPanel from '../ui/components/property/proterty.svelte';

import config from 'workbench/desktop/app.config.json';

export default class App {
  private container: Container;
  private context = new Map<string, Container>();
  constructor(private root: HTMLElement) {
    this.container = new Container({ defaultScope: 'Singleton' });
    this.context.set('container', this.container);
    this.initPreferences();
    this.initStyle();
  }
  async bootstrap() {
    // this.initNavigationBar();
    // this.initStatusBar();
    await this.initModules();
  }

  async initModules() {
    const moduleFactory = new ModuleFactory(this.container);
    this.container.bind('ModuleFactory').toDynamicValue(() => moduleFactory);

    const workbench = await moduleFactory.load(config.workbench.id, config.workbench);
    if (workbench instanceof Controller) {
      workbench.viewWillAppear();
      this.root.appendChild(workbench.view());
      workbench.viewDidAppear();
    }
  }

  initPreferences() {
    this.container.bind(AppearanceService).to(AppearanceService);
    // this.container.bind(MenuGroupService).to(MenuGroupService);
  }

  initStyle() {
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
    // const header = document.querySelector('#main-header');
    // const groupMenu = this.container.get(MenuGroupService);
    // groupMenu.initContainer(header as HTMLElement);
    // for (const menu of applicationMenus) {
    //   groupMenu.getMenuInsatance().init(menu.title, menu.items);
    // }
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
