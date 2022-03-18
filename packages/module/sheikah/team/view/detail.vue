<script lang="ts" setup>
import { router as vueRouter } from '@cosmic/core/browser';
import { watchEffect, ref } from 'vue';
import Info from '../../common/component/region.vue';
import DesignCard from '../../design/component/summary-card.vue';
import ProjectCard from '../../project/component/micro-card.vue';
import RegionTitle from '../../common/component/title-region.vue';

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
            name: `${cardType}:list`,
            query: { project: query.project },
        });
    }
}

function onClickProjectCard(id: string) {
    if (id) {
        router.push({
            name: 'project:detail',
            query: { project: id },
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
    <div>
        <Info title="百度搜索" />
        <region-title title="设计资产" />
        <div :class="$style['design-list']">
            <design-card
                v-for="item in teamAssetsData"
                v-bind="item"
                :key="item.title"
                @click="onClickDesignCard(item.type)"
            />
        </div>
        <region-title title="项目类别" />
        <div :class="$style['project-list']">
            <project-card v-for="pro in projects" :key="pro.id" :name="pro.name" @click="onClickProjectCard(pro.id)" />
        </div>
    </div>
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
