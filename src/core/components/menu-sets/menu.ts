import MenuSvelte from './menu.svelte';
import type { MenuItemConfig } from './menu-item';
import { MenuItem } from './menu-item';
import { writable } from 'svelte/store';

export default class Menu {
    public readonly container!: HTMLElement;
    public readonly id!: string;
    private name!: string;
    private menuItems!: MenuItem[];
    private menuSvelte: any;
    private readonly context = new Map<string, any>();
    private readonly meunsWritable = writable<MenuItem[]>([]);
    private readonly nameWritable = writable<string>('');
    constructor(container: HTMLElement, id: string) {
        this.container = container;
        this.id = id;
        this.menuItems = [];
        this.context.set('menus', this.meunsWritable);
        this.context.set('name', this.nameWritable);
    }

    public init(name: string, config: MenuItemConfig[]): void {
        this.name = name;
        for (const menuItem of config) {
            this.menuItems.push(new MenuItem(menuItem));
        }
        return this.createMenu();
    }

    public destroy(): void {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
        return;
    }

    public registerItem(config: MenuItemConfig, index: number, group?: string): void {
        this.menuItems.splice(index, 0, new MenuItem(config));
        this.meunsWritable.set([...this.menuItems]);
    }

    public removeItem(index: number): MenuItem {
        const menuItem = this.menuItems[index];
        this.meunsWritable.set((this.menuItems = this.menuItems.filter((_, i) => index !== i)));
        return menuItem;
    }

    private createMenu(): void {
        this.menuSvelte = new MenuSvelte({
            target: this.container,
            context: this.context,
        });
        this.nameWritable.set(this.name);
        this.meunsWritable.set(this.menuItems);
    }
}
