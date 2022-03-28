import { Mixin } from 'ts-mixer';
import BaseNodeMixin from './base-node-mixin';
import BlendMixin from './blend-mixin';
import ChildrenMixin from './children-mixin';
import CornerMixin from './coner-mixin';
// import ConstraintMixin from './constraint-mixin';
import ContainerMixin from './container-mixin';
import ExportMixin from './export-mixin';
import GeometryMixin from './geometry-mixin';
import LayoutMixin from './layout-mixin';
import RectangleCornerMixin from './rectangle-corner-mixin';
import SenceNodeMixin from './scene-node-mixin';

export default class BaseFrameMixin
    extends Mixin(
        BaseNodeMixin,
        SenceNodeMixin,
        ChildrenMixin,
        ContainerMixin,
        GeometryMixin,
        CornerMixin,
        RectangleCornerMixin,
        BlendMixin,
        // ConstraintMixin,
        LayoutMixin,
        ExportMixin,
    ) implements Internal.BaseFrameMixin{
    constraints: Internal.Constraints;        
    layoutMode: 'NONE' | 'HORIZONTAL' | 'VERTICAL';
    primaryAxisSizingMode: 'FIXED' | 'AUTO'; // applicable only if layoutMode != 'NONE'
    counterAxisSizingMode: 'FIXED' | 'AUTO'; // applicable only if layoutMode != 'NONE'
  
    primaryAxisAlignItems: 'MIN' | 'MAX' | 'CENTER' | 'SPACE_BETWEEN'; // applicable only if layoutMode != 'NONE'
    counterAxisAlignItems: 'MIN' | 'MAX' | 'CENTER'; // applicable only if layoutMode != 'NONE'
  
  
    paddingLeft: number; // applicable only if layoutMode != 'NONE'
    paddingRight: number; // applicable only if layoutMode != 'NONE'
    paddingTop: number; // applicable only if layoutMode != 'NONE'
    paddingBottom: number; // applicable only if layoutMode != 'NONE'
    itemSpacing: number; // applicable only if layoutMode != 'NONE'
  
    horizontalPadding: number; // DEPRECATED: use the individual paddings
    verticalPadding: number; // DEPRECATED: use the individual paddings
  
    layoutGrids: ReadonlyArray<Internal.LayoutGrid>;
    gridStyleId: string;
    clipsContent: boolean;
    guides: ReadonlyArray<Internal.Guide>;
}
