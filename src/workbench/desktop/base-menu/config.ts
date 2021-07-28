import type { MenuItemConfig, MenuItem } from '../menu';
import { MenuItemType } from '../menu';

export const applicationMenus: Array<{ title: string; items: MenuItemConfig[] }> = [
  {
    title: '文件',
    items: [
      {
        title: '打开文件',
        type: MenuItemType.group,
        callback: (item, context) => console.log(item),
      },
      {
        title: '保存',
        type: MenuItemType.group,
        callback: (item, context) => console.log(item),
      },

      {
        title: '另存为',
        type: MenuItemType.group,
        callback: (item, context) => console.log(item),
      },
    ],
  },
];
