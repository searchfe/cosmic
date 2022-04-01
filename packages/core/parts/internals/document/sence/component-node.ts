import { Mixin } from 'ts-mixer';
import DefaultFrameMixin from '../mixin/default-frame-mixin';
import PublishableMixin from '../mixin/publishable-mixin';
import VariantMixin from '../mixin/variant-mixin';
import { pick } from 'lodash';
import { serializable } from '../../../util/serializable';


@serializable('COMPONENT')
export default class ComponentNode extends Mixin(
    DefaultFrameMixin,
    PublishableMixin,
    VariantMixin,
) implements Internal.ComponentNode {
    readonly type = 'COMPONENT';
    cname: string;
    constructor(option?: ComponentNodeOptions) {
        super();
        option = option || {};
        this.x = option.x || 0;
        this.y = option.y || 0;
        this.width = option.width || 0;
        this.height = option.height || 0;
        this.cname = option.cname || '';
    }
    clone() {
        // TODO
        return '' as any;
    }
    createInstance() {
        // TODO
        return '' as any;
    }

    serialize() {
        return {
            data: pick(this, ['x', 'y', 'width', 'height', 'cname']),
            backgrounds: (this.backgrounds || []).map(bg => bg.serialize()),
            type: this.type,
        };
    }
}

export interface ComponentNodeOptions {
    x?: number,
    y?: number,
    width?: number;
    height?: number;
    cname?: string;
}
