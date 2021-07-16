import MenuGroup from './menu-group';
import type { MenuCommonFunction } from './menu-item';
import { MenuItemType } from './menu-item';

let menuGroup: MenuGroup;

const getMenuGroup = (target: HTMLElement): MenuGroup => {
    if (menuGroup) {
        return menuGroup;
    }

    return menuGroup = new MenuGroup(target);
};
export default getMenuGroup;
export { MenuGroup, MenuItemType };
export type { MenuCommonFunction };