import { Mixin } from 'ts-mixer';
import BaseNodeMixin from '../mixin/base-node-mixin';
import ChildrenMixin from '../mixin/children-mixin';
import ExportMixin from '../mixin/export-mixin';

export default class PageNode
    extends Mixin(BaseNodeMixin, ChildrenMixin, ExportMixin) implements Internal.PageNode {
    readonly type = 'PAGE';
    clone() {
        // TODO
        return new PageNode();
    }

    guides = [];
    selection = [];
    selectedTextRange = null;
    flowStartingPoints = [];
    backgrounds = [];

    prototypeBackgrounds = [];

    readonly prototypeStartNode = null;
}