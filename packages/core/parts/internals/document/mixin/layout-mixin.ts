type Transform = Internal.Transform;
type Rect = Internal.Rect;
import ConstraintMixin, { Constraints, ConstraintType } from './constraint-mixin';
import { round } from '@cosmic/core/lodash';
export default class LayoutMixin implements Internal.LayoutMixin {
    readonly absoluteTransform: Transform;
    relativeTransform: Transform;
    x = 0;
    y = 0;

    rotation: number; // In degrees

    width: number;
    height: number;
    readonly absoluteRenderBounds: Rect | null;
    constrainProportions: boolean;

    layoutAlign: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH' | 'INHERIT' = 'INHERIT'; // applicable only inside auto-layout frames
    layoutGrow: number;


    resize(width: number, height: number) {
        const deltaX = width - this.width;
        const deltaY = height - this.height;

        this.width = width;
        this.height = height;
        ((this as any).children || []).forEach((child: any) => {
            if(child.constraints && child.layoutAlign) {
                layoutChild(this as any, child, deltaX, deltaY);
            }
            child.resize(child.width, child.height);
            child.update();
        });
    }
    resizeWithoutConstraints(width: number, height: number) {
        // TODO
    }
    rescale(scale: number) {
        // TODO
    }
}
function layoutChild(parent: Internal.BaseFrameMixin,node: LayoutMixin & ConstraintMixin, deltaX: number, deltaY: number) {
    if (parent.layoutMode !== 'NONE') return;
    switch(node.constraints.horizontal) {
        case ConstraintType.MAX:
            node.x = round(node.x + deltaX);
            break;
        case ConstraintType.STRETCH:
            node.width = round(node.width + deltaX);
            break;
        case ConstraintType.CENTER:
            node.x = node.x + deltaX / 2;
            break;
        case ConstraintType.SCALE:
            node.width = round(node.width / (parent.width - deltaX) * parent.width, 1);
            node.x = round(node.x / (parent.width - deltaX) * parent.width, 1);
            break;
    }
    switch(node.constraints.vertical) {
        case ConstraintType.MAX:
            node.y = round(node.y + deltaY);
            break;
        case ConstraintType.STRETCH:
            node.height = round(node.height + deltaY);
            break;
        case ConstraintType.CENTER:
            node.y = node.y + deltaY / 2;
            break;
        case ConstraintType.SCALE:
            node.height = round(node.height / (parent.height - deltaY) * parent.height, 1);
            node.y = round(node.y / (parent.height - deltaY) * parent.height, 1);
            break;
    }
}
