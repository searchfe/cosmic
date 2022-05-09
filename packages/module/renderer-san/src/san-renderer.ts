import { type CosmicNode } from '@cosmic/core/parts';
import { type Renderer } from '@cosmic/core/browser';
import {type Component } from 'san';
import { Frame } from './frame';

class SanRenderer implements Renderer {
    private element: Component;
    create (root: HTMLElement, node: CosmicNode) {
        const ComponentConstructor = getComponentCreator(node);
        if(!ComponentConstructor) return;
        this.element = new ComponentConstructor({
            data: {class: node.props.class, style: node.props.style, children: node.children},
        });
        this.element.attach(root);
        return;
    }
    update(node: CosmicNode) {
        if(!this.element) return;
        this.element.data.set('class', node.props.class);
        this.element.data.set('style', node.props.style);
        this.element.data.set('children', node.children);
    }
    dispose(){
        this.element && this.element.dispose();
    }
}

function getComponentCreator(node: CosmicNode) {
    switch(node.type) {
        case 'frame':
            return Frame;
        default:
            return;
    }
}

export default SanRenderer;
