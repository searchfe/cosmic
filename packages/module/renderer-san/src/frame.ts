import { Component } from 'san';
import { Child } from './child';
import { type CosmicNode } from '@cosmic/core/parts';

export class Frame extends Component {
    static template = `<div style="{{style}}" class="{{class}}">
        <fragment s-for="child in children">
            <renderer-child node="{{child}}" />
        </fragment>
    </div>`;
    initData() {
        return {
            class: [] as string[],
            style: {} as {[index: string]: string},
            children: [] as CosmicNode[],
        };
    }
    components = {
        'renderer-child': Child,
    };
}
