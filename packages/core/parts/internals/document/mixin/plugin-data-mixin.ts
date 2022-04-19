export default class PluginDataMixinx implements Internal.PluginDataMixin {
    public _pluginData: any = {};

    getPluginData(key: string) {
        // TODO
        return this._pluginData[key];
    }
    setPluginData(key: string, value: any) {
        this._pluginData[key] = value;
        // TODO
    }
    getPluginDataKeys() {
        // TODO
        return [];
    }
    getSharedPluginData(namespace: string, key: string) {
        // TODO
        return '';
    }
    setSharedPluginData(namespace: string, key: string, value: string) {
        // TODO
    }
    getSharedPluginDataKeys(namespace: string) {
        // TODO
        return [];
    }
}
