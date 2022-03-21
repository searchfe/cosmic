import { load } from './config';

import type { interfaces } from '@cosmic/core/inversify';

export { TOKENS } from './token';
export * as gqlClient from './gql';

export function createContainer(options: interfaces.ContainerOptions) {
    return load(options);
}
