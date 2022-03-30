import { type Observable, Subject, BehaviorSubject, of } from '@cosmic/core/rxjs';
import { injectable } from '@cosmic/core/inversify';

import { type SceneNode, FrameNode, DocumentNode, PageNode, ComponentNode, TextNode } from '@cosmic/core/parts';

@injectable()
export default class NodeService {
    public document: Subject<DocumentNode>;
    public selection: Subject<Array<PageNode | SceneNode>>;
    public currentPage: Subject<PageNode>;

    private _document: DocumentNode;
    private _selection: Array<PageNode | SceneNode> = [];
    private _currentPage: PageNode;
    constructor() {
        this._document = new DocumentNode();
        this._document.id = id();
        this.document = new BehaviorSubject(this._document);
        this.selection = new Subject();
        this.currentPage = new Subject();
        this.addPage();
    }
    setSelection(ids: string[]) {
        if (ids.length === 0) return;
        if (ids.length === 1) {
            this._selection = [this._document.findOne(node => node.id == ids[0])];
        } else {
            this._selection = this._document.findAll(node => ids.indexOf(node.id) > -1);
        }
        this.updatePage(findParentPage(this._selection[0]));
        this.selection.next(this._selection);
    }
    addPage() {
        const page = new PageNode();
        page.name = `页面 ${increaseId(this._document, page.type)}`;
        page.id = id();
        this._document.appendChild(page);
        this.updateDocument();
        this.setSelection([page.id]);
    }
    addFrame() {
        const page = this._selection.filter(node => node.type === 'PAGE').at(0) as PageNode;
        if (!page) return;
        const frame = new FrameNode();
        frame.id = id();
        frame.name = `画框 ${increaseId(this._document, frame.type)}`;
        frame.parent = page;
        page.appendChild(frame);
        this.updateDocument();
        this.setSelection([frame.id]);
    }
    deleteSelection() {
        this.document.next(this._document);
        this._selection.forEach(node => node.remove());
    }
    updateDocument() {
        this.document.next(this._document);
    }
    updatePage(page?: PageNode) {
        if (page && page.id !== this._currentPage?.id) {
            this._currentPage = page;
            this.currentPage.next(this._currentPage);
        }
    }
}

function id() {
    return new Date().getTime().toString();
}

function increaseId(document: DocumentNode | PageNode, type: string) {
    const existed = document.findAll(node => node.type === type);
    return existed.length + 1;
}

function findParentPage(node: PageNode | SceneNode): PageNode | undefined {
    if (node && node.type === 'PAGE') {
        return node as PageNode;
    }
    if (node && node.parent) {
        return findParentPage(node.parent as any);
    }
    return;
}