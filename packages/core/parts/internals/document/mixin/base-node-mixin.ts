import ChildrenMixin from './children-mixin';
import PluginDataMixinx from './plugin-data-mixin';
import { v4, v5 } from 'uuid';
import { hasMixin } from 'ts-mixer';

export default class BaseNodeMixin extends PluginDataMixinx implements Internal.PluginDataMixin{
    id: string;
    type: string;
    constructor() {
        super();
        this.id = v5('cosmic', v4());
        this.update(true);
    }
    parent: (Internal.BaseNode & ChildrenMixin) | null;
    name: string; // Note: setting this also sets `autoRename` to false on TextNodes
    readonly removed: boolean = false;
    public editTime: number;
    toString() {
        // TODO
        return '';
    }
    remove() {
        if(this.parent?.children) {
            this.parent.children = this.parent.children.filter(child => child.id !== (this.id));
            if(hasMixin(this.parent, BaseNodeMixin) || this.parent instanceof BaseNodeMixin) {
                // console.log('remove update', this.parent);
                this.update();
            }
            this.parent = null;
        }
        // TODO
    }
    update(slient = false) {
        const time = new Date();
        this.editTime = time.getTime() * 1000 + time.getMilliseconds();
        // if (this.parent) {
        //     console.log('update', this.parent, hasMixin(this.parent, BaseNodeMixin));
        // }
        if(!slient && this.parent && hasMixin(this.parent, BaseNodeMixin)) {
            // console.log('update dd', this.parent);
            this.parent.update();
        }
    }
  
    setRelaunchData(data: { [command: string]: /* description */ string }) {
        // TODO
    }
    getRelaunchData() {
        // TODO
        return {};
    }

}


export function  makeLayoutStyle(node: LayoutMixin) {
    const styles: NodeStyle = {};
    switch(node.HorizontalLayout) {
        case 0:
            styles.left = node.x + 'px';
            styles.width = node.width + 'px';
            break;
        case 1:
            styles.right = node.r + 'px';
            styles.width = node.width + 'px';
            break;
        case 2:
            styles.left = node.x + 'px';
            styles.width = ((node as any).parent.width - node.x - node.r) + 'px';
            break;
        case 3:
            break;
        case 4:
            break;
    }
    switch(node.VerticalLayout) {
        case 0:
            styles.top = node.y + 'px';
            styles.height = node.height + 'px';
            break;
        case 1:
            styles.bottom = node.b + 'px';
            styles.height = node.height + 'px';
            break;
        case 2:
            styles.top = node.y + 'px';
            styles.height = ((node as any).parent.height - node.y - node.b) + 'px';
            break;
        case 3:
            break;
        case 4:
            break;
    }
    return styles;
}