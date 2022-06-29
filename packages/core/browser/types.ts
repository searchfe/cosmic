import { type CosmicNode } from '@cosmic/core/parts';
interface Renderer {
    create: (root: HTMLElement, node: CosmicNode, components: ComponentList) => void;
    update: (node: CosmicNode) => void;
    dispose: () => void;
}
export { Renderer };

export interface ComponentLibraryItem {
    name: string,
    components: {
        [index: string]: any,
    },
    schema: {
        [index: string]: any,
    },
    css: string,
}
export interface ComponentLibrary{
    [index: string]: ComponentLibraryItem
}

export interface ComponentListItem {
    id: string,
    name: string,
    description: string,
    packageName: string,
    schema: {
        [index: string]: any,
    },
    component: any,
    data: {
        [index: string]: any,
    }
    image: string,
    tags: string[],
}

export interface ComponentList {
    [id: string] : ComponentListItem;
}