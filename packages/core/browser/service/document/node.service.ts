import { type Observable, Subject, BehaviorSubject, of } from '@cosmic/core/rxjs';
import { injectable } from '@cosmic/core/inversify';

import { type SceneNode, FrameNode, DocumentNode, PageNode, ComponentNode, TextNode } from '@cosmic/core/parts';

@injectable()
export default class NodeService {
    public document: Subject<DocumentNode>;
    public selection: Subject<Array<PageNode | SceneNode>>;

    private _document: DocumentNode;
    private _selection: Array<PageNode | SceneNode> = [];
    constructor() {
        this._document = new DocumentNode();
        this._document.id = id();
        this.document = new BehaviorSubject(this._document);
        this.selection = new Subject();
        this.addPage();
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
        page.name = `页面 ${increaseId(this._document, page.type)}`;
        page.id = id();
        this._document.appendChild(page);
        this.updateDocument();
    }
    addFrame() {
        const page = this._selection.filter(node => node.type === 'PAGE').at(0) as PageNode;
        if (!page) return;
        const frame = new FrameNode();
        frame.id = id();
        frame.name = `画框 ${increaseId(this._document, frame.type)}`;
        page.appendChild(frame);
        this.updateDocument();
    }
    deleteSelection() {
        this._selection.forEach(node => node.remove());
        console.log(this._selection, this._document);
        this.document.next(this._document);
    }
    updateDocument() {
        this.document.next(this._document);
    }
}

function id() {
    return new Date().getTime().toString();
}

function increaseId(document: DocumentNode | PageNode, type: string) {
    const existed = document.findAll(node => node.type === type);
    return existed.length + 1;
}
