import { type FrameNode } from '@cosmic/core/parts';
interface Renderer {
    create: (root: HTMLElement, frameNode: FrameNode) => void;
    dispose: () => void;
}
export { Renderer };