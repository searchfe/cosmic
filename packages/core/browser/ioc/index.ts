import { load } from './config';

import type { interfaces } from 'inversify';

export * as interfaces from './interfaces';
export { TOKENS } from './token';


export function createContainer(options: interfaces.ContainerOptions) {
    return load(options);
}
