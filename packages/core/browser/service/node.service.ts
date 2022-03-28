import { type Observable, Subject, BehaviorSubject, of } from '@cosmic/core/rxjs';
import { injectable } from '@cosmic/core/inversify';

import { type SceneNode, DocumentNode, PageNode, ComponentNode, TextNode } from '@cosmic/core/parts';

@injectable()
export default class NodeService {
    public document: Subject<DocumentNode>;
    public selection: Subject<Array<PageNode | SceneNode>>;

    private _document: DocumentNode;
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
        this.document = new BehaviorSubject(this._document);
        this.selection = new Subject();
    }
    setSelection(ids: string[]) {
        if (ids.length === 0) return;
        if (ids.length === 1) {
            this.selection.next([this._document.findOne(node => node.id == ids[0])]);
            return;
        }
        const rs = this.selection.next(this._document.findAll(node => ids.indexOf(node.id) > -1));

    }
}
