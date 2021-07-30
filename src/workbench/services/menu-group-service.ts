import { injectable } from 'inversify';
import { Menu } from '../desktop/menu';

@injectable()
export class MenuGroupService {
    private container!: HTMLElement;
    private meuns!: Menu[];
    constructor() {
        this.meuns = [];
    }

    public initContainer(container: HTMLElement): void {
        if (this.container) {
            return;
        }
        this.container = container;
    }

    public getMenuInsatance(): Menu {
        const menuContainer = document.createElement('div');
        const id = Date.now() + '' + this.meuns.length;
        this.container.append(menuContainer);
        const menu = new Menu(menuContainer, id);
        this.meuns.push(menu);
        return menu;
    }

    public removeMenuInstances(menu: Menu): void {
        this.container.removeChild(menu.container);
        this.meuns = this.meuns.filter(item => item.id === menu.id);
        this.container.removeChild(menu.container);
    }



}