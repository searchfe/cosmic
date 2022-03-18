<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { router as vueRouter } from '@cosmic/core/browser';
import Info from '../../common/component/region.vue';
import AtomMicroCard from '../component/card/atom.vue';
import AtomFilter from '../component/filter.vue';
import { query as queryColor } from '../api/common';

const { useRouter } = vueRouter;
const router = useRouter();

const colors = ref<gql.Color[]>([]);

// let active = {
//     key: 'color',
//     text: '颜色',
// };

const { data, fetching } = queryColor<{ colors: gql.Color[] }, gql.QueryColorDTO>('color', {}, ['team', 'color']);
watchEffect(() => {
    if (data.value && !fetching.value) {
        colors.value = data.value.colors.map(color => {
            return {
                ...color,
                name: '原子名称',
                value: {
                    day: color.color,
                    dark: color.color,
                    night: color.color,
                },
                meta: '原子元信息',
            };
        });
    }
});

function onItemClick(id: string) {
    if (id) {
        router.push({ name: 'atom:detail', query: { id } });
    }
}

</script>

<template>
    <Info title="原子">
        <div
            class="flex items-center text-black w-full"
            :class="$style.filter"
        >
            <atom-filter text="颜色" num="12">
                <template #icon>
                    <i-cosmic-night />
                </template>
                <template #hover-icon>
                    <i-cosmic-dark />
                </template>
            </atom-filter>
            <atom-filter text="文字" num="12">
                <template #icon>
                    <i-cosmic-night />
                </template>
                <template #hover-icon>
                    <i-cosmic-dark />
                </template>
            </atom-filter>
            <atom-filter text="蒙层" num="12">
                <template #icon>
                    <i-cosmic-night />
                </template>
                <template #hover-icon>
                    <i-cosmic-dark />
                </template>
            </atom-filter>
            <atom-filter text="描边" num="12">
                <template #icon>
                    <i-cosmic-night />
                </template>
                <template #hover-icon>
                    <i-cosmic-dark />
                </template>
            </atom-filter>
            <atom-filter text="阴影" num="12">
                <template #icon>
                    <i-cosmic-night />
                </template>
                <template #hover-icon>
                    <i-cosmic-dark />
                </template>
            </atom-filter>
        </div>
    </Info>
    <div :class="$style['atom-grid']">
        <div v-for="color in colors" :key="color.id" @click="onItemClick(color.id)">
            <atom-micro-card :title="color.name" :value="color.value" :meta="color.meta" />
        </div>
    </div>
</template>

<style module>
.atom-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 24px;
    row-gap: 24px;
    margin-top: 12px;
    /* grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-22 xl:gap-26 2xl:gap-14 */
}
.filter {
    overflow-x: scroll;
}
.filter::-webkit-scrollbar {
    display: none; /* Chrome Safari */
}
</style>
