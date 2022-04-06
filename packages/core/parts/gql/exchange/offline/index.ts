import { offlineExchange as exchange } from '@urql/exchange-graphcache';
import { makeDefaultStorage } from '@urql/exchange-graphcache/default-storage';
// import { schema } from './schema';

// import type { IntrospectionData } from '@urql/exchange-graphcache/dist/types/ast/index';

export const offlineExchange = exchange({
    storage: makeDefaultStorage({
        idbName: 'd2r-idb',
        maxAge: 7,
    }),
    // schema: schema as unknown as IntrospectionData,
});
