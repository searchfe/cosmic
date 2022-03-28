export default class MinimalFillsMixin implements Internal.MinimalFillsMixin {
    fills: ReadonlyArray<Internal.Paint> | Internal.PluginAPI['mixed'];
    fillStyleId: string | Internal.PluginAPI['mixed'];
    fillGeometry: Internal.VectorPaths;
}