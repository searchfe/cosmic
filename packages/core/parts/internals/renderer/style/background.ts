import { ContainerMixin, Paint, SolidPaint } from '../../document';
import type { NodeStyle } from './types';

export function makeBackgroundStyle(node: ContainerMixin) {
    const styles: NodeStyle = {};
    if (node.backgrounds && node.backgrounds.length) {
        styles.background = toBackgroundStyle(node?.backgrounds[0]);
    }
    return styles;
}

export function toBackgroundStyle(paint: Paint) {
    if (!paint || !paint) return '';
    if (paint.type === 'SOLID') return toBackgroundStyleFromSolid(paint);
    return '';
}

function toBackgroundStyleFromSolid(paint: SolidPaint) {
    if(!paint.color) return '';
    return `rgba(${paint.color.r}, ${paint.color.g}, ${paint.color.b}, ${paint.opacity})`;
}
