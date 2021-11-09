<!--
  @author biyingshuai<biyingshuai@gmail.com>
  @description root container
-->

<script lang="ts">
  import { initClient } from '@urql/svelte';
  import Home from './home.svelte';
  import { routes } from './routes';
  
  initClient({
    url: 'http://localhost:3000/api/graphql',
  });
</script>

<Home {routes} />
