import { injectable, inject } from '@cosmic/core/inversify';
import {moduleAssetPath } from '@cosmic-module/core';
import { type Renderer } from '../../types';
import { TOKENS } from '../token';
import ComponentService from './component.service';
const sanRendererPath = '@cosmic-module/renderer-san';

@injectable()
export default class RendererService {
    private rendererCache: {[index:string]: Promise<new () => Renderer> } = {};
    private rendererModule: {[index:string]: new () => Renderer } = {};
    constructor(
        @inject(TOKENS.Component) private componentService: ComponentService,
    ) {
        this.load(sanRendererPath);
        // console.log(service);
    }
    load(path: string) {
        if (!this.rendererCache[path]) {
            this.rendererCache[path] = import(
                /* @vite-ignore */
                moduleAssetPath(path, 'index.mjs') || ''
            ).then(module => {
                this.rendererModule[path] = module.renderer;
                this.componentService.loadComponentLibrary();
                return module.renderer;
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
