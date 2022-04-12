import { Paint, SolidPaint } from '../internals';
export function toBackgroundStyle(paint: Paint) {
    if (!paint || !paint) return '';
    if (paint.type === 'SOLID') return toBackgroundStyleFromSolid(paint);
}

function toBackgroundStyleFromSolid(paint: SolidPaint) {
    if(!paint.color) return '';
    return `rgba(${paint.color.r}, ${paint.color.g}, ${paint.color.b}, ${paint.opacity})`;
}
