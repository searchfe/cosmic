import { Component } from 'san';
import { type CosmicNode } from '@cosmic/core/parts';
import { Frame } from './frame';


export class Child extends Component {
    static template = `
        <renderer-frame children="{{node.children}}" style="{{node.props.style}}" class="{{node.props.class}}" />
    `;
    initData() {
        return {
            node: {} as CosmicNode,
        };
    }
    components = {
        'renderer-frame': Frame,
    };
    // static components: {
    //     'renderer-frame': Frame
    // };
}
