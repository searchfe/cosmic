<script lang="ts" setup>
import { Layout } from 'cosmic-vue';
import { RouterView } from 'vue-router';


const { Content, Header } = Layout;

</script>

<template>
    <Layout style="height: 100vh">
        <Header>
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
@import 'cosmic-ui/ui.css';
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
