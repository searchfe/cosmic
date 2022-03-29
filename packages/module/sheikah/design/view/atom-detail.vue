<script lang="ts" setup>
import { watchEffect, ref } from 'vue';
import Region from '../../common/component/region.vue';
import ColorPreview from '../component/preview/color.vue';
import CompCard from '../component/card/comp.vue';
import { router as vueRouter } from '@cosmic/core/browser';
import { queryOne } from '../api/color';
import ColorDialog from '../component/dialog/atom/color.vue';


const route = vueRouter.useRoute();

const { type: atomType, id } = route.query as { id: string, type: string };

const color = ref<Partial<gql.Color>>({});

const { data, fetching, executeQuery } = queryOne(id);

watchEffect(() => {
    if (atomType === 'color' && id && data.value?.getColor && !fetching.value) {
        color.value = data.value.getColor || {};
    }
});

function refresh() {
    executeQuery({ requestPolicy: 'network-only' });
}

</script>
<template>
    <Region :title="color.name">
        <color-preview v-if="atomType === 'color'" v-bind="color" />
        <template #extra>
            <div class="flex justify-end">
                <color-dialog v-if="atomType === 'color'" :atom-type="atomType" v-bind="color" @success="refresh" />
            </div>
        </template>
    </Region>
    <Region title=" 组件数量 4" inverse>
        <div :class="$style['comp-list']">
            <comp-card v-for="item in [1, 2, 3, 4]" :key="item" />
        </div>
    </Region>
</template>


<style module>
.comp-list {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 24px;
    column-gap: 24px;
}
@media (min-width: 960px) {
    .comp-list {
        grid-template-columns: 1fr 1fr;
    }
}
@media (min-width: 1280px) {
    .comp-list {
        grid-template-columns: 1fr 1fr 1fr;
    }
}
@media (min-width: 1920px) {
    .comp-list {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
}
.filter {
    overflow-x: scroll;
}
.filter::-webkit-scrollbar {
    display: none; /* Chrome Safari */
}
</style>
