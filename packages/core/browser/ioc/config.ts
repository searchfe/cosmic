import { Container }  from '@cosmic/core/parts';
import { TOKENS } from './token';


import type { interfaces } from '@cosmic/core/parts';
import type { GqlClient, GqlClientProvider } from './interfaces';

export function load(options: interfaces.ContainerOptions) {
    const container = new Container(options);

    // put all coupling loigc here
    container.bind<GqlClientProvider>(TOKENS.GqlClient).toProvider<GqlClient>(() => {
        return () => {
            return Promise.resolve({ useQuery: () => 0 });
        };
    });
    return container;
}
