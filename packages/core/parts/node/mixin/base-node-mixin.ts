import PluginDataMixinx from '../mixin/plugin-data-mixin';

export default class BaseNodeMixin extends PluginDataMixinx implements Internal.PluginDataMixin{
    id: string;
    readonly parent: (Internal.BaseNode & Internal.ChildrenMixin) | null;
    name: string; // Note: setting this also sets `autoRename` to false on TextNodes
    readonly removed: boolean = false;
    toString() {
        // TODO
        return '';
    }
    remove() {
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