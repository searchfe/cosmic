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

    colSize = 1;
    rowSize = 1;


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

function getAttrs(layoutMode: string) {
    if (layoutMode === 'HORIZONTAL') {
        return { primary : 'x', counter : 'y', primarySize : 'width', counterSize : 'height', paddingMin: 'paddingLeft', paddingMax: 'paddingRight'};
    }
    return { primary : 'y', counter : 'x', primarySize : 'height', counterSize : 'width', paddingMin: 'paddingTop', paddingMax: 'paddingBottom'};
}

function layoutFlex(parent: BaseFrameMixin, childs: Array<LayoutMixin & ConstraintMixin>) {
    if (parent.layoutMode != 'HORIZONTAL' && parent.layoutMode != 'VERTICAL') return;
    const p = parent as any;
    const { primary, counter, primarySize, counterSize, paddingMin, paddingMax} = getAttrs(parent.layoutMode);
    const primaryMaxSize = p[primarySize] - p[paddingMin] - p[paddingMax];
    const matrix: number[][] = [[]];
    const primarySizeSum: number[] = [0];
    const counterSizeMax: number[] = [0];
    let currentPos = p[paddingMin];
    childs.forEach((child: any, index) => {
        if (parent.layoutWrap == 'WRAP') {
            if (currentPos + child[primarySize] > primaryMaxSize) {
                matrix.push([]);
                counterSizeMax.push(0);
                primarySizeSum.push(0);
                currentPos = p[paddingMin];
            }
        }
        currentPos += child[primarySize];
        primarySizeSum.push((primarySizeSum.pop()|| 0) + child[primarySize]);
        matrix[matrix.length - 1].push(index);
        counterSizeMax.push(Math.max(counterSizeMax.pop() || 0, child[counterSize]));
    });
    let counterOffset = 0;
    matrix.forEach((cols, rowNum) => {
        let primaryOffset = p[paddingMin];
        let primarySpacing = 0;
        if(parent.primaryAxisAlignItems === 'MIN') {
            // do nothing
        } else if(parent.primaryAxisAlignItems === 'CENTER') {
            primaryOffset += (primaryMaxSize - primarySizeSum[rowNum]) / 2;
        } else if(parent.primaryAxisAlignItems === 'MAX') {
            primaryOffset += primaryMaxSize - primarySizeSum[rowNum];
        } else if(parent.primaryAxisAlignItems === 'SPACE_BETWEEN') {
            primarySpacing = cols.length > 1 ? (primaryMaxSize - primarySizeSum[rowNum]) / (cols.length - 1) : 0;
        }
        cols.forEach(idx => {
            const child = childs[idx] as any;
            child[primary] = round(primaryOffset, 1);
            primaryOffset += child[primarySize] + primarySpacing;

            let counterSpacing = 0;
            if(parent.counterAxisAlignItems === 'MIN') {
                // do nothing
            } else if(parent.counterAxisAlignItems === 'CENTER') {
                counterSpacing =  (counterSizeMax[rowNum] - child[counterSize]) / 2;
            } else if(parent.counterAxisAlignItems === 'MAX') {
                counterSpacing = counterSizeMax[rowNum] - child[counterSize];
            }
            child[counter] = round(counterOffset + counterSpacing);
        });
        counterOffset += counterSizeMax[rowNum];
    });
}
