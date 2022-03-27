import BaseNodeMixin from '../mixin/base-node-mixin';
type PageNode = Internal.PageNode;
type SceneNode = Internal.SceneNode;
type NodeType = Internal.NodeType;

export default class DocumentNode extends BaseNodeMixin implements Internal.DocumentNode {

    readonly type = 'DOCUMENT';

    readonly children: ReadonlyArray<PageNode> = [];
  
    appendChild(child: PageNode) {
        // TODO
    }
    insertChild(index: number, child: PageNode) {
        // TODO
    }
    findChildren(callback?: (node: PageNode) => boolean){
        // TODO
        return [];
    }
    findChild(callback: (node: PageNode) => boolean){
        // TODO
        return null;
    }
  
    findAll(callback?: (node: PageNode | SceneNode) => boolean) {
        // TODO
        return [];
    }
  
    findOne(callback: (node: PageNode | SceneNode) => boolean) {
        // TODO
        return null;
    }
  
    findAllWithCriteria<T extends NodeType[]>(criteria: { types: T }) {
        return [];
    }
}