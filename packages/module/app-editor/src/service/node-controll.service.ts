import { injectable, inject } from '@cosmic/core/inversify';
import { service } from '@cosmic/core/browser';
import { SceneNode, util } from '@cosmic/core/parts';

// export enum NodeControllState {
//     ResizeNode = 'ResizeNode',
// }

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
        if (
            this.toolService.getState() === service.ToolState.Null &&
            this.canvasService.inCanvas(event.clientX, event.clientY)
        ) {
            // 处理点击节点
            this.clickNode(event);
            this._deferDargTimer = setTimeout(() => {
                this.startDragNode(event);
            }, 200);
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
        }
    }
    public mousemove(event: MouseEvent) {
        const state = this.toolService.getState();
        if(state === service.ToolState.MoveNode) {
            this.setNodePosition(event);
        } else if(state === service.ToolState.ResizeNode) {
            this.setNodeSize(event);
        }
    }

    public startResize(node: SceneNode, direction: number, event: MouseEvent) {
        if (this.toolService.getState() === service.ToolState.Null) {
            this.toolService.set(service.ToolState.ResizeNode, {
                direction, event,
                node,
                width: node?.width || 0,
                height: node?.height || 0,
                x: node?.x || 0,
                y: node?.y || 0,
            });
        }
    }

    private clickNode(event: MouseEvent) {
        const page = this.nodeService.getCurrentPage();
        // 转换canvas坐标系`
        const pos = this.canvasService.getPosition(event.clientX, event.clientY);
        // 获得点击节点
        const node = util.getSelectionInPageNode(page, pos);
        this.nodeService.setSelection(node ? [node.id] : []);
    }

    private startDragNode(event: MouseEvent) {
        const page = this.nodeService.getCurrentPage();
        const pos = this.canvasService.getPosition(event.clientX, event.clientY);
        const node = util.getSelectionInPageNode(page, pos);
        this.toolService.set(service.ToolState.MoveNode, {event, node, x: node?.x || 0, y: node?.y || 0});
    }

    private setNodeSize(event: MouseEvent) {
        const data = this.toolService.data as ResizeData;
        if (!data || data.direction === undefined) return;
        const {x, y, width, height } = getNewLayout(data, {x: event.clientX, y: event.clientY});
        const node = data.node;
        node.x = round(x);
        node.y = round(y);
        node.resize(width, height);
        node.update();
    }

    private setNodePosition(event: MouseEvent){
        const originEvent: MouseEvent = this.toolService.data.event;
        const node: SceneNode = this.toolService.data.node;

        if (!originEvent || !node) return;
        const offset = {
            x: event.clientX - originEvent.clientX,
            y: event.clientY - originEvent.clientY,
        };
        const pos = util.offsetNodePos(node, offset, {
            x: this.toolService.data.x,
            y: this.toolService.data.y,
        });
        node.x = round(pos.x);
        node.y = round(pos.y);
        node.update();
    }

}

interface ResizeData {
    direction: number,
    event: MouseEvent,
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
        x: target.x - data.event.clientX,
        y: target.y - data.event.clientY,
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
