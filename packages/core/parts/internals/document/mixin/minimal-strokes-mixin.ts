export default class MinimalStrokesMixin implements Internal.MinimalStrokesMixin, Cosmic.Plugin.StrokesMixin {
    strokes: ReadonlyArray<Internal.Paint>;
    strokeStyleId: string;
    strokeWeight: number;
    strokeJoin: Internal.StrokeJoin | Internal.PluginAPI['mixed'];
    strokeAlign: 'CENTER' | 'INSIDE' | 'OUTSIDE';
    dashPattern: ReadonlyArray<number>;
    strokeGeometry: Internal.VectorPaths;
    strokeLineStyle: string;
}