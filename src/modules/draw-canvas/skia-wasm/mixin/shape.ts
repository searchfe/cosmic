import { Mixin } from 'ts-mixer';
import { CornerMixin, RectangleCornerMixin } from './corner';
import { LayoutMixin } from './layout';
import { GeometryMixin } from './geometry';

export class DefaultShapeMixin extends Mixin(CornerMixin, RectangleCornerMixin, LayoutMixin, GeometryMixin) {}
