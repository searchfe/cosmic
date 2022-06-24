import { injectable } from '@cosmic/core/inversify';
import { type QueryComponentResult } from '@cosmic/core/parts';
import { Subject } from '@cosmic/core/rxjs';
import { load } from '../config';

interface ComponentLibrary {
    name: string,
    components: any[],
    schema: {
        string: any,
    },
    css: string,
}

@injectable()
export default class ComponentService {
    components = new Subject<QueryComponentResult[]>();
    component = new Subject<QueryComponentResult>();
    async loadComponentLibrary() {
        const urls: string[] = [];
        const conf = import.meta.env.VITE_RESOURCES as string;
        // console.log(conf);
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
    }
    async loadSource(configUrl: string) {
        const source = await import(configUrl);
        // console.log(configUrl, source);
        // const path = configUrl.replace(/\/([^/]+)$/, '') + '/';
        // const json = await loadJson(path + 'package.json');
        // console.log(json);
        // const config = (await import(configUrl + '?' + new Date().getTime())).default;
        // const cssPath = path+ config.cosmic.css;
        // const modulePath = path+ config.cosmic.module;
        // console.log(config, modulePath);
    }
}
