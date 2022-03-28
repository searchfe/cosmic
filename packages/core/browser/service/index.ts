import { load } from './config';
import type { interfaces } from '@cosmic/core/inversify';


export function createContainer(options: interfaces.ContainerOptions) {
    return load(options);
}

export { TOKENS } from './token';
export * from './gql.service';
export type { RouterServiceAPI } from './router/index.service';
export type { default as NodeService } from './node.service';
export * from './styles';
