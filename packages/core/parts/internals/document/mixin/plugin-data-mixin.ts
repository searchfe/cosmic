export default class PluginDataMixinx implements Internal.PluginDataMixin {
    public _pluginData: any = {};
    public _sharedPluginData: any = {};

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
        this._sharedPluginData[namespace] = this._sharedPluginData[namespace] || {};
        this._sharedPluginData[namespace][key] = this._sharedPluginData[namespace][key] || {};
        // TODO
        return this._sharedPluginData[namespace] == undefined ?
            undefined: this._sharedPluginData[namespace][key];
    }
    setSharedPluginData(namespace: string, key: string, value: any) {
        this._sharedPluginData[namespace] = this._sharedPluginData[namespace] || {};
        this._sharedPluginData[namespace][key] = value;
    }
    getSharedPluginDataKeys(namespace: string) {
        // TODO
        return [];
    }
}
