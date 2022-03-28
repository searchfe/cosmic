import { Mixin } from 'ts-mixer';
import MinimalFillsMixin from './minimal-fills-mixin';
import MinimalStrokesMixin from './minimal-strokes-mixin';

export default class GeometryMixin
    extends Mixin(MinimalStrokesMixin, MinimalFillsMixin) implements Internal.GeometryMixin{
    strokeCap: Internal.StrokeCap | Internal.PluginAPI['mixed'];
    strokeMiterLimit: number;
    outlineStroke() {
        // TODO
        return null;
    }
}