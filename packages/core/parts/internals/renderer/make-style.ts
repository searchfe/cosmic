import { hasMixin, SceneNode, BaseFrameMixin, FramePrototypingMixin, LayoutMixin, ConstraintMixin, ConstraintType } from '@cosmic/core/parts';

interface NodeStyle {
    [index: string]: string,
}

export function makeStyle(node: SceneNode): NodeStyle {
    let styles: NodeStyle = {

    };
    const classes: string[] = [];
    if (hasMixin(node, BaseFrameMixin)) {
        styles = { ...styles, ...makeBaseFrameStyle(node) };
    }
    if (hasMixin(node, FramePrototypingMixin)) {
        styles = { ...styles, ...makeFramePrototypingStyle(node) };
    }
    if (hasMixin(node, LayoutMixin) && hasMixin(node, ConstraintMixin) && node.parent) {
        styles = { ...styles, ...makeLayoutStyle(node)};
    }
    return styles;
}

export function makeBaseFrameStyle(node: BaseFrameMixin) {
    const styles: NodeStyle = {};
    if(node.paddingLeft || node.paddingRight || node.paddingTop || node.paddingBottom) {
        styles.padding = [node.paddingTop + 'px'  || 0, node.paddingRight + 'px'  || 0, node.paddingBottom + 'px'  || 0, node.paddingLeft + 'px' || 0].join(' ');
    }
    if (node.layoutMode === 'HORIZONTAL' || node.layoutMode === 'VERTICAL') {
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

export function  makeLayoutStyle(node: LayoutMixin & ConstraintMixin) {
    const styles: NodeStyle = {};
    const parent = (node as any)?.parent;
    const parentWidth = parent.width || 0;
    const parentHeight = parent.height || 0;
    if(parent.layoutMode !== 'VERTICAL' && parent.layoutMode !== 'HORIZONTAL') {
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
