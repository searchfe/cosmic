<script lang="ts" setup>
import { Layout } from 'cosmic-vue';
import { RouterView } from 'vue-router';

const { Content, Header } = Layout;

</script>

<template>
    <Layout style="height: 100vh">
        <Header style="height: 2.6rem;">
            <m-component
                src="@cosmic-module/app-bar"
                class="w-full"
            />
        </Header>
        <Content>
            <router-view />
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
}
:root {
    font-size: 10px;
}
body {
    margin: 0;
}
</style>
