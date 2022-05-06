import { injectable } from '@cosmic/core/inversify';
import {moduleAssetPath } from '@cosmic-module/core';
import { type Renderer } from '../../types';
const sanRendererPath = '@cosmic-module/renderer-san';

@injectable()
export default class RendererService {
    private rendererModule: {[index:string]: Promise<new () => Renderer> } = {};
    constructor() {
        this.load(sanRendererPath);
    }
    load(path: string) {
        if (!this.rendererModule[path]) {
            this.rendererModule[path] = import(
                /* @vite-ignore */
                moduleAssetPath(path, 'index') || ''
            ).then(module => module.default);
        }
    }
    async getRenderer(engine: string = sanRendererPath) {
        this.load(engine);
        return this.rendererModule[engine];
        // import('')
    }
}