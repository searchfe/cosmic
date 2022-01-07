import { initClient } from '@urql/svelte';
import { exchanges } from './exchange/index';

export function init() {
  initClient({
    exchanges,
    url: 'http://sefe-d2r.bcc-bdbl.baidu.com:8280/api/graphql',
  });
}
