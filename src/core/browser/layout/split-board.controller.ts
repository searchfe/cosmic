import { directionType } from './split-board.view';
import type SplitBoardView from './split-board.view';
import type SplitItemView from './split-item.view';

export default class SplitBoardController {
    private expandMoveHandler!: (event: MouseEvent) => void;
    private expandLeaveHandler!: (event: MouseEvent) => void;
    private expandMouseUpHandler!: (event: MouseEvent) => void;

    private startX = 0;
    private startY = 0;
    private activeId = -1;

    private expandActive = false;
    private expandType = 0; // 是否超过偏移值 0 / 1 expand hor | 2 expand ver | 3 merge hor | 4 merge ver

    constructor(private view: SplitBoardView) {
        this.expandMoveHandler = (event: MouseEvent) => {
            this.liveResize(event.clientX, event.clientY);
            this.checkExpandState(event.clientX, event.clientY);
        };
        this.expandLeaveHandler = (event: MouseEvent) => { this.unactiveExpand(); };
        this.expandMouseUpHandler = (event: MouseEvent) => { this.unactiveExpand(); };
        this.view.root.addEventListener('mousedown', (event: MouseEvent) => {
            this.onMouseDown(event);
        });
    }
    public onMouseDown(event: MouseEvent): void {
        const target = event.target as HTMLElement;
        let index = -1;
        this.view.items.forEach((item, i) => {
            if (target && item.root == target.parentElement && target.classList.contains('split-expand')) index = i;
        });
        if (index === -1) {
            return;
        }
        if (index > -1) {
            this.setActiveState(index, event.clientX, event.clientY);
        }
        event.preventDefault();
        event.stopPropagation();
    }
    public setActiveState(index: number, startX: number, startY: number) {
        // 锚点mousedown
        this.startX = startX;
        this.startY = startY;
        this.activeExpand();
        this.activeId = index;
    }
    private activeExpand() {
        this.view.root.addEventListener('mousemove', this.expandMoveHandler);
        this.view.root.addEventListener('mouseleave', this.expandLeaveHandler);
        this.view.root.addEventListener('mouseup', this.expandMouseUpHandler);
        this.expandActive = true;
        this.expandType = 0;
        this.view.setCursor('crosshair');
    }
    private unactiveExpand() {
        if (this.expandActive) {
            this.view.root.removeEventListener('mousemove', this.expandMoveHandler);
            this.view.root.removeEventListener('mouseleave', this.expandLeaveHandler);
            this.view.root.removeEventListener('mouseup', this.expandMouseUpHandler);
            this.view.cancelForMerge();
            this.expandActive = false;
            this.expandType = 0;
            this.view.setCursor('');
        }
    }
    private liveResize(clientX: number, clientY: number) {
        const item = this.view.items[this.activeId];
        if (this.expandType == 1 && this.view.direction == directionType.col) {
            // horizontal expand column
            this.view.resizeAt(this.activeId, item.root.getBoundingClientRect().left, item.root.clientWidth, clientX);
        } else if (this.expandType == 2 && this.view.direction == directionType.row) {
            // vertical expand row
            this.view.resizeAt(this.activeId, item.root.getBoundingClientRect().top, item.root.clientHeight, clientY);
        }

    }
    public checkExpandState(clientX: number, clientY: number) {
        const offsetX = this.startX - clientX;
        const offsetY = this.startY - clientY;
        /** expand mode */
        if (this.expandType == 0 && offsetX > 0 && offsetY > 0 && (offsetX > 5 || offsetY > 5)) {
            if (offsetX > offsetY) {
                this.view.setCursor('col-resize');
            } else {
                this.view.setCursor('row-resize');
            }
        }
        /** merge mode */
        if (offsetX < -5) {
            this.expandType = 3;
            this.view.setCursor('e-resize');
            this.view.waitForMergeAtItem(this.activeId + 1, 'e');
            return;
        }
        if (this.expandType == 3 && offsetX > 5) {
            this.view.setCursor('w-resize');
            this.view.waitForMergeAtItem(this.activeId, 'w');
            return;
        }

        if (offsetY < -5) {
            this.expandType = 4;
            this.view.setCursor('s-resize');
            this.view.waitForMergeAtItem(this.activeId + 1, 's');
            return;
        }
        if (this.expandType == 4 && offsetY > 5) {
            this.view.setCursor('n-resize');
            this.view.waitForMergeAtItem(this.activeId, 'n');
            return;
        }

        if (this.expandType) return;
        /** do expand */
        if (offsetX > 30) {
            this.expandType = 1;
            this.view.setCursor('col-resize');
            this.view.splitColumnAt(this.activeId, clientX, clientY);
            return;
        }
        if (offsetY > 30) {
            this.expandType = 2;
            this.view.setCursor('row-resize');
            this.view.splitRowAt(this.activeId, clientX, clientY);
        }
        if (
            (this.expandType == 1 && this.view.direction == directionType.row) ||
            (this.expandType == 2 && this.view.direction == directionType.col)
        ) {
            this.unactiveExpand();
        }
    }

}
