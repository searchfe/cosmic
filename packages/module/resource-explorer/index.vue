<script lang="ts" setup>
    import { Layout, Content, Sider } from 'cosmic-vue';
    import TeamMenu from './team/component/team-menu.vue';
    // import AtomDetail from './design/detail.vue';

    import TeamDetail from './team/detail.vue';
    // import { routeFor, ROUTES } from './routes';

    // const routes = {
    //     [routeFor(ROUTES.LOGIN)]: Login,
    //     [routeFor(ROUTES.INDEX)]: TeamIndex,
    //     [routeFor(ROUTES.DEFAULT)]: TeamIndex,
    // };
</script>

<template>
    <Layout class="main">
        <Sider :class="$style.sider">
            <div :class="$style['sider-content']">
                <TeamMenu />
            </div>
        </Sider>
        <Content :class="$style.content">
            <!-- <AtomDetail /> -->
            <TeamDetail />
        </Content>
        <!-- <Router {routes} / -->
    </Layout>
</template>

<style module>
:global(.main) {
    width: 100%;
    color: #1f1f1f;
    background: #fff;
}
.content {
    flex: auto;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 40px;
    background: #f5f5f5;
}
.sider {
    box-sizing: border-box;
    width: 272px;
}
.sider-content {
    margin-top: 25px;
}
</style>
