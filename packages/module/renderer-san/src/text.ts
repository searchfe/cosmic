import { Component } from 'san';

export class Text extends Component {
    static template =  `
        <div style="{{style}}" class="{{class}}">
           {{ value | raw }}
        </div>
    `;
    initData() {
        return {
            value: '',
            class: [] as string[],
            style: {} as {[index: string]: string},
        };
    }
}