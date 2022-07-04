import { injectable, inject } from '@cosmic/core/inversify';
import {moduleAssetPath } from '@cosmic-module/core';
import { type Renderer } from '../../types';
import { TOKENS } from '../token';
import ComponentService from './component.service';
import { type CosmicNode } from '@cosmic/core/parts';
const sanRendererPath = '@cosmic-module/renderer-san';

@injectable()
export default class RendererService {
    private rendererCache: {[index:string]: Promise<new () => Renderer> } = {};
    private rendererModule: {[index:string]: new () => Renderer } = {};
    constructor(
        @inject(TOKENS.Component) private componentService: ComponentService,
    ) {
        this.load(sanRendererPath);
    }
    load(path: string) {
        if (!this.rendererCache[path]) {
            this.rendererCache[path] = new Promise((resolove, reject) => {
                import(
                    /* @vite-ignore */
                    moduleAssetPath(path, 'index.mjs') || ''
                ).then(module => {
                    this.componentService.loadComponentLibrary().then(() => {
                        this.rendererModule[path] = module.renderer;
                        resolove(module.renderer);
                    });
                });
            });
        }
        return this.rendererCache[path];
    }

    async create(root: HTMLElement, node: CosmicNode) {
        const RendererConstrutor_1 = await new Promise<new () => Renderer>((resolove, reject) => {
            const RendererConstrutor = this.rendererModule[sanRendererPath];
            if (RendererConstrutor) {
                resolove(RendererConstrutor);
            } else {
                this.rendererCache[sanRendererPath].then(r => {
                    resolove(r);
                });
            }
        });
        const renderer = new RendererConstrutor_1();

        const af = document.createElement('artboard-frame') as ArtboardFrame;
        let css = '';
        const libs = this.componentService.getComponentLibraries();
        Object.keys(libs).forEach(item => {
            css += libs[item].css;
        });
        if (css) {
            af.css.innerHTML = css;
        }
        root.appendChild(af);
        renderer.create(af.body, node, this.componentService.getComponents());
        return renderer;
    }
}

class ArtboardFrame extends HTMLElement {
    public body: HTMLElement;
    public css: HTMLStyleElement;
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        this.css = document.createElement('style');
        this.body = document.createElement('section');
        // this.body.setAttributeNode(document.createAttribute('data-pmd'));
        // this.body.setAttribute('data-pmd', 'wise');
        this.body.className = 'c-container';
        shadow.appendChild(this.css);

        const styleDom = document.createElement('style');
        styleDom.innerHTML = '*{box-sizing: border-box; user-select: none;}.c-container{margin:0;padding:0;width:0;height:0;}';
        shadow.appendChild(styleDom);
        shadow.appendChild(this.body);
    }

}

customElements.define('artboard-frame', ArtboardFrame);
