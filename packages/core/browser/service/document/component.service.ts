import { injectable } from '@cosmic/core/inversify';
import { type QueryComponentResult } from '@cosmic/core/parts';
import { Subject } from '@cosmic/core/rxjs';
// import { load } from '../config';


export interface ComponentLibrary {
    name: string,
    components: {
        [index: string]: any,
    },
    schema: {
        [index: string]: any,
    },
    css: string,
}

@injectable()
export default class ComponentService {
    components = new Subject<QueryComponentResult[]>();
    component = new Subject<QueryComponentResult>();
    private _componentLibraries: { [index: string]: ComponentLibrary} = {};
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
        return this._componentLibraries;
    }
    async loadSource(configUrl: string) {
        const data = await import(
            /* @vite-ignore */
            configUrl
        );
        const config: ComponentLibrary = {
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
            }
        });
        this._componentLibraries[config.name] = config;
        this.loaded.next(config.name);
    }
    getComponentLibraries() {
        return this._componentLibraries;
    }
    getComponentLibrary(name: string) {
        return this._componentLibraries[name];
    }
}
