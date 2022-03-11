import type { Container } from 'inversify';
import { inject as injectVue } from 'vue';


export function inject<T extends abstract new (...args: never) => unknown>(Token: T){
    const container = injectVue('container') as Container;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const service = container.get(Token);
    return service as T;
}

