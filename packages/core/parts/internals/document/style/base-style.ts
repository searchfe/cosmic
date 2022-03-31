import { Mixin } from 'ts-mixer';
import PublishableMixin from '../mixin/publishable-mixin';
import PluginDataMixin from '../mixin/plugin-data-mixin';

export default class BaseStyle extends Mixin(PublishableMixin, PluginDataMixin) implements Internal.BaseStyle {
    readonly id: string;
    readonly type: Internal.StyleType;
    name: string;

    constructor(id: string, type: string) {
        super();
        this.id = id;
        this.type = type as Internal.StyleType;
    }

    remove() {
        // todp 
    }   
}