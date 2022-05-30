import { LayoutMixin, ConstraintMixin, ConstraintType } from '../../document';
import type { NodeStyle } from './types';

export function  makeLayoutStyle(node: LayoutMixin & ConstraintMixin) {
    const styles: NodeStyle = {};
    const parent = (node as any)?.parent;
    const parentWidth = parent.width || 0;
    const parentHeight = parent.height || 0;
    const layoutGrid = parent.layoutGrids?.[0];
    if (layoutGrid) {
        if (layoutGrid.pattern === 'ROWS' || layoutGrid.pattern === 'COLUMNS') {
            styles['grid-column'] = `span ${node.colSize}`;
            styles['grid-row'] = `span ${node.rowSize}`;
        // } else if (layoutGrid.pattern === 'COLUMNS') {
        //     styles['grid-row'] = `span ${node.rowSize}`;
        }
    } else if(parent.layoutMode !== 'VERTICAL' && parent.layoutMode !== 'HORIZONTAL') {
        styles.position = 'absolute';
        switch(node.constraints.horizontal) {
            case ConstraintType.MIN:
                styles.left = node.x + 'px';
                styles.width = node.width + 'px';
                break;
            case ConstraintType.MAX:
                styles.right = (parentWidth - node.x - node.width) + 'px';
                styles.width = node.width + 'px';
                break;
            case ConstraintType.CENTER:
                styles.left = '50%';
                styles.marginLeft = (node.x - parentWidth / 2) + 'px';
                styles.width = node.width + 'px';
                break;
            case ConstraintType.STRETCH:
                styles.left = node.x + 'px';
                styles.width = `calc(100% - ${parentWidth - node.width}px)`;
                break;
            case ConstraintType.SCALE:
                styles.left = Math.round(node.x * 1000 / parentWidth) / 10 + '%';
                styles.width = Math.round(node.width * 1000 / parentWidth) / 10 + '%';
                break;
        }

        switch(node.constraints.vertical) {
            case ConstraintType.MIN:
                styles.top = node.y + 'px';
                styles.height = node.height + 'px';
                break;
            case ConstraintType.MAX:
                styles.bottom = (parentHeight - node.y - node.height) + 'px';
                styles.height = node.height + 'px';
                break;
            case ConstraintType.CENTER:
                styles.top = '50%';
                styles.marginTop = (node.y - parentHeight / 2) + 'px';
                styles.height = node.height + 'px';
                break;
            case ConstraintType.STRETCH:
                styles.top = node.y + 'px';
                styles.height = `calc(100% - ${parentHeight - node.height}px)`;
                break;
            case ConstraintType.SCALE:
                styles.top = Math.round(node.x * 1000 / parentHeight) / 10 + '%';
                styles.height = Math.round(node.height * 1000 / parentHeight) / 10 + '%';
                break;
        }
    } else {
        styles.width = node.width + 'px';
        styles.height = node.height + 'px';
        styles['flex-shrink'] = '0';
    }
    return styles;
}
