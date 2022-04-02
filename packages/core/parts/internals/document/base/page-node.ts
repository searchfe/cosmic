import { Mixin } from 'ts-mixer';
import BaseNodeMixin from '../mixin/base-node-mixin';
import ChildrenMixin from '../mixin/children-mixin';
import ExportMixin from '../mixin/export-mixin';
import { Paint } from '../property';
import { serializable } from '../../../util/serializable';

interface Option {
    id?: string,
    name?: string,
}


@serializable('PAGE')
export default class PageNode
    extends Mixin(BaseNodeMixin, ChildrenMixin, ExportMixin) implements Internal.PageNode {
    readonly type = 'PAGE';
    clone() {
        // TODO
        return new PageNode();
    }
    constructor(option?: Option) {
        super();
        this.children = [];
        this.id = option?.id || '';
        this.name = option?.name || '';
    }

    guides = [];
    selection = [];
    selectedTextRange = null;
    flowStartingPoints = [];
    backgrounds: Paint[] = [];

    prototypeBackgrounds = [];

    readonly prototypeStartNode = null;

    serialize() {
        return {
            type: this.type,
            id: this.id,
            name: this.name,
            backgrounds: this.backgrounds.map(bg => bg),
            children: this.children.map(child => child.serialize()),
        };
    }
}
