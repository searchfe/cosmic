import { hasMixin, SceneNode, BaseFrameMixin, FramePrototypingMixin, LayoutMixin } from '@cosmic/core/parts';

interface NodeStyle {
    [index: string]: string,
}

interface NodeData {
    styles: NodeStyle,
    classes: string[],
}

export function makeNode(node: SceneNode): NodeData {
    let styles: NodeStyle = {

    };
    const classes: string[] = [];
    if (hasMixin(node, BaseFrameMixin)) {
        styles = { ...styles, ...makeBaseFrameStyle(node) };
    }
    if (hasMixin(node, FramePrototypingMixin)) {
        styles = { ...styles, ...makeFramePrototypingStyle(node) };
    }
    if (hasMixin(node, LayoutMixin) && node.parent) {
        styles = { ...styles, ...makeLayoutStyle(node)};
    }

    return {
        styles,
        classes,
    };
}

export function makeBaseFrameStyle(node: BaseFrameMixin) {
    const styles: NodeStyle = {};
    if(node.paddingLeft || node.paddingRight || node.paddingTop || node.paddingBottom) {
        styles.padding = [node.paddingTop + 'px'  || 0, node.paddingRight + 'px'  || 0, node.paddingBottom + 'px'  || 0, node.paddingLeft + 'px' || 0].join(' ');
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

export function  makeLayoutStyle(node: LayoutMixin) {
    const styles: NodeStyle = {};
    switch(node.HorizontalLayout) {
        case 0:
            styles.left = node.x + 'px';
            styles.width = node.width + 'px';
            break;
        case 1:
            styles.right = node.r + 'px';
            styles.width = node.width + 'px';
            break;
        case 2:
            styles.left = node.x + 'px';
            styles.width = ((node as any).parent.width - node.x - node.r) + 'px';
            break;
        case 3:
            break;
        case 4:
            break;
    }
    switch(node.VerticalLayout) {
        case 0:
            styles.top = node.y + 'px';
            styles.height = node.height + 'px';
            break;
        case 1:
            styles.bottom = node.b + 'px';
            styles.height = node.height + 'px';
            break;
        case 2:
            styles.top = node.y + 'px';
            styles.height = ((node as any).parent.height - node.y - node.b) + 'px';
            break;
        case 3:
            break;
        case 4:
            break;
    }
    if(node?.parent.type == 'PAGE') {
        styles.width = '100%';
        styles.position = 'relative';
    }
    return styles;
}