export * from './ioc/inject';
export * from './types';
export * from './lib/observable';
export * from './lib/gql/index';

import { Container, inject, injectable } from 'inversify';

export const inversify = { Container, inject, injectable };
