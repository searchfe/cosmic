<script lang="ts" setup>
import { service } from '@cosmic/core/browser';
import { inject } from '@cosmic/core/parts';
import { Button, Menu, MenuOption } from 'cosmic-vue';
import { ref } from 'vue';
import buttonMenu from './menu-button.module.css';

const nodeService = inject<service.NodeService>(service.TOKENS.Node);
const toolService = inject<service.ToolService>(service.TOKENS.Tool);
const draftService = inject<service.DraftService>(service.TOKENS.Draft);
const keyboardService = inject<service.KeyboardService>(service.TOKENS.Keyboard);

function handler(e) {
    switch(e.value) {
        case 'new-page':
            nodeService.addPage();
            break;
        case 'new-frame':
            toolService.set(service.ToolState.Frame);
            break;
        case 'new-text':
            toolService.set(service.ToolState.Text);
            break;
        case 'del':
            nodeService.deleteSelection();
            break;
        case 'save':
            draftService.save();
            break;
        case 'open':
            draftService.open();
            break;
    }
    if (e?.value?.match(/screen-([\d]+)/)) {
        nodeService.update(
            nodeService.getSelection().filter(node => node.type === 'FRAME').map((node: any) => {
                node.width = parseInt(RegExp.$1);
                return node;
            }),
        );
    }
}
const appendMenu = ref();
keyboardService.keydown('D').subscribe((event) => {
    if (event.target !== document.body) return;
    nodeService.deleteSelection();
});
keyboardService.keydown('A').subscribe((event) => {
    if (event.target !== document.body) return;
    appendMenu.value.$el.click();
});
</script>
<template>
    <div class="flex justify-start ml-6">
        <Button class="square" :styles="buttonMenu" size="xs">
            <i-cosmic-play />
        </Button>
        <Menu size="xs" value="2" :class="$style.menu" @on-change="handler">
            <template #activator>
                <Button class="min-w-40 mx-1" :styles="buttonMenu" size="xs">文件</Button>
            </template>
            <MenuOption
                v-for="data of [
                    {id: 'save', label: '保存&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;S'},
                    {id: 'new', label: '新建&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;N'},
                    {id: 'open', label: '打开&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;O'},
                ]"
                :key="data.id"
                :value="data.id"
                :label="data.label"
                :has-check="false"
            />
        </Menu>
        <Menu size="xs" value="2" :class="$style.menu" @on-change="handler">
            <template #activator>
                <Button class="min-w-40 mx-1" :styles="buttonMenu" size="xs">编辑</Button>
            </template>
            <MenuOption
                v-for="data of [{id: 'del', label: '删除&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;D'}]"
                :key="data.id"
                :value="data.id"
                :label="data.label"
                :has-check="false"
            />
        </Menu>
        <Menu size="xs" value="2" :class="$style.menu" @on-change="handler">
            <template #activator>
                <Button ref="appendMenu" class="min-w-40 mx-1" :styles="buttonMenu" size="xs">置入</Button>
            </template>
            <MenuOption
                v-for="data of [
                    {id: 'new-page', label: '页面&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;P'},
                    {id: 'new-frame', label: '画框&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;F'},
                    {id: 'new-text', label: '文本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;T'},
                ]"
                :key="data.id"
                :value="data.id"
                :label="data.label"
                :has-check="false"
            />
        </Menu>
        <Menu size="xs" value="2" :class="$style.menu" @on-change="handler">
            <template #activator>
                <Button class="min-w-40 mx-1" :styles="buttonMenu" size="xs">图层</Button>
            </template>
            <MenuOption
                v-for="data of [
                    {id: 'screen-360', label: '断点&nbsp;&nbsp;360'},
                    {id: 'screen-480', label: '断点&nbsp;&nbsp;480'},
                    {id: 'screen-640', label: '断点&nbsp;&nbsp;640'},
                    {id: 'screen-960', label: '断点&nbsp;&nbsp;960'},
                    {id: 'screen-1280', label: '断点&nbsp;&nbsp;1280'},
                ]"
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
.menu ul{
    min-width: 8rem !important;
}
.menu li {
    padding-left: 1rem !important;
}
.menu li:hover{
    background: var(--color-gray-300);
}
.menu li:active, .menu li:global(.active){
    background: var(--color-gray-400);
}
</style>
