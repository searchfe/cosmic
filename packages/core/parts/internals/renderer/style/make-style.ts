import { hasMixin, SceneNode, BaseFrameMixin, FramePrototypingMixin, LayoutMixin, ConstraintMixin, ContainerMixin, MinimalStrokesMixin, RectangleCornerMixin, BlendMixin } from '../../document';
import type { NodeStyle } from './types';

import { makeBaseFrameStyle, makeFramePrototypingStyle } from './frame';
import { makeLayoutStyle } from './layout';
import { makeBackgroundStyle } from './background';
import { makeStrokeStyle  } from './stroke';
import { makeRadiusStyle  } from './radius';
import { makeEffectStyle  } from './effect';
import { makeTextStyle } from './text';
import TextSublayerNode from '../../document/sence/text-sublayer-node';


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
    if (hasMixin(node, MinimalStrokesMixin)) {
        styles = { ...styles, ...makeStrokeStyle(node) };
    }
    if (hasMixin(node, RectangleCornerMixin)) {
        styles = { ...styles, ...makeRadiusStyle(node) };
    }
    if (hasMixin(node, BlendMixin)) {
        styles = { ...styles, ...makeEffectStyle(node) };
    }
    if (hasMixin(node, TextSublayerNode)) {
        styles = { ...styles, ...makeTextStyle(node) };
    }
    return styles;
}
