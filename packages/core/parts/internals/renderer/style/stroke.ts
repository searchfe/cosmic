import { MinimalStrokesMixin } from '../../document';
import { paintToRgbaString } from './color';
import type { NodeStyle } from './types';

export function makeStrokeStyle(node: MinimalStrokesMixin) {
    const styles: NodeStyle = {};
    const { strokeWeight, strokeLineStyle, strokes = [] } = node;
    const [fill] = strokes;
    const color = paintToRgbaString(fill);
    styles.border = `${strokeWeight}px ${strokeLineStyle} ${color}`;
    return styles;
}

