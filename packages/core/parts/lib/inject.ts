import type { Container, interfaces } from '@cosmic/core/inversify';
import { inject as injectVue } from 'vue';


export function inject<T>(Token: interfaces.ServiceIdentifier<T>){
    const container = injectVue('container') as Container;
    return container.get(Token);
}

