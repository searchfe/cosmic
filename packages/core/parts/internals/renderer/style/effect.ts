import { BlendMixin } from '../../document';
import type { NodeStyle } from './types';

export function makeEffectStyle(node: BlendMixin) {
    const styles: NodeStyle = {};
    // const { topLeftRadius = 0, topRightRadius = 0, bottomLeftRadius = 0, bottomRightRadius = 0 } = node;
    // styles.borderRadius = `${topLeftRadius}px ${topRightRadius}px  ${bottomRightRadius}px ${bottomLeftRadius}px`;
    return styles;
}

