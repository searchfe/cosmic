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

    private _colSize = 1;
    private _rowSize = 1;

    set colSize(size: number) {
        const equaled = size == this._colSize;
        this._colSize = size;
        if (!equaled) this.resizeParent();
    }
    get colSize() { return this._colSize; }
    set rowSize(size: number) {
        const equaled = size == this._rowSize;
        this._rowSize = size;
        if (!equaled) this.resizeParent();
    }
    get rowSize() { return this._rowSize; }

    private deltaX = 0;
    private deltaY = 0;
    resize(width: number, height: number) {
        this.deltaX = width - this.width;
        this.deltaY = height - this.height;
        let resized = !!(this.deltaX || this.deltaY);
        this.width = width;
        this.height = height;
        this.relayout();
        if (this.width !== width || this.height !== height) {
            resized = true;
        }
        if (resized) {
            this.resizeParent();
        }
    }
    relayout() {
        const childs = ((this as any).children || []);
        childs.forEach((child: any) => {
            if(child.constraints && child.layoutAlign) {
                layoutAbsoluteChild(this as any, child, this.deltaX, this.deltaY);
            }
        });
        layoutFlex(this as any, childs);
        layoutFence(this as any, childs);
        for (const child of childs) {
            child.resize(child.width, child.height);
            child.update(true);
        }
    }
    resizeWithoutConstraints(width: number, height: number) {
        // TODO
    }
    rescale(scale: number) {
        // TODO
    }

    private resizeParent() {
        const parent = (this as any).parent as any;
        if (parent && hasMixin(parent, LayoutMixin)) {
            parent.resize(parent.width, parent.height);
        }
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

function getAttrs(primaryDirection: 'HORIZONTAL' | 'VERTICAL') {
    if (primaryDirection === 'HORIZONTAL') {
        return {
            primary : 'x', counter : 'y',
            primarySize : 'width', counterSize : 'height',
            primaryOffsetStart: 'paddingLeft', primaryOffsetEnd: 'paddingRight',
            counterOffsetStart: 'paddingTop', counterOffsetEnd: 'paddingBottom',
            primaryN: 'colSize', counterN: 'rowSize',
        };
    }
    return {
        primary : 'y', counter : 'x',

        primarySize : 'height', counterSize : 'width',
        primaryOffsetStart: 'paddingTop', primaryOffsetEnd: 'paddingBottom',
        counterOffsetStart: 'paddingLeft', counterOffsetEnd: 'paddingRight',
        primaryN: 'rowSize', counterN: 'colSize',
    };
}

function layoutFlex(parent: BaseFrameMixin, childs: Array<LayoutMixin & ConstraintMixin>) {
    /** Flex 布局思路 先定每行列的元素分布情况 第一轮计算根据主轴分拆多行 第二轮再计算精准位置和行内分布 */
    if (parent.layoutMode != 'HORIZONTAL' && parent.layoutMode != 'VERTICAL') return;
    const p = parent as any;
    const {
        primary, counter,
        primarySize, counterSize,
        primaryOffsetStart, primaryOffsetEnd,
        counterOffsetStart, counterOffsetEnd,
    } = getAttrs(parent.layoutMode);
    const primaryMaxSize = p[primarySize] - p[primaryOffsetStart] - p[primaryOffsetEnd];
    const matrix: number[][] = [[]];
    const primarySizeSum: number[] = [0];
    const counterSizeMax: number[] = [0];
    let currentPos = p[primaryOffsetStart];
    childs.forEach((child: any, index) => {
        if (parent.layoutWrap == 'WRAP') {
            if (currentPos + child[primarySize] > primaryMaxSize) {
                matrix.push([]);
                counterSizeMax.push(0);
                primarySizeSum.push(0);
                currentPos = p[primaryOffsetStart];
            }
        }
        currentPos += child[primarySize];
        primarySizeSum.push((primarySizeSum.pop()|| 0) + child[primarySize]);
        matrix[matrix.length - 1].push(index);
        counterSizeMax.push(Math.max(counterSizeMax.pop() || 0, child[counterSize]));
    });
    let counterOffset = p[counterOffsetStart];
    matrix.forEach((cols, rowNum) => {
        let primaryOffset = p[primaryOffsetStart];
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

function layoutFence(parent: BaseFrameMixin, childs: Array<LayoutMixin>) {
    /** 栅格 布局思路 按格子填元素 */
    const layoutGrid  = parent?.layoutGrids?.[0];
    if (!layoutGrid || (layoutGrid.pattern !== 'ROWS' && layoutGrid.pattern !== 'COLUMNS')) return;
    const {
        primary, counter,
        primarySize, counterSize,
        primaryOffsetStart, primaryOffsetEnd,
        counterOffsetStart, counterOffsetEnd,
        primaryN, counterN,
    } = getAttrs(layoutGrid.pattern === 'ROWS'? 'HORIZONTAL': 'VERTICAL');
    const gird = layoutGrid;
    const gutterSize = layoutGrid.gutterSize || 0;
    const counterGutterSize = layoutGrid.counterGutterSize || 0;
    const p = parent as any;
    const primaryMaxSize = p[primarySize] - p[primaryOffsetStart] - p[primaryOffsetEnd];
    const primarySectionSize = round((primaryMaxSize - gutterSize * (layoutGrid.count -1))  / layoutGrid.count, 2);
    const rects: Rect[] = []; // 栅格计算结果
    let counterPos = 0;
    let primaryPos = 0;

    childs.forEach((child: any, index) => {
        let inserted = false;
        for(let pos = primaryPos; pos <= gird.count - child[primaryN]; pos++) {
            const r = {x: pos, y: counterPos, width: child[primaryN], height: child[counterN]};
            let overlap = false;
            for(let i = 0;i < rects.length; i++) {
                overlap = isOverlap(r, rects[i]);
                if (overlap) break;
            }
            if (!inserted && !overlap) {
                rects.push(r);
                primaryPos = pos;
                inserted = true;
            }
            if (inserted) break;
            if (pos === gird.count - child[primaryN]) {
                primaryPos = 0;
                counterPos ++;
                pos = -1;
            }
        }
        if (!inserted) {
            primaryPos = 0;
            counterPos ++;
            rects.push({x: primaryPos, y: counterPos, width: child[primaryN], height: child[counterN]});
        }
    });
    let counterCount = 0;
    rects.forEach(rect => {
        counterCount = Math.max(rect.y + rect.height, counterCount);
    });
    console.log(rects);
    const counterMaxSize = p[counterSize] - p[counterOffsetStart] - p[counterOffsetEnd];
    const counterSectionSize =  round((counterMaxSize - counterGutterSize * (counterCount - 1))  / counterCount, 2);
    rects.forEach((rect, index) => {
        const child = childs[index] as any;
        child[primary] = round(p[primaryOffsetStart] + rect.x * (primarySectionSize + gutterSize), 2);
        child[counter] = round(p[counterOffsetStart] + rect.y * (counterSectionSize + counterGutterSize), 2);
        child[primarySize] = round(rect.width * (primarySectionSize + gutterSize) - gutterSize);
        child[counterSize] = round(rect.height * (counterSectionSize + counterGutterSize) - counterGutterSize, 2);
    });
}

function isOverlap(rect1: Rect, rect2: Rect) {
    // 判断 Rect 是否重合
    const l1 = { x: rect1.x, y: rect1.y };
    const r1 = { x: rect1.x + rect1.width, y: rect1.y + rect1.height };
    const l2 = { x: rect2.x, y: rect2.y };
    const r2 = { x: rect2.x + rect2.width, y: rect2.y + rect2.height };
    if (
        l1.x >= r2.x ||
        l2.x >= r1.x ||
        l1.y >= r2.y ||
        l2.y >= r1.y
    ) return false;
    return true;
}
