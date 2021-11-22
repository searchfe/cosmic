<!--
  @author zfy<biyingshuai@gmail.com>
  @description home component
-->
<script lang="ts">
  import Router from 'svelte-spa-router';
  import { Layout } from '@cosmic/core/components';
  import Header from './common/component/header.svelte';
  import TeamIndex from './team/index.svelte';
  import Login from './auth/login.svelte';
  import { routeFor, ROUTES } from './routes';

  const routes = {
    [routeFor(ROUTES.LOGIN)]: Login,
    [routeFor(ROUTES.INDEX)]: TeamIndex,
    [routeFor(ROUTES.DEFAULT)]: TeamIndex,
  };

</script>

<Layout classes="text-black w-full">
  <Header />
  <Router routes="{routes}" />
</Layout>
