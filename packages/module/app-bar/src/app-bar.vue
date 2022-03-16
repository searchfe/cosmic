<script setup lang="ts">
import { Button } from 'cosmic-vue';
import ButtonStyle from './component/button/button.module.css';
import { router } from '@cosmic/core/browser';


const r = router.useRouter();

function onButtonClicked(name: string) {
    r.push({ name });
}
</script>

<template>
    <div class="container">
        <i-cosmic-circles class="logo" />
        <Button
            class="menu-button"
            :styles="ButtonStyle"
            @click="onButtonClicked('sheikah')"
        >
            资产管理
        </Button>
        <Button
            class="menu-button"
            :styles="ButtonStyle"
            @click="onButtonClicked('workbench')"
        >
            设计工具
        </Button>
        <Button
            class="menu-button"
            :styles="ButtonStyle"
            @click="onButtonClicked('blueprint')"
        >
            Blueprint
        </Button>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: left;
    height: 30px;
    background-color: #232323;
    align-items: center;
}
.logo {
  color: #D8D8D8;
  font-size: 1.5rem;
  margin-left: 0.5rem;
  border-radius: 0.4rem;
}
.logo:hover {
    background: #424242;
}
</style>
