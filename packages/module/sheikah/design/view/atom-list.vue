<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { router as vueRouter } from '@cosmic/core/browser';
import Info from '../../common/component/info.vue';
import AtomMicroCard from '../component/atom/micro-card.vue';
import Filter from '../component/atom/filter/index.vue';
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
        <Filter style="margin: 20px 0" />
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
    column-gap: 28px;
    row-gap: 20px;
    /* grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-22 xl:gap-26 2xl:gap-14 */
}
</style>
