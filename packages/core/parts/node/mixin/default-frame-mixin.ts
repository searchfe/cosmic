import { Mixin } from 'ts-mixer';
import BaseFrameMixin from './base-frame-mixin';
import FramePrototypingMixin from './frame-prototyping-mixin';
import ReactionMixin from './reaction-mixin';

export default class DefaultFrameMixin
    extends Mixin(BaseFrameMixin, FramePrototypingMixin, ReactionMixin)
    implements Internal.DefaultFrameMixin {

}
// BaseFrameMixin,
// FramePrototypingMixin,
// ReactionMixin { }