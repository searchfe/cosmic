import type { interfaces} from 'inversify';
import { Container  }  from 'inversify';
import { TOKENS } from './token';

import { gqlClient } from './entity/gql';

import type { GqlClient } from './interfaces';

export function load(options: interfaces.ContainerOptions) {
    const container = new Container(options);

    // put all coupling loigc here
    container.bind<GqlClient>(TOKENS.GqlClient).toConstantValue(gqlClient);
    return container;
}
