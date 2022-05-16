import { Paint } from '../property';
export default class MinimalFillsMixin implements Internal.MinimalFillsMixin {
    fills: Array<Paint> | Internal.PluginAPI['mixed'];
    fillStyleId: string | Internal.PluginAPI['mixed'];
    fillGeometry: Internal.VectorPaths;
}