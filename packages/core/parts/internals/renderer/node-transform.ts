import type { CosmicNode } from './types';
import { BaseFrameMixin, BaseNodeMixin, ChildrenMixin, ComponentNode, FrameNode, TextNode, type SceneNode } from '../document';
import { makeStyle }from './style/make-style';
import { hasMixin } from '../';
import { makeFenceGuide } from './guide/fence';

interface NodeTransformOptions {
    needGuide: boolean,
}

export class NodeTransform {
    private node: CosmicNode;
    private editTimeList: {[id: string]: number} = {};
    private childTransform: {[id: string]: NodeTransform} = {};
    constructor(private dom: SceneNode, private options: NodeTransformOptions = {needGuide: false}) {}
    transfer() {
        this.makeFrameNode();
        this.makeText();
        this.makeComponent();
        return this.node;
    }
    makeFrameNode() {
        this._initNode();
        if (this.dom.editTime === this.editTimeList[this.dom.id]) return;
        this.editTimeList[this.dom.id] = this.dom.editTime;
        const style = makeStyle(this.dom);
        if (!equal(this.node.props.style, style)) {
            this.node.props.style = style;
        }
        this.node.props.class = [];
        this._getUpdateChildren();

    }
    makeText() {
        if(hasMixin(this.dom, TextNode)) {
            this.node.props.value = this.dom.characters;
        }
    }
    makeComponent() {
        if(hasMixin(this.dom, ComponentNode)) {
            const {
                id,
                data,
                slot,
            } = this.dom.getSharedPluginData('cosmic', 'component');
            this.node.data = data;
            this.node.slot = slot;
            this.node.props.componentId = id;
        }
    }
    _initNode() {
        if (this.node === undefined) {
            this.node = {
                id: this.dom.id,
                name: this.dom.name,
                type: this.dom.type.toLowerCase(),
                parent: this.dom.parent?.id ?? '-1',
                props: {
                    style: {},
                },
            };
        }
    }
    _getUpdateChildren() {
        if (!hasMixin(this.dom, ChildrenMixin)) return;
        const children = this.dom.children || [];
        let dirty = false;
        const list = this.childTransform;
        this.childTransform = {};
        const transforms: NodeTransform[] = children.map(child => {
            let transform: NodeTransform;
            if(list[child.id]){
                transform = list[child.id];
            } else {
                transform = new NodeTransform(child, this.options);
                dirty = true;
            }
            this.childTransform[child.id] = transform;
            return transform;
        });
        this.node.children = transforms.map(transform => transform.transfer());
        // add guide dom
        if (hasMixin(this.dom, BaseFrameMixin) && hasMixin(this.dom, BaseNodeMixin) && this.options.needGuide) {
            const guide = makeFenceGuide(this.dom);
            if (guide) {
                this.node.children.forEach(node => {
                    node.props.style = node.props.style || {};
                    node.props.style['z-index'] = node.props.style?.['z-index'] || '1';
                });
                this.node.children.unshift(new NodeTransform(guide, {
                    ...this.options,
                    needGuide: false,
                }).transfer());
            }
        }
        if (Object.keys(list).length !== Object.keys(this.childTransform).length) dirty = true;
        // if (dirty) {
            this.node = {...this.node};
        // }
    }

}

type SimpleProps = {[index: string]: string};

function equal(style: SimpleProps = {}, target: SimpleProps = {}) {
    const keys = Object.keys(style);
    if (keys.length !== Object.keys(target).length) return false;
    for(const key of keys) {
        if (style[key] !== target[key]) {
            return false;
        }
    }
    return true;
}
