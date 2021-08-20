
import type { DefaultShapeMixin } from './mixin.d';

interface RectangleCornerMixin {
    topLeftRadius: number
    topRightRadius: number
    bottomLeftRadius: number
    bottomRightRadius: number
}

export interface RectangleNode extends DefaultShapeMixin, RectangleCornerMixin {
    readonly type: 'RECTANGLE';
}

