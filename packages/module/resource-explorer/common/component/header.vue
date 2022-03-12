<script lang="ts" setup>
    import { Layout } from 'cosmic-vue';

    const { Header } = Layout;
</script>

<template>
    <Header>
        <div class="header">
            <img
                class="logo"
                src="https://fe-dev.bj.bcebos.com/cosmic/%E6%97%A0%E6%9E%81LOGO.png"
                alt="logo"
            >
            <span>无极设计中台</span>
        </div>
    </Header>
</template>

<style module>
.header {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #1f1f1f;
}
.logo {
    width: 24px;
    height: 20px;
    margin-right: 7px;
}
</style>


