import View from '../view';
import SplitExpand from './split-expand.svelte';

export default class SplitItemView extends View{
    private _growClassName = '';
    private _shrinkClassName = '';
    private _bgColorClassName: string[] = ['bg-cgray-100', 'dark:bg-cgray-800'];

    public contentView!: HTMLElement;
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

    public replaceContent(contentView: HTMLElement) {
        this.root.replaceChild(contentView, this.contentView);
        this.contentView = contentView;
        contentView.classList.add('flex', 'flex-1');
        return this;
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
    /** To hide expand button */
    public hideExpandButton() {
        this.expand.show = false;
        // this.expand.$destroy();
    }

}
