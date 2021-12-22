import { createClient as createWSClient } from 'graphql-ws';
import { subscriptionExchange as exchange } from '@urql/svelte';
import { get } from '../auth/user';

import type { Client } from 'graphql-ws';

let wsClient: Client;

export const subscriptionExchange = exchange({
  forwardSubscription(operation) {
    return {
      subscribe: sink => {
        if (!wsClient)
          wsClient = createWSClient({
            url: 'ws://localhost:3000/api/graphql',
            connectionParams: {
              Authorization: `Bearer ${get().token}`,
            },
          });
        const dispose = wsClient.subscribe(operation, sink);
        return {
          unsubscribe: dispose,
        };
      },
    };
  },
});
