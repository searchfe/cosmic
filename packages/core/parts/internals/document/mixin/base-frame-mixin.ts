import { Mixin } from 'ts-mixer';
import BaseNodeMixin from './base-node-mixin';
import BlendMixin from './blend-mixin';
import ChildrenMixin from './children-mixin';
import CornerMixin from './coner-mixin';
import ConstraintMixin from './constraint-mixin';
import ContainerMixin from './container-mixin';
import ExportMixin from './export-mixin';
import GeometryMixin from './geometry-mixin';
import LayoutMixin from './layout-mixin';
import RectangleCornerMixin from './rectangle-corner-mixin';
import SenceNodeMixin from './scene-node-mixin';

import type { LayoutGrid } from '../';

export default class BaseFrameMixin
    extends Mixin(Mixin(
        BaseNodeMixin,
        SenceNodeMixin,
        ChildrenMixin,
        ContainerMixin,
        GeometryMixin,
        CornerMixin,
        RectangleCornerMixin,
        BlendMixin,
        LayoutMixin,
        ExportMixin,
    ), ConstraintMixin) {
    layoutMode: 'NONE' | 'HORIZONTAL' | 'VERTICAL' = 'NONE';
    primaryAxisSizingMode: 'FIXED' | 'AUTO' | 'NONE' = 'NONE'; // applicable only if layoutMode != 'NONE'
    counterAxisSizingMode: 'FIXED' | 'AUTO' | 'NONE' = 'NONE'; // applicable only if layoutMode != 'NONE'

    
    primaryAxisAlignItems: 'MIN' | 'MAX' | 'CENTER' | 'SPACE_BETWEEN' = 'MIN'; // applicable only if layoutMode != 'NONE'  flex-start  等距 space-between justify-content: flex-start | flex-end | center | space-between | space-around; 行内分布
    counterAxisAlignItems: 'MIN' | 'MAX' | 'CENTER'  = 'MIN'; // applicable only if layoutMode != 'NONE' align-items: flex-start | flex-end | center | baseline | stretch; 行内 上中下

    primaryAxisAlignContent: 'MIN' | 'MAX' | 'CENTER' | 'SPACE_BETWEEN' = 'MIN'; // COSMIC PROP

    // primaryAlignContent 多行整体上中下
    // flex-start：与交叉轴的起点对齐。
    // flex-end：与交叉轴的终点对齐。
    // center：与交叉轴的中点对齐。
    // space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
    // space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
    // stretch（默认值）：轴线占满整个交叉轴。


    paddingLeft = 0; // applicable only if layoutMode != 'NONE'
    paddingRight = 0; // applicable only if layoutMode != 'NONE'
    paddingTop = 0; // applicable only if layoutMode != 'NONE'
    paddingBottom = 0; // applicable only if layoutMode != 'NONE'
    itemSpacing = 0; // applicable only if layoutMode != 'NONE'

    horizontalPadding: number; // DEPRECATED: use the individual paddings
    verticalPadding: number; // DEPRECATED: use the individual paddings

    layoutGrids: Array<LayoutGrid> = [];
    gridStyleId: string;
    clipsContent: boolean;
    guides: ReadonlyArray<Internal.Guide>;

    layoutWrap: 'NONE' | 'WRAP' = 'NONE'; // COSMIC PROP
}
