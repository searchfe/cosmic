<!--
  @author zfy<biyingshuai@gmail.com>
  @description home component
-->
<script lang="ts">
  import Router from 'svelte-spa-router';
  import { Layout } from '@cosmic/core/components';
  import TeamMenu from '../team/component/collapse-list';
  import MineMenu from '../design/component/mine-menu.svelte';
  import TeamDetail from '../team/component/detail.svelte';
  import ProjectDetail from '../project/component/detail.svelte';
  import AtomDetail from '../design/component/atom/detail.svelte';
  import { routeFor, ROUTES } from '../routes';

  const routes = {
    [routeFor(ROUTES.INDEX)]: TeamDetail,
    [routeFor(ROUTES.TEAM_DETAIL)]: TeamDetail,
    [routeFor(ROUTES.PROJECT_DETAIL)]: ProjectDetail,
    [routeFor(ROUTES.DESIGN_ATOM)]: AtomDetail,
  };

  const { Sider, Content } = Layout;
</script>

<Layout>
<Sider>
  <MineMenu />
  <TeamMenu />
</Sider>
<Content classes="flex-auto p-40 overflow-x-hidden overflow-y-scroll">
  <Router routes="{routes}" />
</Content>
<Layout classes="w-270 h-full bg-white px-14 pt-40 md:hidden 2xl:flex">
  <div class="w-full h-30 flex items-center justify-between text-base">
    <div class="text-black font-semibold">
      业务成员
    </div>
    <div class="text-blue">
      邀请
    </div>
  </div>
</Layout>
</Layout>
