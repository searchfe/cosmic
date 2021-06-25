import View from '../view'; 
import { injectable, inject } from 'inversify';
import SplitItemView from './split-item.view';
import SplitBoardController from './split-board.controller';
import Split from 'split.js';

export const lowBoardRoot = Symbol.for('FlowTableRoot');

enum directionType {
    'col',
    'row'
}

@injectable()
/** Split Board View */
export default class SplitBoardView extends View {
    public items: SplitItemView[] = [];
    private direction : directionType = directionType.col;
    private splitInstance: Split.Instance | null = null;
    private controller: SplitBoardController;
    constructor() {
        super();
        this.init();
        this.controller = new SplitBoardController(this);
    }
    private init() {
        this.root.classList.add('flex', 'flex-nowrap');
        const view0 = new SplitItemView().setContent(document.createElement('div'));
        const view1 = new SplitItemView().setContent(document.createElement('div'));
        this.addColumn(view0);
        this.addColumn(view1);
    }
    public addRow(item: SplitItemView) {
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
    public addColumn(item: SplitItemView) {
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
    public insertItemAt(item: SplitItemView, pos?: number) {
        pos = pos === undefined ? this.items.length : pos;
        this.items.splice(pos, 0, item);
        if(pos == 0) {
            this.root.appendChild(item.root);
        } else {
            this.items[pos-1].root.after(item.root);
        }
    }

    public setCursor(type: '' | 'row-resize' | 'col-resize' | 'crosshair' = '') {
        this.root.style.cursor = type;
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
    private applySplit(direction: 'vertical' | 'horizontal' = 'horizontal', sizes?: number[]) {
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

    public splitColumnAt(index: number, clientX: number) {
        const item = this.items[index];
        if (!this.checkDirection(directionType.col)) {
            // new Board;
            return;
        }
        this.expandColumn(index, clientX);
    }

    private expandColumn(index: number, clientX: number) {
        const item = this.items[index];
        const startX = item.root.offsetLeft;
        const newSizes = this.getExpandColumnResizes(index, clientX);

        const newItem = new SplitItemView().setContent(document.createElement('div'));
        this.destorySplit();
        this.insertItemAt(newItem, index + 1);
        this.applySplit('horizontal', newSizes);
    }

    /** live resize after expanded  */
    public resizeColumnAt(index: number, clientX: number) {
        if (!this.splitInstance) return;
        const item = this.items[index];
        const startX = item.root.offsetLeft;
        let maxWidth = item.root.clientWidth;
        if (this.items[index +1]) {
            maxWidth += this.items[index +1].root.clientWidth;
        }
        const r = (clientX - startX) / maxWidth;
        if (clientX - startX < 30) return;
        if (maxWidth - clientX + startX < 30) return;
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


    private getExpandColumnResizes(index: number, clientX: number) {
        const item = this.items[index];
        const startX = item.root.offsetLeft;
        const width = item.root.clientWidth;
        const r =  (clientX - startX) / width;
        if (r <= 0 || r >= 1) return;
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
// pointer-events
// cursor: col-resize;