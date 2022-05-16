import { injectable } from '@cosmic/core/inversify';
import {moduleAssetPath } from '@cosmic-module/core';
import { type Renderer } from '../../types';
const sanRendererPath = '@cosmic-module/renderer-san';

@injectable()
export default class RendererService {
    private rendererCache: {[index:string]: Promise<new () => Renderer> } = {};
    private rendererModule: {[index:string]: new () => Renderer } = {};
    constructor() {
        this.load(sanRendererPath);
    }
    load(path: string) {
        if (!this.rendererCache[path]) {
            this.rendererCache[path] = import(
                /* @vite-ignore */
                moduleAssetPath(path, 'index.mjs') || ''
            ).then(module => {
                this.rendererModule[path] = module.default;
                return module.default;
            });
        }
    }
    getRenderer(callback: (Render: new () => Renderer) => void, engine: string = sanRendererPath) {
        if (this.rendererModule[engine]) {
            callback(this.rendererModule[engine]);
        } else {
            this.load(engine);
            this.rendererCache[engine].then(callback);
        }
    }
}
