import ChildrenMixin from './children-mixin';
import PluginDataMixinx from './plugin-data-mixin';

export default class BaseNodeMixin extends PluginDataMixinx implements Internal.PluginDataMixin{
    id: string;
    parent: (Internal.BaseNode & ChildrenMixin) | null;
    name: string; // Note: setting this also sets `autoRename` to false on TextNodes
    readonly removed: boolean = false;
    toString() {
        // TODO
        return '';
    }
    remove() {
        if(this.parent?.children) {
            this.parent.children = this.parent.children.filter(child => child.id !== (this.id));
        }
        // TODO
    }
  
    setRelaunchData(data: { [command: string]: /* description */ string }) {
        // TODO
    }
    getRelaunchData() {
        // TODO
        return {};
    }

}