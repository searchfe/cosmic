import { Mixin } from 'ts-mixer';
import BaseNodeMixin from './base-node-mixin';
import BlendMixin from './blend-mixin';
import ExportMixin from './export-mixin';
import GeometryMixin from './geometry-mixin';
import LayoutMixin from './layout-mixin';
import ReactionMixin from './reaction-mixin';
import SenceNodeMixin from './scene-node-mixin';

export default class DefaultShapeMixin
    extends Mixin(
        BaseNodeMixin,
        SenceNodeMixin,
        ReactionMixin,
        BlendMixin,
        GeometryMixin,
        LayoutMixin,
        ExportMixin,
    )
    implements Internal.DefaultShapeMixin{

}