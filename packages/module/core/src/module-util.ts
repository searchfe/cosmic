import type { Module, Container } from '@cosmic/core/parts';
import { createApp } from 'vue';
import type { Ref, App } from 'vue';
import { moduleAssetPath} from './loader';

export function bootstrapModule(
    src: string,
    root: HTMLElement,
    container: Container,
    inherit?: string[] | boolean,
    rootProviders: any[],
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
                addInherit(moduleApp, inherit, rootProviders);
            }
            moduleApp.mount(root);
        }
    };
}

function addInherit(moduleApp: App<Element>, inherit?: string[] | boolean, rootProviders: any[]) {
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
function addProviders(container: Container, providers: inversify.ServiceIdentifier[]){
    if (providers) {
        providers.forEach((service) => {
            if(!container.isBound(service)){
                container.bind(service).to(service as any);
            }
        });
    }
}

/** load import module */
async function loadImports(container: Container,imports: string[]) {
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

export function fetchStyle(src: string, cssPath: Ref<string>) {
    if (src) {
        const linkSrc = moduleAssetPath(src, 'index.css');
        if (linkSrc) cssPath.value = linkSrc;
    }
}
