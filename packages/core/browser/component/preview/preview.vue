<script lang="ts" setup>
import { inject, type PageNode } from '@cosmic/core/parts';
import { service } from '@cosmic/core/browser';
import { onMounted, ref, type Ref } from 'vue';
import { Button as CButton } from 'cosmic-vue';

const page: Ref<PageNode> = ref<PageNode>() as any;

const nodeService = inject<service.NodeService>(service.TOKENS.Node);
const draftService = inject<service.DraftService>(service.TOKENS.Draft);

nodeService.document.subscribe(document => {
    const pageNode = document.children[0];
    (pageNode.children || []).forEach(node => {
        node.x = 0;
        node.y = 0;
    });
    page.value = pageNode;
});
const sync = ref(true);

onMounted(() => {
    setInterval(() => {
        sync.value && draftService.open();
    }, 2000);
});

</script>

<template>
    <div
        class="relative"
        :style="{height: '85vh'}"
    >
        <children-render :children="page.children" />
    </div>
    <div
        class="fixed flex justify-center items-center "
        :style="{bottom: 0,left:0, textAlign: 'center'}"
    >
        <c-button
            class="w-150"
            @click="() => sync = !sync"
        >
            {{ sync ? '暂停实时同步' : '恢复实时同步' }}
        </c-button>
    </div>
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
:root {
    font-size: 10px;
}
html{
    height: 100%;
}
body {
    margin: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    overscroll-behavior-x: none;
}
/** wait for add */
:root {
    height: 100%;
    --border-style: solid;
    --border-color: var(--color-gray-100);
}

:root .cos-mode-reverse .-v-bg-inapparent
    { background-color: transparent; }
:root .cos-mode-reverse .-v-bg-inapparent.hover,
:root .cos-mode-reverse .-v-bg-inapparent:hover
    { background-color: rgba(255, 255, 255, .09); }
:root .cos-mode-reverse .-v-bg-inapparent.active,
:root .cos-mode-reverse .-v-bg-inapparent:active
    { background-color: rgba(255, 255, 255, .09); }
:root .cos-mode-reverse .-v-bg-inapparent.disabled,
:root .cos-mode-reverse .-v-bg-inapparent:disabled
    { background-color: transparent; }

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
