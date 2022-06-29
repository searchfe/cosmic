import { Component } from 'san';
import { ChildFactory } from './child';
import { type CosmicNode } from '@cosmic/core/parts';

export function FrameFactory(options: any){
    return class Frame extends Component {
        static template = `<div>
            <fragment s-for="child in renderChildren">
                <renderer-child node="{{ {...child} }}" />
            </fragment>
        </div>`;
        initData() {
            return {
                // class: [] as string[],
                // style: {} as {[index: string]: string},
                children: [] as CosmicNode[],
            };
        }

        static computed = {
            // 触发子组件的更新
            renderChildren(this: Frame) {
                return this.data.get('children').map((child: CosmicNode) => ({...child}));
            },
        };

        components = {
            'renderer-child': ChildFactory(options),
            ...options.components,
        };
    };
}
