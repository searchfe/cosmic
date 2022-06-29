import { BaseFrameMixin, hasMixin, LayoutMixin, SceneNode, ConstraintType } from '../internals';

export interface InitLayoutChildOptions {
    x?: number,
    y?: number,
}

export function initLayoutChild(node: SceneNode, options: InitLayoutChildOptions = {}) {
    const parent = node.parent;
    if(!parent || parent.type === 'PAGE' || parent.type === 'DOCUMENT') return;
    if(!hasMixin(parent, BaseFrameMixin)) return;

    if (parent.layoutMode === 'NONE') {
        processAutoLayoutChild(node, parent, options);
    }
}

function processAutoLayoutChild(node: SceneNode, parent: BaseFrameMixin, options: InitLayoutChildOptions) {
    let targetX = 0, targetY = 0, width = 0;
    targetX += parent.paddingLeft;
    targetY += parent.paddingTop;
    width = parent.width -  parent.paddingRight - parent.paddingLeft;
    if (options.x == undefined || options.y === undefined) {
        parent.children.filter(n => n.id !== node.id).forEach(n => {
            const maxY = n.y + n.height;
            targetY = Math.max(targetY, maxY);
        });
        if (hasMixin(node, BaseFrameMixin)){
            node.constraints.horizontal = ConstraintType.STRETCH;
        }
    }

    node.x = targetX;
    node.y = targetY;
    node.width = width;
    node.height = node.height || 32;
    node.relayout();
}
