<script lang="typescript">
  import { initClient } from '@urql/svelte';
  import Router from 'svelte-spa-router';
  import { Layout } from '@cosmic/core/components';
  import TeamDetail from './team/component/detail.svelte';
  import TeamMenu from './team/component/collapse-list';
  import MineMenu from './design/component/mine-menu.svelte';
  import ProjectDetail from './project/component/detail.svelte';
  import AtomDetail from './design/component/atom/detail.svelte'
  import { ROUTES_ENUM, getCompleteRoute } from './routes';

  const { Sider, Content } = Layout;
  
  const routes = {
    [getCompleteRoute(ROUTES_ENUM.INDEX)]: TeamDetail,
    [getCompleteRoute(ROUTES_ENUM.TEAM_DETAIL)]: TeamDetail,
    [getCompleteRoute(ROUTES_ENUM.PROJECT_DETAIL)]: ProjectDetail,
    [getCompleteRoute(ROUTES_ENUM.DESIGN_ATOM)]: AtomDetail,
  };

  const { Header } = Layout;
 
  initClient({
    url: 'http://localhost:3000/api/graphql',
  });
</script>

<Layout class="text-black">
  <Header>
    <div class="flex items-center text-tiny text-black">
      <img class="logo" src="https://fe-dev.bj.bcebos.com/cosmic/%E6%97%A0%E6%9E%81LOGO.png" alt="logo"/>
      <span>无极设计中台</span>
    </div>
  </Header>
  <Layout class="overflow-scroll">
      <Sider>
        <MineMenu />
        <TeamMenu />
      </Sider>
      <Content class="box-border p-16 overflow-scroll">
        <Router {routes} />
      </Content>
  </Layout>
</Layout>

<style>
  .logo {
    width: 24px;
    height: 20px;
    margin-right: 7px;
  }
</style>
