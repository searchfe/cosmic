import { BaseNodeMixin, ChildrenMixin, PageNode, SceneNode, hasMixin, LayoutMixin } from '../internals';

type Pos = {x: number, y: number};

export function getSelectionInPageNode(pageNode: PageNode, {x, y}: Pos) {
    // pageNode.x;
    // console.log(pageNode , x, y);
    const node = findOneReverse(pageNode, {x, y}, inArea);

    return node;
}

export function findOneReverse(root: ChildrenMixin, {x, y}: Pos, callback: (node: SceneNode, {x, y}: Pos) => boolean): SceneNode | undefined {
    for(let idx = root.children.length - 1; idx >= 0; idx --) {
        const node = root.children[idx];

        // console.log(node.type, node.x, x, node.x + node.width , '/', node.y, y, node.y + node.height);
        
        // absolute 自由布局重置坐标系
        const basePoint = {x: x - node.x, y: y - node.y};
    
        if (hasMixin(node, ChildrenMixin)) {
            const rs = findOneReverse(node, basePoint, callback);
            if (rs) return rs;
        }
        if (callback(node, {x, y})) {
            return node;
        }
    }
    return undefined;
}

function inArea(node: SceneNode, {x, y}: Pos) {
    if (!node.visible) return false;
    if(x + 4 < node.x || y + 4 < node.y) return false;
    if (x - 4 > node.x + node.width) return false;
    if (y - 4 > node.y + node.height) return false;
    return true;
}

export function toCanvasPos(node: LayoutMixin & BaseNodeMixin) : Pos {
    const parentPos = (node.parent && hasMixin(node.parent, LayoutMixin)) ? toCanvasPos(node.parent as any) : {x: 0, y: 0};
    const offset = {x: 0, y: 0};
    offset.x = node.x;
    offset.y = node.y;
    return {x: parentPos.x + offset.x, y: parentPos.y + offset.y};
}