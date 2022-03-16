<script lang="ts" setup>
import { Layout, Content, Sider } from 'cosmic-vue';
import { router } from '@cosmic/core/browser';
import TeamMenu from './team/component/team-menu.vue';

const { RouterView } = router;

</script>

<template>
    <Layout class="main">
        <Sider :class="$style.sider">
            <div :class="$style['sider-content']">
                <team-menu />
            </div>
        </Sider>
        <Content :class="$style.content">
            <router-view />
        </Content>
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
