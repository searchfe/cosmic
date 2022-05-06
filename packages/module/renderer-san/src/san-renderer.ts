import { type SceneNode } from '@cosmic/core/parts';
import { type Renderer } from '@cosmic/core/browser';
import san from 'san';

class SanRenderer implements Renderer {
  create (root: HTMLElement, childs: SceneNode[]) {
    console.log(root, childs, san);
    return;
  }
  dispose(){
    // do nothing
  }
}

export default SanRenderer;