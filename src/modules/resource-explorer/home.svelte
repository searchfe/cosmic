<!--
  @author biyingshuai<biyingshuai@gmail.com>
  @description home component
-->

<script lang="ts">
  import Router from 'svelte-spa-router';
  import type { RouteDefinition } from 'svelte-spa-router';
  import { Layout } from '@cosmic/core/components';
  import TeamMenu from './team/component/collapse-list';
  import MineMenu from './design/component/mine-menu.svelte';
  import Header from './common/components/header.svelte';

  const { Sider, Content } = Layout;

  export let routes: RouteDefinition;
</script>

<Layout class="text-black w-full">
  <Header />
  <Layout>
    <Sider>
      <MineMenu />
      <TeamMenu />
    </Sider>
    <Content classes="flex-auto p-40 overflow-hidden">
      <Router routes="{routes}" />
    </Content>
  </Layout>
</Layout>
