import { offlineExchange as exchange } from '@urql/exchange-graphcache';
import { makeDefaultStorage } from '@urql/exchange-graphcache/default-storage';

// import { schema } from './schema';

export const offlineExchange = exchange({
  storage: makeDefaultStorage({
    idbName: 'd2r-idb',
    maxAge: 7,
  }),
  // schema
});
