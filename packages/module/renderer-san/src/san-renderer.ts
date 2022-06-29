import { type CosmicNode } from '@cosmic/core/parts';
import { type Renderer, type ComponentList} from '@cosmic/core/browser';
import { Component } from 'san';
import { ChildFactory } from './child';

class SanRenderer implements Renderer {
    private element: Component;
    create (root: HTMLElement, node: CosmicNode,  components: ComponentList = {}) {
        const list: Record<string, Component> = {};
        Object.keys(components).forEach(id => {
            list[id] = components[id].component;
        });
        const Child = ChildFactory({components: list});

        this.element = new Child({
            data: { node },
        });

        this.element.attach(root);
        // return;
        // const comp  = new Test({
        //         data: {styleData: {
        //             display: 'grid',
        //             width: '10px',
        //         },
        //     },
        // });
        // comp.attach(root);
    }
    update(node: CosmicNode) {
        if(!this.element) return;
        console.log(node);
        this.element.data.set('node', node);
    }
    dispose(){
        this.element && this.element.dispose();
    }
}

export default SanRenderer;
