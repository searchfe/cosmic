<script lang="ts" setup>
import {ref} from 'vue';
import { MTitle, MWidget, service } from '@cosmic/core/browser';
import Content from './widget/content.vue';
import { inject } from '@cosmic/core/parts';

 const nodeService = inject<service.NodeService>(service.TOKENS.Node);

const open = ref(nodeService.getSelection().some(item => item.type === 'TEXT'));

const boardSwitch = () => {
    open.value = !open.value;
};
 nodeService.selection.subscribe(selections => {
     open.value = selections.some(item => item.type === 'TEXT');
 });

</script>

<template>
    <MWidget>
        <div class="container w-full">
            <MTitle
                title="文字"
                :is-open="open"
                @on-click="boardSwitch"
            >
                <i-cosmic-arrow-down />
            </MTitle>
            <Content v-if="open" />
        </div>
    </MWidget>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
}
</style>

