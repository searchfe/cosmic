import { Component } from 'san';
import { type CosmicNode } from '@cosmic/core/parts';
import { FrameFactory } from './frame';
import { Text } from './text';
export function ChildFactory(options: any) {
    return class Child extends Component {

        static template = `
            <fragment>
                <renderer-frame s-if="node.type === 'frame'" children="{{node.children}}" style="{{node.props.style}}" class="{{node.props.class}}" />
                <renderer-text s-else-if="node.type === 'text'" style="{{node.props.style}}" class="{{node.props.class}}" value="{{node.props.value}}" />
                <x-label s-else s-is="node.props.componentId" s-bind="{{node.data}}" style="{{node.props.style}}" class="{{node.props.class}}">
                    {{node.slot.default}}
                </x-label>
            </fragment>

        `;
        initData() {
            return {
                node: {} as CosmicNode,
                // class: [],
                // types: {
                //     'text': 'renderer-text',
                //     'frame': 'renderer-frame',
                // },
            };
        }
        components = {
            'renderer-frame': FrameFactory(options),
            'renderer-text': Text,
            ...options.components,
        };
        filters = {
            ss: function (v: object) {
                return JSON.stringify(v);
            },
        };
        // static components: {
        //     'renderer-frame': Frame
        // };
    };
}