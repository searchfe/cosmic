type PageNode = Internal.PageNode;
type SceneNode = Internal.SceneNode;
type NodeType = Internal.NodeType;

export default class ChildrenMixin implements Internal.ChildrenMixin {
    readonly children: ReadonlyArray<SceneNode>;
  
    appendChild(child: SceneNode) {
        // TODO
    }
    insertChild(index: number, child: SceneNode) {
        // TODO
    }
    findChildren(callback?: (node: SceneNode) => boolean){
        // TODO
        return [];
    }
    findChild(callback: (node: SceneNode) => boolean){
        // TODO
        return null;
    }
  
    findAll(callback?: (node: SceneNode) => boolean) {
        // TODO
        return [];
    }
  
    findOne(callback: (node: SceneNode) => boolean) {
        // TODO
        return null;
    }
  
    findAllWithCriteria<T extends NodeType[]>(criteria: { types: T }) {
        return [];
    }
}