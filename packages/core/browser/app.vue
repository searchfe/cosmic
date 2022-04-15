<script lang="ts" setup>
import { Layout } from 'cosmic-vue';
import { RouterView } from 'vue-router';

const { Content, Header } = Layout;

</script>

<template>
    <Layout style="height: 100vh">
        <Header class="h-26">
            <m-component
                src="@cosmic-module/app-bar"
                class="w-full"
            />
        </Header>
        <Content class="overflow-hidden">
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component" />
                </keep-alive>
            </router-view>
        </Content>
    </Layout>
</template>

<style>
@import 'cosmic-ui/style.css';
@import 'cosmic-ui/variables.css';
@import 'cosmic-ui/variables-dark.css';
@import 'cosmic-ui/utilities.css';
* {
    box-sizing: border-box;
    user-select: none;
}

::-webkit-color-swatch-wrapper {
	margin: 0;
	padding: 0;
}

:root {
    font-size: 10px;
    --border-style: solid;
    --border-color: var(--color-gray-50);
}

body {
    margin: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    overscroll-behavior-x: none;
}

.border-left {
    border-left: var(--border) var(--border-style) var(--border-color);
}
.border-right {
    border-right: var(--border) var(--border-style) var(--border-color);
}
.border-bottom {
    border-bottom: var(--border) var(--border-style) var(--border-color);
}
.border-top {
    border-top: var(--border) var(--border-style) var(--border-color);
}
</style>
