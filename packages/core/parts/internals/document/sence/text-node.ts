import { Mixin } from 'ts-mixer';
import ConstraintMixin from '../mixin/constraint-mixin';
import DefaultShapeMixin from '../mixin/default-shape-mixin';
import TextSublayerNode from './text-sublayer-node';
import { serializable } from '../serialize';


export interface TextNodeOptions {
    x?: number,
    y?: number,
    width?: number;
    height?: number;
    name?: string;
    id?: string;
}
@serializable()
export default class TextNode
    extends Mixin(
        ConstraintMixin,
        DefaultShapeMixin,
        TextSublayerNode,
    )
    implements Internal.TextNode{
    readonly type = 'TEXT';
    constructor(option?: TextNodeOptions) {
        super();
        option = option || {};
        this.x = option.x || 0;
        this.y = option.y || 0;
        this.width = option.width || 0;
        this.height = option.height || 0;
        this.fontSize = 12;
        this.name = option.name || '';
    }
    clone() {
        return this as any;
    }

    textAlignHorizontal: 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFIED';
    textAlignVertical: 'TOP' | 'CENTER' | 'BOTTOM';
    textAutoResize: 'NONE' | 'WIDTH_AND_HEIGHT' | 'HEIGHT';
    autoRename: boolean;

    textStyleId: string | Internal.PluginAPI['mixed'];

    setRangeFontSize(start: number, end: number, value: number) {
        this.fontSize = value;
    }

    setRangeFontName(start: number, end: number, value: Internal.FontName) {
        this.fontName = value;
    }

    setRangeTextStyleId(start: number, end: number, styleId: string) {
        this.textStyleId = styleId;
    }

    getRangeTextStyleId(start: number, end: number):string {
        return this.textStyleId as string;
    }

    setRangeFills(start: number, end: number, value: Internal.Paint[]) {
        this.fills = [...value];
    }

    setRangeFillStyleId(start: number, end: number, value: string): void {
        this.fillStyleId = value;
    }

    getRangeFillStyleId(start: number, end: number): string {
        return this.fillStyleId as string;
    }
}
