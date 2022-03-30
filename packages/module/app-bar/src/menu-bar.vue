<script lang="ts" setup>
import { service } from '@cosmic/core/browser';
import { inject } from '@cosmic/core/parts';
import { Button, Menu, MenuOption } from 'cosmic-vue';
import buttonMenu from './menu-button.module.css';

const nodeService = inject<service.NodeService>(service.TOKENS.Node);

function handler(e) {
    switch(e.value) {
        case 'new-page':
            nodeService.addPage();
            break;
        case 'new-frame':
            nodeService.addFrame();
            break;
        case 'del':
            nodeService.deleteSelection();
            break;
    }
}
</script>
<template>
    <div class="flex justify-start ml-6">
        <Button class="square" :styles="buttonMenu" size="xs">
            <i-cosmic-play />
        </Button>
        <Button class="min-w-40 mx-1" :styles="buttonMenu" size="xs">文件</Button>
        <Menu size="xs" value="2" :class="$style.menu" @on-change="handler">
            <template #activator>
                <Button class="min-w-40 mx-1" :styles="buttonMenu" size="xs">编辑</Button>
            </template>
            <MenuOption
                v-for="data of [{id: 'del', label: '删除'}]"
                :key="data.id"
                :value="data.id"
                :label="data.label"
                :has-check="false"
            />
        </Menu>
        <Menu size="xs" value="2" :class="$style.menu" @on-change="handler">
            <template #activator>
                <Button class="min-w-40 mx-1" :styles="buttonMenu" size="xs">置入</Button>
            </template>
            <MenuOption
                v-for="data of [{id: 'new-page', label: '页面'}, {id: 'new-frame', label: '画框'}]"
                :key="data.id"
                :value="data.id"
                :label="data.label"
                :has-check="false"
            />
        </Menu>
        <Button class="min-w-40 mx-1" :styles="buttonMenu" size="xs">帮助</Button>
        <!-- <Button>文件</Button>
        <Button>编辑</Button>
        <Button>帮助</Button>-->
    </div>
</template>
<style module>
.menu ul, .menu li{
    background: var(--color-gray-200);
    color: var(--color-dark);
    font-size: 1.2rem;
}
.menu li:hover{
    background: var(--color-gray-300);
}
.menu li:active, .menu li:global(.active){
    background: var(--color-gray-400);
}
</style>
