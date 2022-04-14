import BaseNodeMixin from '../mixin/base-node-mixin';
import { serializable } from '../serialize';
import PageNode from './page-node';
import { type SceneNode } from '../index';

type NodeType = Internal.NodeType;

@serializable()
export default class DocumentNode extends BaseNodeMixin implements Internal.DocumentNode {

    readonly type = 'DOCUMENT';

    children: Array<PageNode> = [];

    appendChild(child: PageNode) {
        this.children.push(child);
        child.parent = this as any;
        this.update();
    }
    insertChild(index: number, child: PageNode) {
        this.children.splice(index, 0, child);
        child.parent = this as any;
        this.update();
        // TODO
    }
    findChildren(callback?: (node: PageNode) => boolean){
        if (!callback) return this.children;
        return this.children.filter(callback);
    }
    findChild(callback: (node: PageNode) => boolean){
        return this.children.filter(callback)[0];
    }
    update(slient?: boolean): void {
        if (this.parent && (this.parent as any).update) {
            super.update();
            (this.parent as any).update();
        }
    }

    findAll(callback?: (node: PageNode | SceneNode) => boolean) {
        const all: Array<PageNode | SceneNode> = [];
        this.children.map(node => {
            if (callback) {
                if (callback(node)) {
                    all.push(node);
                }
            } else {
                all.push(node);
            }
            node.findAll(callback).forEach(rs => { all.push(rs); });
        })[0];
        return all;
    }

    findOne(callback: (node: PageNode | SceneNode) => boolean) {
        // TODO
        return this.findAll(callback)[0];
    }

    findAllWithCriteria<T extends NodeType[]>(criteria: { types: T }) {
        return this.findAll(node => {
            return criteria.types.indexOf(node.type) > -1;
        });
    }

    _serialize() {
        const result = {
            type: this.type,
            id: this.id,
            name: this.name,
            // children: this.children.map(child => child.serialize()),
        };
        return result;
    }
}
