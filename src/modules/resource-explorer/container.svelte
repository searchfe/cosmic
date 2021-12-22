<!--
  @author zfy<biyingshuai@gmail.com>
  @description root container
-->
<script lang="ts">
  import GQLContext from './common/gql/client.svelte';
  import NetContext from './common/net/context.svelte';
</script>

<NetContext>
  <GQLContext>
    <slot />
  </GQLContext>
</NetContext>
