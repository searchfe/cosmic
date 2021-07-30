import type { MenuGroupService } from '@cosmic/workbench/services/menu-group-service';
import type { Menu, MenuItemConfig } from '../menu';

export class BaseMenu {
    private menuInstance!: Menu;
    constructor(private groupMenuService: MenuGroupService) {
    }

    public initMenu(menuItems: MenuItemConfig[]):void {
        this.menuInstance = this.groupMenuService.getMenuInsatance();
        this.menuInstance.init('文件', menuItems);
        
    }

}