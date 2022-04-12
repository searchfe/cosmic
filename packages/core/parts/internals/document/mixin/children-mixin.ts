import { hasMixin } from 'ts-mixer';
import type{  SceneNode, PageNode } from '../index';

type NodeType = Internal.NodeType;

export default class ChildrenMixin implements Internal.ChildrenMixin {
    children: Array<SceneNode> = [];

    appendChild(child: SceneNode) {
        this.children.push(child);
        (child as any).parent = this;
    }
    insertChild(index: number, child: SceneNode) {
        this.children.splice(index, 0, child);
        (child as any).parent = this;
    }
    findChildren(callback?: (node: SceneNode) => boolean){
        if (!callback) return this.children;
        return this.children.filter(callback);
    }
    findChild(callback: (node: SceneNode) => boolean){
        return this.children.filter(callback)[0];
    }

    findAll(callback?: (node: SceneNode) => boolean) {
        const all: Array<SceneNode> = [];
        this.children.map(node => {
            if (callback) {
                if (callback(node)) {
                    all.push(node);
                }
            } else {
                all.push(node);
            }
            if (hasMixin(node, ChildrenMixin)) {
                node.findAll(callback).forEach(rs => { all.push(rs); });
            }
        });
        return all;
    }

    findOne(callback: (node: SceneNode) => boolean) {
        return this.findAll(callback)[0];
    }

    findAllWithCriteria<T extends NodeType[]>(criteria: { types: T }) {
        return this.findAll(node => {
            return criteria.types.indexOf(node.type) > -1;
        });
    }
}
