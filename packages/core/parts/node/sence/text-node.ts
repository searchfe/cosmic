import { Mixin } from 'ts-mixer';
import ConstraintMixin from '../mixin/constraint-mixin';
import DefaultShapeMixin from '../mixin/default-shape-mixin';
import TextSublayerNode from './text-sublayer-node';

export default class TextNode
    extends Mixin(
        ConstraintMixin,
        DefaultShapeMixin,
        TextSublayerNode,
    )
    implements Internal.TextNode{
    readonly type = 'TEXT';
    clone() {
        return this as any;
    }

    textAlignHorizontal: 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFIED';
    textAlignVertical: 'TOP' | 'CENTER' | 'BOTTOM';
    textAutoResize: 'NONE' | 'WIDTH_AND_HEIGHT' | 'HEIGHT';
    autoRename: boolean;

    textStyleId: string | Internal.PluginAPI['mixed'];
}
