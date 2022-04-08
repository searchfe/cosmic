import { Mixin } from 'ts-mixer';
import DefaultFrameMixin from '../mixin/default-frame-mixin';
import PublishableMixin from '../mixin/publishable-mixin';
import VariantMixin from '../mixin/variant-mixin';
import { serializable } from '../serialize';


@serializable()
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
        this.name = option.name || '';
        this.backgrounds = [];
    }
    clone() {
        // TODO
        return '' as any;
    }
    createInstance() {
        // TODO
        return '' as any;
    }
}

export interface ComponentNodeOptions {
    id?: string,
    name?: string,
    x?: number,
    y?: number,
    width?: number;
    height?: number;
    cname?: string;
}
