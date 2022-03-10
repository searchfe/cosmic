import { load } from './config';

import type { interfaces } from '@cosmic/core/parts';

export * from './interfaces';
export * from './token';


export function createContainer(options: interfaces.ContainerOptions) {
    return load(options);
}
