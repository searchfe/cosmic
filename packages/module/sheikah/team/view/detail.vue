<script lang="ts" setup>
import { router as vueRouter } from '@cosmic/core/browser';
import { watchEffect, ref } from 'vue';
import Region from '../../common/component/region.vue';
import DesignCard from '../../design/component/summary-card.vue';
import ProjectCard from '../../project/component/micro-card.vue';

import { useProjects } from '../../project/api';

const { useRouter, useRoute } = vueRouter;
const router = useRouter();
const { query = {} } = useRoute();

const { team, project } = query as { team: string; project: string };

const projects = ref<gql.Project[]>([]);

const { data, fetching } = useProjects({ team, parent: project});

watchEffect(() => {
    if (data.value && !fetching.value) {
        projects.value = data.value?.projects;
    }
});

function onClickDesignCard(cardType: string) {
    if (cardType) {
        router.push({
            path: `/${cardType}/list`,
            query: { project: query.project },
        });
    }
}

const tempItem = {
    header: 'https://fe-dev.bj.bcebos.com/design-card-header.png',
    title: '原子',
    type: 'atom',
    imgs: [
        'https://fe-dev.bj.bcebos.com/%E5%B7%A6.png',
        'https://fe-dev.bj.bcebos.com/%E4%B8%AD.png',
        'https://fe-dev.bj.bcebos.com/%E4%B8%AD2.png',
        'https://fe-dev.bj.bcebos.com/%E5%8F%B3.png',
    ],
    extra: '38个',
};
const teamAssetsData = [
    tempItem,
    {
        ...tempItem,
        title: '组件',
        type: 'component',
    },
];
</script>

<template>
    <Region title="百度搜索" :level="1" />
    <Region title="设计资产" inverse>
        <div :class="$style['design-list']">
            <design-card
                v-for="item in teamAssetsData"
                v-bind="item"
                :key="item.title"
                @click="onClickDesignCard(item.type)"
            />
        </div>
    </Region>

    <Region title="项目类别" inverse>
        <div :class="$style['project-list']">
            <project-card v-for="pro in projects" :key="pro.id" v-bind="pro" />
        </div>
    </Region>
</template>

<style module>
.design-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 24px;
}
.project-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 24px;
    row-gap: 24px;
    /* grid grid-cols-2 gap-22 lg:grid-cols-3 xl:gap--26 2xl:grid-cols-4 2xl:gap-14 */
}
</style>
