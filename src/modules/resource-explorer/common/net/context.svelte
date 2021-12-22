<script lang="ts" context="module">
  export const NET_STORE_KEY = 'net_store';
</script>

<script lang="ts">
  import { setContext } from 'svelte';
  import { isOnline } from './store';

  setContext(NET_STORE_KEY, {
    isOnline,
  });
</script>

<slot />
