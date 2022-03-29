import { Mixin } from 'ts-mixer';
import BaseNodeMixin from '../mixin/base-node-mixin';
import BlendMixin from '../mixin/blend-mixin';
import ChildrenMixin from '../mixin/children-mixin';
import ContainerMixin from '../mixin/container-mixin';
import ExportMixin from '../mixin/export-mixin';
import LayoutMixin from '../mixin/layout-mixin';
import ReactionMixin from '../mixin/reaction-mixin';
import SceneNodeMixin from '../mixin/scene-node-mixin';

export default class GroupNode
    extends Mixin(
        BaseNodeMixin, SceneNodeMixin, ReactionMixin,
        ChildrenMixin, ContainerMixin, BlendMixin,
        LayoutMixin, ExportMixin,
    )
    implements Internal.GroupNode{
    readonly type = 'GROUP';
    clone() {
        return new GroupNode();
    }
}