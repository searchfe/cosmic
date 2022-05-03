<script lang="ts" setup>
import { ref } from 'vue';
import { Input as CInput } from 'cosmic-vue';
import Collapse from './component/collapse.vue';
import { mock } from './component/data';

const collapseIndex = ref<number>();

function collapseChange(event:boolean, index: number) {
    collapseIndex.value = event ? index : -1;
}

</script>

<template>
    <div class="p-4 border-bottom">
        <c-input
            placeholder="搜索"
        >
            <template #prefix>
                <i-cosmic-search />
            </template>
        </c-input>
    </div>
    <div class="mb-12">
        <collapse 
            v-for="(item, index) of mock"
            :key="item.title"
            :title="item.title"
            :is-open="collapseIndex === index"
            @change="(event) => collapseChange(event, index)"
        >
            <div :class="$style.grid">
                <div 
                    v-for="child of item.children"
                    :key="child.name"
                    :class="$style['grid-item']"
                >
                    <img class="w-50" :src="child.poster">
                </div>
            </div>
        </collapse>
    </div>
</template>

<style module>
.grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: .8rem;
    grid-row-gap: .8rem;
}

.grid-item {
    composes: h-120 flex items-center justify-center from global;
    background-color: var(--color-gray-50);
    border-radius: .8rem;
    
}
</style>