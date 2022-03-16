import * as urql from '@urql/vue';

// API
export const gqlClient = urql;

// interface
export type GqlClient = typeof gqlClient;
