import type { Container } from 'inversify';
import { inject as injectVue } from 'vue';
// import type { interfaces } from 'inversify';

export function inject<T>(Token: new() => T){
    const container = injectVue('container') as Container;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const service = container.get(Token);
    return service as T;
}

