import { util } from '@cosmic/core/parts';
export type AxisSizingType =  {label: string, value: 'NONE' | 'AUTO' | 'FIXED'}
export function getAxisSizingOptions(
        direction: 'primary' | 'counter',
        mode: util.LayoutMode,
        parentMode: util.LayoutMode,
) {
    const fixedOption : AxisSizingType = {
        label: '适应容器',
        value: 'FIXED',
    };
    const noneOption: AxisSizingType = {
        label: `${direction === 'counter' ? '高度' : '宽度'}固定`,
        value: 'NONE',
    };
    const autoOption : AxisSizingType = {
        label: '适应内容',
        value: 'AUTO',
    };
    if (mode === 'NONE') {
        return [noneOption];
    }
    switch(parentMode) {
        case 'FENCE':
            return [fixedOption, autoOption];
        case 'FLEX':
            return [noneOption, autoOption];
        case 'NONE':
            return [noneOption, autoOption];
    }
    return [noneOption];
}

