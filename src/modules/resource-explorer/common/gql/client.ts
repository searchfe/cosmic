import { initClient } from '@urql/svelte';
import { exchanges } from './exchange/index';

export function init() {
  initClient({
    exchanges,
    url: 'http://localhost:3000/api/graphql',
  });
}
