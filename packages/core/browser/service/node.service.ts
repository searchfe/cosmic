import { type Observable, Subject, BehaviorSubject, of } from '@cosmic/core/rxjs';
import { injectable } from '@cosmic/core/inversify';

import { type SceneNode, DocumentNode, PageNode, ComponentNode, TextNode } from '@cosmic/core/parts';

@injectable()
export default class NodeService {
    private _document: DocumentNode;
    private documentSubject: Subject<DocumentNode>;
    private _selection: Subject<PageNode | SceneNode>;
    constructor() {
        this._document = new DocumentNode();
        const page = new PageNode();
        const comp = new ComponentNode();
        const text = new TextNode();
        text.name = '文本';
        page.name = '模板-1';
        comp.name = '组件';
        text.id = '10';
        page.id = '20';
        comp.id = '30';
        this._document.id = '40';
        comp.appendChild(text);
        page.appendChild(comp);
        this._document.appendChild(page);
        this.documentSubject = new BehaviorSubject(this._document);
        this._selection = new Subject();
    }
    change(id: string) {
        this._selection.next(this._document.findOne(node => node.id == id));
    }
    selection() {
        return this._selection;
    }
    document() {
        return this.documentSubject;
    }
}