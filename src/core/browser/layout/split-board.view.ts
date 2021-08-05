import View from '../view'; 
import { injectable, inject } from 'inversify';
import SplitItemView from './split-item.view';
import SplitBoardController from './split-board.controller';
import Split from 'split.js';
import type { ISplitBoardView } from './type';
import { directionType } from './type';
export const lowBoardRoot = Symbol.for('FlowTableRoot');

@injectable()
/** Split Board View */
export default class SplitBoardView extends View implements ISplitBoardView {
    public items: SplitItemView[] = [];
    public direction : directionType = directionType.col;
    private splitInstance: Split.Instance | null = null;
    public controller: SplitBoardController;
    private _waitForMergeItem: SplitItemView | null = null;
    constructor() {
        super(); 
        this.init();
        this.controller = new SplitBoardController(this);
    }
    private init() {
        this.root.classList.add('split-board', 'flex', 'flex-nowrap', 'overflow-hidden');
        // this.root.style.margin = '0 4px';
    }
    public addRow(item: SplitItemView):void {
        if (!this.checkDirection(directionType.row)) {
            console.warn('direction is not right when added row', item);
            return;
        }
        this.direction = directionType.row;
        this.root.classList.remove('flex-row');
        this.root.classList.add('flex-col');
        this.insertItemAt(item);
        this.applySplit('vertical');
    }
    public addColumn(item: SplitItemView): void {
        if (!this.checkDirection(directionType.col)) {
            console.warn('direction is not right when added col', item);
            return;
        }
        this.direction = directionType.col;
        this.root.classList.remove('flex-col');
        this.root.classList.add('flex-row');
        this.insertItemAt(item);
        this.applySplit();

    }
    public insertItemAt(item: SplitItemView, pos?: number):void {
        pos = pos === undefined ? this.items.length : pos;
        this.items.splice(pos, 0, item);
        if(pos == 0) {
            this.root.appendChild(item.root);
        } else {
            this.items[pos-1].root.after(item.root);
        }
    }

    public setCursor(type: '' | 'row-resize' | 'col-resize' | 'crosshair' | 'e-resize' | 'w-resize' | 's-resize' | 'n-resize' = ''):void {
        this.root.style.cursor = type;
    }
    public waitForMergeAtItem(index: number, direction: 'w' | 'e' | 'n' | 's'):void {
        if (this._waitForMergeItem== this.items[index]) {
            return;
        }
        this.cancelForMerge();
        if (this.items[index]) {
            this.items[index].waitForMerge(direction);
            this._waitForMergeItem = this.items[index];
        }
    }
    public cancelForMerge():void {
        if (this._waitForMergeItem) {
            this._waitForMergeItem.cancelWaitForMerge();
            this._waitForMergeItem = null;
        }
    }
    private checkDirection(type: directionType) {
        if (this.items.length > 1 && this.direction !== type) {
            return false;
        }
        return true;
    }
    // public removeColumn(item: SplitItemView) {
    //     // do sth.
    // }
    // public removeRow(item: SplitItemView) {
    //     // do sth.
    // }
    public applySplit(direction: 'vertical' | 'horizontal' = 'horizontal', sizes?: number[]):void {
        this.destorySplit();
        this.splitInstance = Split(Array.prototype.slice.call(this.root.children), {
            sizes,
            // sizes: [30, 70],
            minSize: 15,
            direction,
            snapOffset: 0,
            gutterStyle: () => direction == 'vertical' ? {height: '3px'} : {width: '3px'},
        });
    }

    private destorySplit() {
        this.splitInstance && this.splitInstance.destroy();
        this.splitInstance = null;
    }
    // 切分列
    public splitColumnAt(index: number, clientX: number, clientY: number):void {
        const item = this.items[index];
        if (!this.checkDirection(directionType.col)) { // 列切分行
            const newBoard = new SplitBoardView().setFlow('1');
            const contentView = item.contentView;
            item.replaceContent(newBoard.root);
            const newItemView = new SplitItemView().setContent(contentView);
            const newEmptyView = new SplitItemView().setContent(document.createElement('div'));
            item.hideExpandButton(); // 不再使用该item的拉伸按钮
            newBoard.addColumn(newItemView);
            // newBoard.addColumn(newEmptyView);
            newBoard.controller.setActiveState(0, clientX, clientY);
            newBoard.controller.checkExpandState(clientX, clientY);
            return;
        }
        // 列扩展列
        this.startToExpand(index, item.root.getBoundingClientRect().left, item.root.clientWidth, clientX);
    }
    // 切分行
    public splitRowAt(index: number, clientX: number, clientY: number):void {
        const item = this.items[index];
        if (!this.checkDirection(directionType.row)) { // 行切分列
            const newBoard = new SplitBoardView().setFlow('1');
            const contentView = item.contentView;
            item.replaceContent(newBoard.root);
            const newItemView = new SplitItemView().setContent(contentView);
            const newEmptyView = new SplitItemView().setContent(document.createElement('div'));
            item.hideExpandButton(); // 不再使用该item的拉伸按钮
            newBoard.addRow(newItemView);
            // newBoard.addRow(newEmptyView);
            newBoard.controller.setActiveState(0, clientX, clientY);
            newBoard.controller.checkExpandState(clientX, clientY);
            return;
        }
        // 行切分行
        this.startToExpand(index, item.root.getBoundingClientRect().top, item.root.clientHeight, clientY);
    }

    private startToExpand(index: number, start: number, length: number, position: number) {
        const newSizes = this.getExpandResizes(index, start, length, position);
        const newItem = new SplitItemView().setContent(document.createElement('div'));
        this.destorySplit();
        this.insertItemAt(newItem, index + 1);
        this.applySplit(this.direction == directionType.col ? 'horizontal' : 'vertical', newSizes);
    }

    /** live resize after expanded  */
    public resizeAt(index: number, start: number, length: number, position: number):void {
        if (!this.splitInstance) return;
        // const item = this.items[index];
        let max = length;
        if (this.items[index +1]) {
            max += this.items[index +1].root[
                this.direction == directionType.col ? 'clientWidth': 'clientHeight'
            ];
        }
        const r = (position - start) / max;
        if (position - start < 30) return;
        if (max - position + start < 30) return;
        let other = 0, sum = 0;
        this.splitInstance.getSizes().forEach((size, i) => {
            sum += size;
            if (i == index || i == index +1) return;
            other += size;
        });
        let newSize = 0;
        const newSizes: number[] = [];
        this.splitInstance.getSizes().forEach((size, i) => {
            if (index == i) {
                newSize = (sum - other) * r;
                newSizes.push(newSize);
            } else if (index + 1 == i) {
                newSizes.push(sum - other - newSize);
            }else if (index !== i) {
                newSizes.push(size);
            }
        });
        this.splitInstance.setSizes(newSizes);
    }


    private getExpandResizes(index: number, start: number, length: number, position: number) {
        const r =  (position - start) / length;
        if (r <= 0 || r >= 1) return undefined;
        const newSizes: number[] = [];
        this.splitInstance && this.splitInstance.getSizes().forEach((size, i) => {
            if (index !== i) {
                newSizes.push(size);
                return;
            }
            const w =  size * r;
            newSizes.push(w, size-w);
        });
        return newSizes;
    }
}