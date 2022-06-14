import { injectable, inject } from '@cosmic/core/inversify';
import { service } from '@cosmic/core/browser';
import { SceneNode, util, hasMixin, ChildrenMixin, LayoutMixin, BaseNodeMixin, TextNode } from '@cosmic/core/parts';

@injectable()
export default class NodeControllService {
    private _deferDargTimer: NodeJS.Timeout;
    constructor(
        @inject(service.TOKENS.Node) private nodeService: service.NodeService,
        @inject(service.TOKENS.Tool) private toolService: service.ToolService,
        @inject(service.TOKENS.Canvas) private canvasService: service.CanvasService,
    ) {

    }

    public mousedown(event: MouseEvent) {
        const state = this.toolService.getState();
        const inCanvas = this.canvasService.inCanvas(event.clientX, event.clientY);
        if (
            state === service.ToolState.Null && inCanvas
        ) {
            const oldTarget = this.nodeService.getSelection()[0];
            const node = this.getNode(event);
            this.nodeService.setSelection(node ? [node.id] : []);
    
            this._deferDargTimer = setTimeout(() => {
                this.startDragNode(event);
            }, 200);
            if (oldTarget && oldTarget === node && hasMixin(oldTarget, TextNode)) {
                this.toolService.set(service.ToolState.TextEdit);
            }
        } else if (
            state === service.ToolState.Frame ||
            state === service.ToolState.Text ||
            state === service.ToolState.Component
        ) {
            this.appendChild(event);
        } else if (state === service.ToolState.TextEdit && inCanvas) {
            const oldTarget = this.nodeService.getSelection()[0];
            const node = this.getNode(event);
            if (node !== oldTarget) {
                this.toolService.cancel(service.ToolState.TextEdit);
                // this.nodeService.setSelection(node ? [node.id] : []);
            }
        }
   }

    public mouseup(event: MouseEvent) {
        clearTimeout(this._deferDargTimer);
        const state = this.toolService.getState();
        if(state === service.ToolState.ResizeNode) {
            this.setNodeSize(event);
            this.toolService.set(service.ToolState.Null);
        } else if(state === service.ToolState.MoveNode) {
            this.setNodePosition(event);
            this.toolService.set(service.ToolState.Null);
        } else if (state === service.ToolState.Null) {
            // console.log(this.nodeService.getSelection());
            // service.ToolState.TextEdit
        }
        if (this.editingChild) {
            this.resetDefaultSize(event);
            this.editingChild = undefined;
            this.toolService.cancel(this.toolService.getState());
        }
    }
    public mousemove(event: MouseEvent) {
        const state = this.toolService.getState();
        if(state === service.ToolState.MoveNode) {
            this.setNodePosition(event);
        } else if(state === service.ToolState.ResizeNode) {
            this.setNodeSize(event);
        } else if (state === service.ToolState.Frame ||
            state === service.ToolState.Text ||
            state === service.ToolState.Component
        ) {
            if(this.editingChild) {
                this.setNodeSize(event);
            }
        }
    }

    resizeData: ResizeData;
    public startResize(node: SceneNode, direction: number, event: MouseEvent) {
        if (this.toolService.getState() === service.ToolState.Null) {
            this.resizeData = {
                direction,
                startX: event.clientX,
                startY: event.clientY,
                node,
                width: node?.width || 0,
                height: node?.height || 0,
                x: node?.x || 0,
                y: node?.y || 0,
            };
            this.toolService.set(service.ToolState.ResizeNode);
        }
    }

    editingChild: SceneNode | undefined;
    private appendChild(event: MouseEvent, width = 10, height = 10) {
        const {clientX, clientY} = event;
        const page = this.nodeService.getCurrentPage();
        const pos = this.canvasService.getPosition(clientX, clientY);
        const targetNode = util.getSelectionInPageNode(page, pos) || page;
        if (!targetNode || !hasMixin(targetNode, ChildrenMixin)) return;
        const {x, y} = hasMixin(targetNode, LayoutMixin) && hasMixin(targetNode, BaseNodeMixin) ?  util.canvasPosToFrame(targetNode, pos) : pos;

        switch(this.toolService.getState()) {
            case service.ToolState.Frame:
                this.editingChild = this.nodeService.addFrame(targetNode as any);
                this.editingChild.x = x;
                this.editingChild.y = y;
                this.editingChild.resize(width, height);
                break;
            case service.ToolState.Text:
                this.editingChild = this.nodeService.addText(targetNode as any);
                this.editingChild.x = x;
                this.editingChild.y = y;
                this.editingChild.resize(width, height);
                break;
            default:
                console.error('Unsupport AppendChild Type', this.toolService.getState());
                return;
                break;

        }
        const canvasPos = util.toCanvasPos(this.editingChild);
        const clientPos = this.canvasService.getClient(canvasPos.x, canvasPos.y);
        this.resizeData = {
            direction: 4, 
            startX: clientPos.x,
            startY: clientPos.y,
            node: this.editingChild,
            width: this.editingChild?.width || 0,
            height: this.editingChild?.height || 0,
            x: this.editingChild?.x || 0,
            y: this.editingChild?.y || 0,
        };
    }
    private resetDefaultSize(event: MouseEvent) {
        // if(this.toolService.getState() === service.ToolState.;
        if(
            !this.editingChild || 
            Math.abs(this.resizeData.startX - event.clientX) > 10 &&
            Math.abs(this.resizeData.startY - event.clientY) > 10) {
                return;
        }
        if(this.editingChild.parent?.type === 'PAGE'){
            this.editingChild.resize(414, 736);
            this.editingChild.update();
        } else {
            this.editingChild.resize(100, 100);
            this.editingChild.update();
        }
    }

