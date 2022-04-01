import { Mixin } from 'ts-mixer';
import DefaultFrameMixin from '../mixin/default-frame-mixin';
import { pick } from 'lodash';
import { serializable } from '../../../util/serializable';

export interface FrameNodeOptions {
    x?: number,
    y?: number,
    width?: number;
    height?: number;
}

@serializable('FRAME')
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

    setRangeFills(start: number, end: number, value: Internal.Paint[]) {
        this.fills = [...value];
    }

    setRangeFillStyleId(start: number, end: number, value: string): void {
        this.fillStyleId = value;
    }

    getRangeFillStyleId(start: number, end: number): string {
        return this.fillStyleId as string;
    }
    serialize() {
        const plainObj = pick(this, ['x', 'y', 'width', 'height']);
        plainObj.children = this.children.map(child => ({
            type: child.type,
            data: child.serialize(),
        }));
        return {
            data: plainObj,
            type: this.type,
        };
    }
}
