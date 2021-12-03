<!--
  @author zfy<biyingshuai@gmail.com>
  @description root container
-->
<script lang="ts">
  import { init as initGqlClient } from './common/gql/client';

  initGqlClient();
</script>

<slot />
