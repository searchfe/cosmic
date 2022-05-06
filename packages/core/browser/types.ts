import { type SceneNode } from '@cosmic/core/parts';
interface Renderer {
    create: (root: HTMLElement, childs: SceneNode[]) => void;
    dispose: () => void;
}
export { Renderer };