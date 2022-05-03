export const justifyContentData = {
    'MIN': {
        'container': 'items-start',
    },
    'MAX': {
        'container': 'items-end',
    },
    'CENTER': {
        'container': 'items-center',
    },
    'SPACE_BETWEEN': {
        'container': 'items-between',
    },
};
// 注意配置视觉 和 对象视觉是不一致的
export const AlignItemsData = {
    'MIN': {
        'container': 'justify-start',
    },
    'MAX': {
        'container': 'justify-end',
    },
    'CENTER': {
        'container': 'justify-center',
    },
};

export const DirectionData = {
    'HORIZONTAL': {
        'container': 'flex-col px-8 py-6',
        'maxItem': 'w-4 h-20',
        'minItem': 'w-4 h-8',
    },
    'VERTICAL': {
        'container': 'py-8 px-6',
        'maxItem': 'w-20 h-4',
        'minItem': 'w-8 h-4',
    },
};