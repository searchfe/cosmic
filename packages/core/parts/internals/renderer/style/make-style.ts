import { hasMixin, SceneNode, BaseFrameMixin, FramePrototypingMixin, LayoutMixin, ConstraintMixin, ContainerMixin } from '../../document';
import type { NodeStyle } from './types';

import { makeBaseFrameStyle, makeFramePrototypingStyle } from './frame';
import { makeLayoutStyle } from './layout';
import { makeBackgroundStyle } from './background';


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
    if (hasMixin(node, ContainerMixin)) {
        styles = { ...styles, ...makeBackgroundStyle(node) };
    }
    return styles;
}
