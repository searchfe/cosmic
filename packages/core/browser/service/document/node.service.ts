import { type Observable, Subject, BehaviorSubject, of } from '@cosmic/core/rxjs';
import { injectable } from '@cosmic/core/inversify';


import { type SceneNode, FrameNode, DocumentNode, PageNode, ComponentNode, TextNode, SolidPaint, GroupNode, BaseNodeMixin } from '@cosmic/core/parts';

@injectable()
export default class NodeService {
    public document: Subject<DocumentNode>;
    public selection: Subject<Array<PageNode | SceneNode>>;
    public currentPage: Subject<PageNode>;
    
    private _watchList: {[index: string]: {subject: Subject<BaseNodeMixin>, node: BaseNodeMixin, lastEditTime: number}} = {};
    private _document: DocumentNode;
    private _selection: Array<PageNode | SceneNode> = [];
    private _currentPage: PageNode;

    constructor() {
        this._document = new DocumentNode();
        this._document.parent = this as any;
        this.document = new BehaviorSubject(this._document);
        this.selection = new Subject();
        this.addPage();
        this.currentPage = new BehaviorSubject(this._document.children[0]);
    }
    new() {
        const document = new DocumentNode();
        this.load(document);
        this.addPage();
    }
    setSelection(ids: string[]) {
        if (ids.length === 0) {
            // do sth
            this._selection = [];
        } else if (ids.length === 1) {
            this._selection = [this._document.findOne(node => node.id == ids[0])];
        } else {
            this._selection = this._document.findAll(node => ids.indexOf(node.id) > -1);
        }
        requestAnimationFrame(() => {
            this._selection = this._selection.filter(s => s !== undefined);
            if (this._selection.length) {
                this.updateCurrentPage(findParentPage(this._selection[0]));
                this.selection.next(this._selection);
            }
        });
    }
    addPage() {
        const page = new PageNode();
        page.name = `页面 ${increaseId(this._document, page.type)}`;
        const paint = new SolidPaint();
        paint.color = { r: 245, g: 245, b: 245 };
        page.backgrounds = [paint];
        this._document.appendChild(page);
        page.update();
        this.setSelection([page.id]);
    }
    addFrame(target: PageNode | FrameNode | GroupNode) {
        // const page = this._selection.filter(node => node.type === 'PAGE').at(0) as PageNode;
        // if (!page) return;
        const frame = new FrameNode();
        frame.name = `画框 ${increaseId(this._document, frame.type)}`;
        frame.width = 414;
        frame.height = 736;
        frame.parent = target;
        const paint = new SolidPaint();
        paint.color = { r: 255, g: 255, b: 255 };
        frame.backgrounds = [paint];
        target.appendChild(frame);
        frame.update();
        this.setSelection([frame.id]);
        // console.log(target, frame);
        // console.log('add frame', this._document);
        return frame;
    }

    addText(target: PageNode | FrameNode | GroupNode) {
        const textNode = new TextNode();
        textNode.name = `文本 ${increaseId(this._document, textNode.type)}`;
        const paint = new SolidPaint();
        paint.color = { r: 0, g: 0, b: 0 };
        textNode.fills = [paint];
        textNode.parent = target;
        target.appendChild(textNode);
        textNode.update();
        this.setSelection([textNode.id]);
        return textNode;
    }

    addComponent(target: PageNode | FrameNode | GroupNode) {
        // const page = this._selection.filter(node => node.type === 'PAGE').at(0) as PageNode;
        // if (!page) return;
        const comp = new ComponentNode();
        comp.name = `组件 ${increaseId(this._document, comp.type)}`;
        comp.parent = target;
        target.appendChild(comp);
        comp.update();
        this.setSelection([comp.id]);
        return comp;
    }
    deleteSelection() {
        let shouldChangePage = false;
        this._selection.forEach(node => {
            if (node.id === this._currentPage.id) {
                shouldChangePage = true;
            }
            node.remove();
        });
        if (shouldChangePage && this._document.children.length) {
            this.updateCurrentPage(this._document.children[0]);
            this.setSelection([this._document.children[0].id]);
        } else {
            this.setSelection([]);
        }
    }
    unwatch(node: BaseNodeMixin) {
        if(node && node.id && this._watchList[node.id]) {
            delete this._watchList[node.id];
        } 
    }
    watch(node: BaseNodeMixin) {
        this._watchList[node.id] = this._watchList[node.id] || {
            subject: new Subject<BaseNodeMixin>(),
            node,
            lastEditTime: node.editTime || 0,
        };
        return this._watchList[node.id].subject;
    }

    updateDocument() {
        requestAnimationFrame(() => {
            this.document.next(this._document);
            if (this._currentPage) this.currentPage.next(this._currentPage);
        });

    }
    updateCurrentPage(page?: PageNode) {
        if (page && page.id !== this._currentPage?.id) {
            this._currentPage = page;
            requestAnimationFrame(() => {
                this.currentPage.next(this._currentPage);
            });
        }
    }

    getSelection(): Array<PageNode | SceneNode> {
        return this._selection;
    }
    getDocument() {
        return this._document;
    }

    load(doc: DocumentNode) {
        this._document = doc;
        this._document.parent = this as any;
        this._currentPage = doc.children[0] || undefined;
        this._selection = [];
        this.updateDocument();
        this.updateCurrentPage();
        this.setSelection([]);
    }
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
