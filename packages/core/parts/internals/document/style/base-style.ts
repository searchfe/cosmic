import { Mixin } from 'ts-mixer';
import PublishableMixin from '../mixin/publishable-mixin';
import PluginDataMixin from '../mixin/plugin-data-mixin';

export default class BaseStyle extends Mixin(PublishableMixin, PluginDataMixin) implements Internal.BaseStyle {
    readonly id: string;
    readonly type: StyleType;
    name: string;

    remove() {
        // todp 
    }   
}