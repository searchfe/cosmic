import { ContainerMixin } from '../../document';
import { paintToRgbaString } from './color';
import type { NodeStyle } from './types';

export function makeBackgroundStyle(node: ContainerMixin) {
    const styles: NodeStyle = {};
    if (node.backgrounds && node.backgrounds.length) {
        styles.background = paintToRgbaString(node?.backgrounds[0]);
    }
    return styles;
}

