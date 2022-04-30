type Transform = Internal.Transform;
type Rect = Internal.Rect;
import ConstraintMixin, { Constraints, ConstraintType } from './constraint-mixin';
import { round } from '@cosmic/core/lodash';
import type BaseFrameMixin from './base-frame-mixin';
import { hasMixin } from 'ts-mixer';
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
        const childs = ((this as any).children || []);
        childs.forEach((child: any) => {
            if(child.constraints && child.layoutAlign) {
                layoutAbsoluteChild(this as any, child, deltaX, deltaY);
            }
        });
        layoutFlex(this as any, childs);
        for (const child of childs) {
            child.resize(child.width, child.height);
            child.update(true);
        }
        const parent = (this as any).parent as any;
        if ((deltaX || deltaY) && hasMixin(parent, LayoutMixin)) {
            parent.resize(parent.width, parent.height);
            // (parent as any)?.update(true);
        }
    }
    resizeWithoutConstraints(width: number, height: number) {
        // TODO
    }
    rescale(scale: number) {
        // TODO
    }
}
function layoutAbsoluteChild(parent: Internal.BaseFrameMixin,node: LayoutMixin & ConstraintMixin, deltaX: number, deltaY: number) {
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

function layoutFlex(parent: BaseFrameMixin, childs: Array<LayoutMixin & ConstraintMixin>) {
    let offsetX = parent.paddingLeft, offsetY =  parent.paddingTop;
    const maxWidth = parent.width - parent.paddingLeft - parent.paddingRight;
    const maxHeight = parent.height - parent.paddingTop - parent.paddingBottom;
    let lineHeight = 0;
    let lineWidth = 0;
    let cursor = 0;
    for(const child of childs) {
        if (parent.layoutMode === 'HORIZONTAL') {
            child.x = offsetX;
            if (parent.layoutWrap == 'WRAP') {
                if (child.x + child.width > maxWidth && cursor > 0) {
                    child.x = parent.paddingLeft;
                    offsetY += lineHeight;
                    lineHeight = 0;
                }
            }
            lineHeight = Math.max(child.height, lineHeight);
            child.y = offsetY;
            offsetX += child.width;
        } else if (parent.layoutMode === 'VERTICAL') {
            child.y = offsetY;
            if (parent.layoutWrap == 'WRAP') {
                if (child.y + child.height > maxHeight && cursor > 0) {
                    child.y =  parent.paddingTop;
                    offsetX += lineWidth;
                    lineWidth = 0;
                }
            }
            lineWidth = Math.max(child.width, lineWidth);
            child.x = offsetX;
            offsetY += child.height;
        }
        cursor++;
    }
    //
}
