import { Mixin } from 'ts-mixer';
import DefaultFrameMixin from '../mixin/default-frame-mixin';
import PublishableMixin from '../mixin/publishable-mixin';
import VariantMixin from '../mixin/variant-mixin';

export default class ComponentNode extends Mixin(
    DefaultFrameMixin,
    PublishableMixin,
    VariantMixin,
) implements Internal.ComponentNode {
    readonly type = 'COMPONENT';
    clone() {
        // TODO
        return '' as any;
    }
    createInstance() {
        // TODO
        return '' as any;
    }
}
