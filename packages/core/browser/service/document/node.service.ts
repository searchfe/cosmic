import { type Observable, Subject, BehaviorSubject, of } from '@cosmic/core/rxjs';
import { injectable } from '@cosmic/core/inversify';

import { type SceneNode, DocumentNode, PageNode, ComponentNode, TextNode } from '@cosmic/core/parts';

@injectable()
export default class NodeService {
    public document: Subject<DocumentNode>;
    public selection: Subject<Array<PageNode | SceneNode>>;

    private _document: DocumentNode;
    private _selection: Array<PageNode | SceneNode> = [];
    constructor() {
        this._document = new DocumentNode();
        // const page = new PageNode();
        // const comp = new ComponentNode();
        // const text = new TextNode();
        // text.name = '文本';
        // page.name = '模板-1';
        // comp.name = '组件';
        // text.id = '10';
        // page.id = '20';
        // comp.id = '30';
        this._document.id = id();
        // comp.appendChild(text);
        // page.appendChild(comp);
        // this._document.appendChild(page);
        this.document = new BehaviorSubject(this._document);
        this.selection = new Subject();
    }
    setSelection(ids: string[]) {
        if (ids.length === 0) return;
        if (ids.length === 1) {
            this._selection = [this._document.findOne(node => node.id == ids[0])];
        } else {
            this._selection = this._document.findAll(node => ids.indexOf(node.id) > -1);
        }
        this.selection.next(this._selection);
    }
    addPage() {
        const page = new PageNode();
        const existedPage = this._document.findAll(node => node.type === 'PAGE');
        page.name = `页面-${existedPage.length}`;
        page.id = id();
        this._document.appendChild(page);
        this.document.next(this._document);
    }
    deleteSelection() {
        this._selection.forEach(node => node.remove());
        console.log(this._selection, this._document);
        this.document.next(this._document);
    }
}

function id() {
    return new Date().getTime().toString();
}
