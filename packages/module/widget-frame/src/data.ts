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
    const staticOption: AxisSizingType = {
        label: `${direction === 'counter' ? '高度' : '宽度'}固定`,
        value: 'NONE',
    };
    const autoOption : AxisSizingType = {
        label: '适应内容',
        value: 'AUTO',
    };
    //'NONE' | 'FLEX' | 'FENCE' | 'GRID'
    const rs: AxisSizingType[] = [];
    if (direction === 'primary') {
        if (parentMode === 'NONE') {
            rs.push(staticOption);
        } else {
            rs.push(fixedOption);
        }
        if (mode !== 'NONE') {
            rs.push(autoOption);
        }
    } else {
        if (parentMode === 'NONE') {
            if (mode === 'NONE') {
                rs.push(staticOption);
                rs.push(autoOption);
            } else {
                rs.push(staticOption, autoOption);
            }
        } else {
            rs.push(staticOption, autoOption);
        }
    }
    return rs;
}

