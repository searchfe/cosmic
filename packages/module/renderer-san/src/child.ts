import { Component } from 'san';
import { type CosmicNode } from '@cosmic/core/parts';
import { Frame } from './frame';
import { Text } from './text';
export class Child extends Component {

    static template = `
        <fragment>
            <renderer-frame s-if="node.type === 'frame'" children="{{node.children}}" style="{{node.props.style}}" class="{{node.props.class}}" />
            <renderer-text s-else-if="node.type === 'text'" style="{{node.props.style}}" class="{{node.props.class}}" value="{{node.name}}" />
        </fragment>
            
        
    `;
    initData() {
        return {
            node: {} as CosmicNode,
            class: [],
            types: {
                'text': 'renderer-text',
                'frame': 'renderer-frame',
            },
        };
    }
    components = {
        'renderer-frame': Frame,
        'renderer-text': Text,
    };

    // static components: {
    //     'renderer-frame': Frame
    // };
}
