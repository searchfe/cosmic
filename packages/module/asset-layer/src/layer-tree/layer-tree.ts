import type { TreeDataProps } from 'cosmic-vue';
import { DocumentNode, ChildrenMixin, hasMixin } from '@cosmic/core/parts';
import type { PageNode, SceneNode } from '@cosmic/core/parts';
type Node = DocumentNode | SceneNode| PageNode;

export interface LayerTreeData extends TreeDataProps {
    children?: LayerTreeData[];
    type: Node['type'];
}

export  function nodeToTree(node: Node) {
    const tree: LayerTreeData[] = [];
    if (hasMixin(node, ChildrenMixin) || node instanceof DocumentNode) {
        node.children.forEach(n => {
            tree.push({
                id: n.id,
                label: n.name,
                children: nodeToTree(n),
                type: n.type,
            });
        });
        return tree as LayerTreeData[];
    }
    return [];
}
