import { Mixin } from 'ts-mixer';
import DefaultFrameMixin from '../mixin/default-frame-mixin';

export default class FrameNode extends Mixin(DefaultFrameMixin) implements Internal.FrameNode {
    readonly type = 'FRAME';
    clone() {
        // TODO
        return new FrameNode();
    }
}
