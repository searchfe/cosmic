import type { MenuItemConfig } from '../menu';
import { MenuItemType } from '../menu';

export const applicationMenus: { title: string; items: MenuItemConfig[] }[] = [
    {
        title: '文件',
        items: [
            {
                title: '打开文件',
                type: MenuItemType.group,
                /* eslint no-console: "off" */
                callback: (item, context) => console.log(item, context),
            },
            {
                title: '保存',
                type: MenuItemType.group,
                /* eslint no-console: "off" */
                callback: (item, context) => console.log(item, context),
            },

            {
                title: '另存为',
                type: MenuItemType.group,
                /* eslint no-console: "off" */
                callback: (item, context) => console.log(item, context),
            },
        ],
    },
];