    private getNode(event: MouseEvent) {
        const page = this.nodeService.getCurrentPage();
        // 转换canvas坐标系`
        const pos = this.canvasService.getPosition(event.clientX, event.clientY);
        // 获得点击节点
        const node = util.getSelectionInPageNode(page, pos);
        return node;
    }

    private startDragNode(event: MouseEvent) {
        const page = this.nodeService.getCurrentPage();
        const pos = this.canvasService.getPosition(event.clientX, event.clientY);
        const node = util.getSelectionInPageNode(page, pos);
        if (node) {
            const layoutMode = (node.parent as any)?.layoutMode;
            const layoutGrid = (node.parent as any)?.layoutGrids?.[0];
            if (layoutMode === 'HORIZONTAL' || layoutMode === 'VERTICAL' || layoutGrid) return;
            this.resizeData = {
                direction: 4,
                startX: event.clientX,
                startY: event.clientY,
                node,
                width: node?.width || 0,
                height: node?.height || 0,
                x: node?.x || 0,
                y: node?.y || 0,
            };
            this.toolService.set(service.ToolState.MoveNode);
        }
    }

    private setNodeSize(event: MouseEvent) {
        const data = this.resizeData;
        if (!data || data.direction === undefined) return;
        const {x, y, width, height } = getNewLayout(data, {x: event.clientX, y: event.clientY});
        const node = data.node;
        if((node?.parent as any).layoutMode == 'NONE') {
            node.x = round(x);
            node.y = round(y);
        } else {
            // const canvasPos = util.toCanvasPos(node);
            // const clientPos = this.canvasService.getClient(canvasPos.x, canvasPos.y);
            // this.resizeData.startX = clientPos.x;
            // this.resizeData.startY = clientPos.y;
        }
        node.resize(width, height);
        node.update();
    }

    private setNodePosition(event: MouseEvent){
        const node: SceneNode = this.resizeData.node;

        if (!this.resizeData || !node) return;
        const offset = {
            x: event.clientX - this.resizeData.startX,
            y: event.clientY - this.resizeData.startY,
        };
        const pos = util.offsetNodePos(node, offset, {
            x: this.resizeData.x,
            y: this.resizeData.y,
        });
        node.x = round(pos.x);
        node.y = round(pos.y);
        node.update();
    }

}

interface ResizeData {
    direction: number,
    startX: number,
    startY: number,
    node: SceneNode,
    x: number,
    y: number,
    width: number,
    height: number,
}
type Pos = {x: number, y: number};

function getNewLayout(data: ResizeData, target: Pos) {
    const layout = {x: data.x, y: data.y, width: data.width, height: data.height};
    const offset = {
        x: target.x - data.startX,
        y: target.y - data.startY,
    };
    switch(data.direction){
        case 0:
            layout.x += offset.x;
            layout.y += offset.y;
            layout.width -= offset.x;
            layout.height -= offset.y;
            break;
        case 1:
            layout.y += offset.y;
            layout.height -= offset.y;
            break;
        case 2:
            layout.y += offset.y;
            layout.width += offset.x;
            layout.height -= offset.y;
            break;
        case 3:
            layout.width += offset.x;
            break;
        case 4:
            layout.width += offset.x;
            layout.height += offset.y;
            break;
        case 5:
            layout.height += offset.y;
            break;
        case 6:
            layout.x += offset.x;
            layout.width -= offset.x;
            layout.height += offset.y;
            break;
        case 7:
            layout.x += offset.x;
            layout.width -= offset.x;
            break;
    }
    if (layout.width < 0) {
        layout.x += layout.width;
        layout.width = Math.abs(layout.width);
    }
    if (layout.height < 0) {
        layout.y += layout.height;
        layout.height = Math.abs(layout.height);
    }
    return layout;
}

function round(num: number){
    return Math.round(num * 10) / 10;
}
