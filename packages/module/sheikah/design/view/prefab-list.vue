<script lang="ts" setup>
import { watchEffect, ref } from 'vue';
import { Input } from 'cosmic-vue';
import { router as vueRouter } from '@cosmic/core/browser';
import CompCard from '../component/card/comp.vue';
import CompFilter from '../component/filter.vue';
import Region from '../../common/component/region.vue';
import { query } from '../api/prefab';

const { useRouter } = vueRouter;

const router = useRouter();
const { data, fetching } = query({});
const prefabs = ref<Partial<gql.Prefab>[]>([]);

watchEffect(() => {
    if (data.value?.prefabs && !fetching.value) {
        prefabs.value = data.value.prefabs || [];
    }
});

function onClickComp(id?: string) {
    if (id) {
        router.push({ name: 'prefab:detail', query: { prefab: id } });
    }
}
</script>

<template>
    <Region title="预置">
        <div class="flex flex-start" :class="$style.filter">
            <comp-filter text="基础类" num="82">
                <template #icon>
                    <i-cosmic-scale />
                </template>
                <template #hover-icon>
                    <i-cosmic-scale style="color: white;" />
                </template>
            </comp-filter>
            <comp-filter text="布局类" num="13">
                <template #icon>
                    <i-cosmic-layout />
                </template>
                <template #hover-icon>
                    <i-cosmic-layout style="color: white;" />
                </template>
            </comp-filter>
            <comp-filter text="展示类" num="20">
                <template #icon>
                    <i-cosmic-contain />
                </template>
                <template #hover-icon>
                    <i-cosmic-contain style="color: white;" />
                </template>
            </comp-filter>
            <comp-filter text="输入类" num="8">
                <template #icon>
                    <i-cosmic-input />
                </template>
                <template #hover-icon>
                    <i-cosmic-input style="color: white;" />
                </template>
            </comp-filter>
            <comp-filter text="反馈类" num="12">
                <template #icon>
                    <i-cosmic-feedback />
                </template>
                <template #hover-icon>
                    <i-cosmic-feedback style="color: white;" />
                </template>
            </comp-filter>
        </div>
        <template #bottom>
            <div class="flex justify-between items-center">
                <Input placeholder="组件查询" :class="$style.input" />
            </div>
        </template>
        <template #rb-actions>
            <div :class="$style.add" class="flex justify-center items-center">
                <i-cosmic-plus class="text-md" />
            </div>
        </template>
    </Region>
    <Region inverse>
        <div :class="$style['card-list']">
            <comp-card v-for="prefab in prefabs" :key="prefab.id" v-bind="prefab" @click.stop="onClickComp(prefab.id)" />
        </div>
    </Region>
</template>
<style module>
.card-list {
    margin-top: 24px;
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 24px;
    row-gap: 24px;
}
.input {
    width: 268px;
    border: 1px solid #1f1f1f;
    border-radius: 4px;
    opacity: 0.3;
}
.add {
    height: 36px;
    width: 36px;
    border-radius: 4px;
    background: #f5f5f5;
}
@media (min-width: 960px) {
    .card-list {
        grid-template-columns: 1fr 1fr;
    }
}
@media (min-width: 1280px) {
    .card-list {
        grid-template-columns: 1fr 1fr 1fr;
    }
}
@media (min-width: 1920px) {
    .card-list {
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
