import { injectable } from '@cosmic/core/inversify';
import { type QueryComponentResult, ComponentNode } from '@cosmic/core/parts';
import { Subject } from '@cosmic/core/rxjs';
import type { ComponentLibrary, ComponentLibraryItem, ComponentList, ComponentListItem } from '../../';

@injectable()
export default class ComponentService {
    components = new Subject<QueryComponentResult[]>();
    component = new Subject<QueryComponentResult>();
    private _library: ComponentLibrary = {};
    private _list: ComponentList = {};
    public loaded: Subject<string> = new Subject();


    async loadComponentLibrary() {
        const urls: string[] = [];
        const conf = import.meta.env.VITE_RESOURCES as string;
        if (conf) {
            const matches = conf.match(/'(\S+)'/g);
            if (matches) {
                matches.forEach(m => {
                    urls.push(m.substring(1, m.length - 1));
                });
            }
        }
        for(let i = 0; i < urls.length; i++) {
            await this.loadSource(urls[i]);
        }
        return this._library;
    }
    async loadSource(configUrl: string) {
        const data = await import(
            /* @vite-ignore */
            configUrl
        );
        const prefix = 'cos' + data.config.name.replace(/\W/g, '-');
        const config: ComponentLibraryItem = {
            name: data.config.name,
            css: data.css,
            schema: {},
            components: {},
        };
        const keys = Object.keys(data.config.cosmic.schema);
        keys.forEach(key => {
            if (data.components[key]) {
                config.schema[key] = data.config.cosmic.schema[key];
                config.components[key] = data.components[key];

                const item: ComponentListItem = {
                    id: 'cos-' + data.config.name.replace(/\W/g, '-').replace(/^-/, '') + '-' + key.toLowerCase(),
                    name: key,
                    description: config.schema[key].description || key,
                    packageName: data.config.name,
                    component: config.components[key],
                    schema: config.schema[key].schema,
                    data: config.schema[key].defaultProps || {},
                    image: config.schema[key].preview?.image || '',
                    tags: config.schema[key].preview?.tags || '',
                };
                this._list[item.id] = item;
            }
        });
        this._library[config.name] = config;
        this.loaded.next(config.name);
    }

    getComponentLibraries() {
        return this._library;
    }

    getComponentLibrary(name: string) {
        return this._library[name];
    }

    createComponent(packageName: string, componentId: string) {
        // const Creator = this._componentLibraries[packageName].components[componentId];
        // const DataModel = this._componentLibraries[packageName].schema[componentId].defaultProps;
        // const DataShema = this._componentLibraries[packageName].schema[componentId].schema;

    }
    createComponentNode(id: string) {
        const node = new ComponentNode();
        const c = this._list[id];
        node.name = c.description;
    

        node.setSharedPluginData('cosmic', 'component', {
            id,
            data: c.data,
        });
        return node;
    }
    getComponents() {
        return this._list;
    }
}
