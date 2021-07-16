import {uuid} from '../utils';
/* eslint-disable no-shadow */
export enum MenuItemType {
    group,
    item
}

export type MenuCommonFunction = (menu: MenuItem, context: any) => void;

export interface MenuItemConfig {
    title: string;
    type: MenuItemType;
    callback: MenuCommonFunction
}

export class MenuItem {
    public readonly id!: string;
    private title!:string;
    private type!: MenuItemType;
    private callback: MenuCommonFunction;
    private children!: MenuItem[];
    constructor(config: MenuItemConfig) {
        this.id = uuid();
        const {title, type, callback} = config;
        if (type === MenuItemType.group) {
            this.children = [];
        }
        this.title = title;
        this.type = type;
        this.callback = callback;
    }
}