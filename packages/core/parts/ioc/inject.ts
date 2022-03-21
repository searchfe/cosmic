import type { Container } from '@cosmic/core/inversify';
import { inject as injectVue } from 'vue';


export function inject<T extends abstract new (...args: any[]) => unknown>(Token: T | string){
    const container = injectVue('container') as Container;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const service = container.get(Token);
    return service as InstanceType<T>;
}

