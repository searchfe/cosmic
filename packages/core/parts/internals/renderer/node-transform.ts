import type { CosmicNode } from './types';
import { ChildrenMixin, type SceneNode } from '../document';
import { makeStyle }from './make-style';
import { hasMixin } from '../';
export default class NodeTransform {
    private node: CosmicNode;
    private editTimeList: {[id: string]: number} = {};
    private childTransform: {[id: string]: NodeTransform} = {};
    constructor(private dom: SceneNode) {}
    transfer() {
        this.makeFrameNode();
        return this.node;
    }
    makeFrameNode() {
        this._initNode();
        if (this.dom.editTime === this.editTimeList[this.dom.id]) return;
        this.editTimeList[this.dom.id] = this.dom.editTime;
        const style = makeStyle(this.dom);
        if (!equal(style, this.node.props.style)) {
            this.node.props.style = style;
        }
        if (!equal(style, this.node.props.style)) {
            this.node.props.style = style;
        }
        if (!equal(style, this.node.props.style)) {
                this.node.props.style = style;
        }
        this.node.props.class = [];
        this._getUpdateChildren();

    }
    _initNode() {
        if (this.node === undefined) {
            this.node = {
                id: this.dom.id,
                name: 'frame',
                type: this.dom.type.toLowerCase(),
                parent: '-1',
                props: {
                    style: {},
                },
            };
        }
    }
    _getUpdateChildren() {
        if (!hasMixin(this.dom, ChildrenMixin)) return;
        let dirty = false;
        const list = this.childTransform;
        this.childTransform = {};
        const transforms: NodeTransform[] = this.dom.children?.map(child => {
            let transform: NodeTransform;
            if(list[child.id]){
                transform = list[child.id];
            } else {
                transform = new NodeTransform(child);
                dirty = true;
            }
            this.childTransform[child.id] = transform;
            return transform;
        });
        this.node.children = transforms.map(transform => transform.transfer());
        if (Object.keys(list).length !== Object.keys(this.childTransform).length) dirty = true;
        if (dirty) {
            this.node = {...this.node};
        }
    }

}

type SimpleProps = {[index: string]: string};

function equal(style: SimpleProps, target: SimpleProps = {}) {
    const keys = Object.keys(style);
    if (keys.length !== Object.keys(target).length) return false;
    for(const key in keys) {
        if (style[key] !== target[key]) {
            return false;
        }
    }
    return true;
}