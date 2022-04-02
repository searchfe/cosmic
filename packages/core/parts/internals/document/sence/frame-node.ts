import { Mixin } from 'ts-mixer';
import DefaultFrameMixin from '../mixin/default-frame-mixin';
import { pick } from 'lodash';
import { serializable } from '../../../util/serializable';

export interface FrameNodeOptions {
    x?: number,
    y?: number,
    width?: number;
    height?: number;
    id?: string;
    name?: string;
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
        this.id = option.id || '';
        this.name = option.name || '';
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
        // const plainObj = pick(this, ['x', 'y', 'width', 'height']);
        // plainObj.children = this.children.map(child => ({
        //     type: child.type,
        //     ...child.serialize(),
        // }));
        // plainObj.backgrounds = this.backgrounds.map(bg => bg.serialize());
        return {
            id: this.id,
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            children: this.children.map(child => child.serialize()),
            backgrounds: (this.backgrounds || []).map(bg => bg),
            name: this.name,
            type: this.type,

        };
    }
}
