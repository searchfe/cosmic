import { Mixin } from 'ts-mixer';
import DefaultFrameMixin from '../mixin/default-frame-mixin';

export interface FrameNodeOptions {
    x?: number,
    y?: number,
    width?: number;
    height?: number;
}

export default class FrameNode extends Mixin(DefaultFrameMixin) implements Internal.FrameNode {
    readonly type = 'FRAME';
    // width: number;
    // height: number;
    constructor(option?: FrameNodeOptions) {
        super();
        option = option || {};
        this.x = option.x || 0;
        this.y = option.y || 0;
        this.width = option.width || 0;
        this.height = option.height || 0;
    }
    clone() {
        // TODO
        return new FrameNode();
    }
}
