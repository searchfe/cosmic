import { type CosmicNode } from '@cosmic/core/parts';
interface Renderer {
    create: (root: HTMLElement, node: CosmicNode) => void;
    update: (node: CosmicNode) => void;
    dispose: () => void;
}
export { Renderer };
