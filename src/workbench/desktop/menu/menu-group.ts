import Menu from './menu';

export default class MenuGroup {
    private container!: HTMLElement;
    private meuns!: Menu[];
    constructor(container: HTMLElement) {
        this.container = container;
        this.meuns = [];
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