<script lang="ts" setup>
import { Layout } from 'cosmic-vue';


const { Content, Footer, Header } = Layout;

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
        <!-- <m-component
            src="@cosmic-module/resource-explorer"
            class="w-full h-full"
        /> -->
        </Content>
        <Footer>
            this is the footer
        </Footer>
    </Layout>
</template>

<style>
@import 'cosmic-ui/ui.css';
/* * {
    margin: 0;
    padding: 0;
    font-size: 12px;
} */
:root {
    font-size: 10px;
}
body {
    margin: 0;
}
.w-full {
    width: 100%;
}
.h-full {
    height: 100%;
}
</style>
