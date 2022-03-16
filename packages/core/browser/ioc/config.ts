import type { interfaces} from 'inversify';
import { Container  }  from 'inversify';
import { TOKENS } from './token';

import { gqlClient } from './gql';
import type { GqlClient } from './gql';

export function load(options: interfaces.ContainerOptions) {
    const container = new Container(options);

    // put all coupling loigc here
    container.bind<GqlClient>(TOKENS.GqlClient).toFactory<GqlClient>(() => {
        return () => {
            return gqlClient;
        };
    });
    return container;
}
