import { type Client, createClient } from '@urql/vue';
import { exchanges } from './exchange/index';


export type GqlClient = Client;

export function create() {
    return createClient({
        exchanges,
        url: import.meta.env.VITE_SERVER + '/api/graphql',
        requestPolicy: 'cache-and-network',
    });
}
