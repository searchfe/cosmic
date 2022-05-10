import { Paint, SolidPaint } from '../../document';

export function paintToRgbaString(paint: Paint) {
    if (!paint || !paint) return '';
    if (paint.type === 'SOLID') return solidToRgbaString(paint);
    return '';
}

export function solidToRgbaString(paint: SolidPaint) {
    if(!paint.color) return '';
    return `rgba(${paint.color.r}, ${paint.color.g}, ${paint.color.b}, ${paint.opacity})`;
}
