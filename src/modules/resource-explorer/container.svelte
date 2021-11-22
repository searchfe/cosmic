<!--
  @author zfy<biyingshuai@gmail.com>
  @description root container
-->
<script lang="ts">
  import { initClient } from '@urql/svelte';
  import { dedupExchange, cacheExchange, fetchExchange } from '@urql/svelte';

  import { exchanges as authExchange } from './auth/exchange/index';

  initClient({
    url: 'http://localhost:3000/api/graphql',
    exchanges: [dedupExchange, cacheExchange, authExchange, fetchExchange],
  });
</script>

<slot />
