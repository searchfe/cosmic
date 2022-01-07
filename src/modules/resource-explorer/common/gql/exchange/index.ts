import { dedupExchange, fetchExchange } from '@urql/svelte';
import { authExchange } from './auth/index';
import { subscriptionExchange } from './websocket/index';
import { offlineExchange } from './offline/index';

export const exchanges = [dedupExchange, offlineExchange, authExchange, fetchExchange, subscriptionExchange];
