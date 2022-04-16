import { Mixin } from 'ts-mixer';
import DefaultFrameMixin from '../mixin/default-frame-mixin';
import { serializable } from '../serialize';

@serializable()
export default class FrameNode extends Mixin(DefaultFrameMixin) implements Internal.FrameNode {
    readonly type = 'FRAME';

    radiusStyleId: string;

    backgroundStyleId: string;

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
}
