import { Component } from 'san';

export class Text extends Component {
    /* bca-disable */ 
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