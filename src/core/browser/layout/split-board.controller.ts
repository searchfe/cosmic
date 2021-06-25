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
    private expandType: 0 | 1 | 2 = 0; // 是否超过偏移值 0 / hor | ver

    constructor(private view: SplitBoardView) {
        this.expandMoveHandler = (event: MouseEvent) => {
            this.liveResize(event.clientX, event.clientY);
            this.checkExpandState(event.clientX, event.clientY);
            
        };
        this.expandLeaveHandler = (event: MouseEvent) => { console.log('leave');  this.unactiveExpand(); };
        this.expandMouseUpHandler = (event: MouseEvent) => { console.log('up'); this.unactiveExpand(); };
        this.view.root.addEventListener('mousedown', (event: MouseEvent) => {
            this.onMouseDown(event);
        });
    }
    public onMouseDown(event: MouseEvent) {
        const target = event.target as HTMLElement;
        let index = -1;
        this.view.items.forEach((item, i) => {
            if (target && item.root == target.parentElement && target.classList.contains('split-expand')) index = i;
        });

        if (index > -1) {
            // 锚点mousedown
            this.startX = event.clientX;
            this.startY = event.clientY;
            this.activeExpand();
            this.activeId = index;
        }
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
            this.expandActive = false;
            this.expandType = 0;
            this.view.setCursor('');
        }
    }
    private liveResize(clientX: number, clientY: number) {
        const item = this.view.items[this.activeId];
        if (this.expandType == 1) {
            this.view.resizeAt(this.activeId, item.root.offsetLeft, item.root.clientWidth, clientX);
        } else if (this.expandType == 2) {
            this.view.resizeAt(this.activeId, item.root.offsetTop, item.root.clientHeight, clientY);
        }
    }
    private checkExpandState(clientX: number, clientY: number) {
        if(this.expandType) return;
        if (clientX - this.startX > 30 || clientY - this.startY > 30) {
            this.unactiveExpand();
        }
        if (this.startX - clientX > 25) {
            this.expandType = 1;
            this.view.setCursor('col-resize');
            this.view.splitColumnAt(this.activeId, clientX);
        }
        if (this.startY - clientY> 25) {
            this.expandType = 2;
            this.view.setCursor('row-resize');
            this.view.splitRowAt(this.activeId, clientY);
        }
    }
    
}
