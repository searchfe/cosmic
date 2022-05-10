import { RectangleCornerMixin } from '../../document';
import type { NodeStyle } from './types';

export function makeRadiusStyle(node: RectangleCornerMixin) {
    const styles: NodeStyle = {};
    const { topLeftRadius = 0, topRightRadius = 0, bottomLeftRadius = 0, bottomRightRadius = 0 } = node;
    if (topLeftRadius || topRightRadius || bottomRightRadius || bottomLeftRadius) {
        styles['border-radius'] = `${topLeftRadius}px ${topRightRadius}px  ${bottomRightRadius}px ${bottomLeftRadius}px`;
    }

    return styles;
}

