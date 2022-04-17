<script lang="ts" setup>
import { Layout, Content, Sider } from 'cosmic-vue';
import { RouterView, useRoute } from '@cosmic/core/router';


const route = useRoute();
</script>

<template>
    <Layout class="main">
        <Sider :class="$style.sider">
            <div :class="$style['sider-content']" class="px-14">
                <router-view name="Left" />
            </div>
        </Sider>
        <Content :class="$style.content">
            <router-view :key="route.fullPath" />
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
    background: #f5f5f5;
}
.content::-webkit-scrollbar {
    display: none; /* Chrome Safari */
}
.sider {
    box-sizing: border-box;
    width: 272px;
}
.sider-content {
    margin-top: 25px;
}
</style>
