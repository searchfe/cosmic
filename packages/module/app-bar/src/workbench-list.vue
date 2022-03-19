<script lang="ts" setup>
import { inject } from '@cosmic/core/parts';
import { service } from '@cosmic/core/browser';
import { Button } from 'cosmic-vue';
import ButtonStyle from './button.module.css';

const routerService = inject(service.RouterService);

function onButtonClicked(name: string) {
    routerService.push({name});
}
</script>
<template>
    <div :class="[$style.root, 'flex justify-start']">
        <Button size="xs" :styles="ButtonStyle" @click="onButtonClicked('sheikah')">资产管理</Button>
        <Button size="xs" :styles="ButtonStyle" @click="onButtonClicked('workbench')">设计工具</Button>
        <Button size="xs" :styles="ButtonStyle" @click="onButtonClicked('blueprint')">蓝图</Button>
        <Button size="xs" :styles="ButtonStyle">Story</Button>
    </div>
</template>
<style module>
.root {
    background-color: var(--color-gray-900);
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
