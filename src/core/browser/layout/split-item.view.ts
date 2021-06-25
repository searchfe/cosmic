import View from '../view';
import SplitExpand from './split-expand.svelte';
type expandCallback = (position: number) => void;

export default class SplitItemView extends View{
    private _growClassName = '';
    private _shrinkClassName = '';
    private _bgColorClassName: string[] = ['bg-cgray-100', 'dark:bg-cgray-800'];

    private contentView!: HTMLElement;
    private expand!: SplitExpand;

    constructor() {
        super();
        this.addExpandButton();
        this.setDefaultClass();

    }

    public setContent(contentView: HTMLElement) {
        this.contentView = contentView;
        this.root.classList.add('flex');
        contentView.classList.add('flex', 'flex-1');
        return this.prepend(contentView);
    }

    public setGrow(className = 'flex-grow') {
        this.root.classList.remove(this._shrinkClassName);
        this._shrinkClassName = '';
        this._growClassName = className;
        this.root.classList.add(this._growClassName);
    }

    public setShrink(className = 'flex-shrink') {
        this.root.classList.remove(this._growClassName);
        this._growClassName = '';
        this._shrinkClassName = className;
        this.root.classList.add(this._shrinkClassName);
    }

    public isShrink() {
        return  !!this._growClassName;
    }

    private setDefaultClass() {
        this.root.classList.add('flex-grow', 'rounded-xl');
        this.root.classList.add('relative');
        this.root.classList.add(...this._bgColorClassName);
        
    }
    private addExpandButton() {
        this.expand = new SplitExpand({target: this.root});
    }

}
