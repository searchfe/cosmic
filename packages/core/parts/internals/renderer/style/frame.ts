import { BaseFrameMixin, FramePrototypingMixin } from '../../document';
import type { NodeStyle } from './types';


export function makeBaseFrameStyle(node: BaseFrameMixin) {
    const styles: NodeStyle = {};
    if(node.paddingLeft || node.paddingRight || node.paddingTop || node.paddingBottom) {
        styles.padding = [node.paddingTop + 'px'  || 0, node.paddingRight + 'px'  || 0, node.paddingBottom + 'px'  || 0, node.paddingLeft + 'px' || 0].join(' ');
    }
    const layoutGrid = node.layoutGrids[0];
    if (layoutGrid) {
        styles.display = 'grid';
        styles.position = 'relative';
        if (layoutGrid.pattern === 'ROWS') {
            styles['grid-template-columns'] = `repeat(${layoutGrid.count}, 1fr)`;
            styles['grid-column-gap'] = `${layoutGrid.gutterSize}px`;
        } else if (layoutGrid.pattern === 'COLUMNS') {
            styles['grid-template-rows'] = `repeat(${layoutGrid.count}, 1fr)`;
            styles['grid-row-gap'] = `${layoutGrid.gutterSize}px`;
        } else if (layoutGrid.pattern === 'GRID') {
            styles['grid-template-columns'] = '1fr';
        }
        //
    } else if (node.layoutMode === 'HORIZONTAL' || node.layoutMode === 'VERTICAL') {
        styles.display = 'flex';
        styles['flex-direction'] = node.layoutMode === 'VERTICAL' ? 'column': '';

        styles['align-content'] = {
            'MIN': 'flex-start', 'CENTER': 'center', 'MAX': 'flex-end', 'SPACE_BETWEEN': 'space-between',
        }[node.primaryAxisAlignContent];

        styles['justify-content'] = {
            'MIN': 'flex-start', 'CENTER': 'center', 'MAX': 'flex-end', 'SPACE_BETWEEN': 'space-between',
        }[node.primaryAxisAlignItems];

        styles['align-items'] = {
            'MIN': 'flex-start', 'CENTER': 'center', 'MAX': 'flex-end',
        }[node.counterAxisAlignItems];
        if (node.layoutWrap === 'WRAP') styles['flex-wrap'] = 'wrap';
    } else if(node.children && node.children.length) {
        styles.position = 'absolute';
    }
    return  styles;
}

export function makeFramePrototypingStyle(node: FramePrototypingMixin) {
    const styles: NodeStyle = {};
    switch(node.overflowDirection) {
        case 'BOTH':
            styles.overflow = 'visible';
            break;
        case 'HORIZONTAL':
            styles['overflow-y'] = 'scroll';
            break;
        case 'VERTICAL':
            styles['overflow-x'] = 'scroll';
             break;
        default:
            styles['overflow'] = 'hidden';
            break;
    }

    return  styles;
}
