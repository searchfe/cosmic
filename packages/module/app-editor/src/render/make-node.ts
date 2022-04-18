import { hasMixin, SceneNode, BaseFrameMixin, FramePrototypingMixin } from '@cosmic/core/parts';

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
        styles = { ...makeBaseFrameStyle(node) };
    }
    if (hasMixin(node, FramePrototypingMixin)) {
        styles = { ...makeFramePrototypingStyle(node) };
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
