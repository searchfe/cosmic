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
    removed = false;
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
            this.removed = true;
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
