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
        this.id = option.id || '';
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

    serialize() {
        return {
            id: this.id,
            name: this.name,
            cname: this.cname,
            backgrounds: this.backgrounds.map(bg => bg),
            children: this.children.map(child => child.serialize()),
            type: this.type,
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
        };
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
