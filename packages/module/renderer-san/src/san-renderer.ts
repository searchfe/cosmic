import { type FrameNode } from '@cosmic/core/parts';
import { type Renderer } from '@cosmic/core/browser';
import san from 'san';

class SanRenderer implements Renderer {
  create (root: HTMLElement, frameNode: FrameNode) {
    console.log(root, frameNode, san);
    return;
  }
  dispose(){
    // do nothing
  }
}

export default SanRenderer;