import type { Container, interfaces  } from '@cosmic/core/inversify';
import { type Module  } from '@cosmic/core/parts';
import { createApp } from 'vue';
import type { App } from 'vue';
import { moduleAssetPath} from './loader';

export function bootstrapModule(
    src: string,
    root: HTMLElement,
    container: Container,
    rootProviders: any[],
    inherit?: string[] | boolean,
) {
    return async function(module: Module) {
        if (!root) return;
        if (module.imports) {
            await loadImports(container, module.imports);
        }
        if (module.providers) {
            addProviders(container, module.providers);
            updateProviderList(container, src);
        }
        if (module.root) {
            const moduleApp = createApp(module.root);
            moduleApp.provide('container', container);
            if (inherit) {
                addInherit(moduleApp, rootProviders, inherit);
            }
            moduleApp.mount(root);
        }
    };
}

function addInherit(moduleApp: App<Element>, rootProviders: any[], inherit?: string[] | boolean) {
    const filterList = inherit === true ? [] : (inherit || []);
    filterList.push('container');
    // TODO: extract it to an interface
    // TODO: filter router key
    rootProviders.forEach(ins => {
        if (filterList.indexOf(ins.k) === -1) {
            moduleApp.provide(ins.k, ins.v);
        }
    });
}

/** add providers to container */
function addProviders(container: Container, providers: interfaces.ServiceIdentifier[]){
    if (providers) {
        providers.forEach((service) => {
            if(!container.isBound(service)){
                container.bind(service).to(service as any);
            }
        });
    }
}

/** load import module */
async function loadImports(container: Container, imports: string[]) {
    if(imports) {
        for(const imp of imports) {
            if (isImported(container, imp)) return;
            const module = await fetchModule(imp) as Module;
            if (module.providers) {
                addProviders(container, module.providers);
                updateProviderList(container, imp);
            }
        }
    }
}

/** mark module which its providers has been added */
function updateProviderList(container: Container, src: string) {
    let map: {[key: string]: boolean} = {};
    if(container.isBound('_providers_')) {
        map = container.get('_providers_');
    }
    map[src] = true;
}

/** check module if its providers has been added */
function isImported(container: Container, src: string) {
    if(container.isBound('_providers_')) {
        const map: {[key: string]: boolean} = container.get('_providers_');
        return !!map[src];
    }
    return false;
}

export async function fetchModule(src: string) {
    if(!src) throw new Error('root can not be null!');
    const esm = await import(
        /* @vite-ignore */
        src
    );
    if (esm.default) {
        return esm.default as Module;
    }
    throw new Error('default can not be null!');
}

export function fetchStyle(src: string) {
    if (src) {
        const linkSrc = moduleAssetPath(src, 'index.css');
        if (linkSrc) {
            addStyleToHead(src, linkSrc);
        }
    }
}

export function addStyleToHead(id: string, linkSrc: string) {
    const existed = document.head.querySelector(`link[module="${id}"]`);
    if (existed === null) {
        const linkDom = document.createElement('link');
        linkDom.rel = 'stylesheet';
        linkDom.href = linkSrc;
        linkDom.setAttribute('module', id);
        document.head.prepend(linkDom);
    }
}

export function removeStyle(src: string) {
    const existed = document.head.querySelector(`link[module="${src}"]`);
    const existedDom = document.body.querySelectorAll(`[module="${src}"]`);
    if (existed && existedDom.length === 0) {
        existed.parentNode?.removeChild(existed);
    }
}
export function removeChildStyle(root: HTMLElement) {
    root.querySelectorAll('[module]').forEach(node => {
        const src = node.getAttribute('module');
        if((node as any)['__vue_app__']) {
            (node as any)['__vue_app__'].unmount();
        }
        if(node) {
            node.parentNode?.removeChild(node);
        }
        if(src) removeStyle(src);
    });
}