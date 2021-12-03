import { dedupExchange, cacheExchange, fetchExchange } from '@urql/svelte';
import { exchange as authExchange } from './auth/index';

export const exchanges = [dedupExchange, cacheExchange, authExchange, fetchExchange];
