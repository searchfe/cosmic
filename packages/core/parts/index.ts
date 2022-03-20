export * from './ioc/inject';
export * from './types';
export * from './lib/observable';
export * from './lib/gql/index';

import type { interfaces } from 'inversify';
import * as inv from 'inversify';

export namespace inversify {
    export type Container = inv.Container;
    export type ServiceIdentifier = interfaces.ServiceIdentifier;
    export const inject = inv.inject;
    export const injectable = inv.injectable;
}
