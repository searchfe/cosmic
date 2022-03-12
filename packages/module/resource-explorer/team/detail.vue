<script lang="ts" setup>
    // import { query } from '@urql/vue';
    import Info from './component/info.vue';
    import DesignCard from '../design/component/micro-card.vue';
    import ProjectCard from '../project/component/micro-card.vue';
    // import { queryProjects } from '../../project/api';

    // export let params: Record<string, string> = {};
    // const store = queryProjects({ team: params.teamId });

    // query(store);

    const tempItem = {
        header: 'https://fe-dev.bj.bcebos.com/design-card-header.png',
        title: '视觉原子',
        infos: [
            { key: '引用', value: '36' },
            { key: '自荐', value: '2' },
        ],
        imgs: [
            'https://fe-dev.bj.bcebos.com/%E5%8D%A1%E7%89%87%E5%86%85%E7%BC%A9%E7%95%A5%E5%9B%BE%2001.png',
            'https://fe-dev.bj.bcebos.com/%E5%8D%A1%E7%89%87%E5%86%85%E7%BC%A9%E7%95%A5%E5%9B%BE%2002.png',
            'https://fe-dev.bj.bcebos.com/%E5%8D%A1%E7%89%87%E5%86%85%E7%BC%A9%E7%95%A5%E5%9B%BE%2003.png',
            'https://fe-dev.bj.bcebos.com/%E5%8D%A1%E7%89%87%E5%86%85%E7%BC%A9%E7%95%A5%E5%9B%BE%2004.png',
        ],
        extra: '38个',
    };
    const teamAssetsData = [
        tempItem,
        {
            ...tempItem,
            title: '组件预设',
        },
        {
            ...tempItem,
            title: '视觉原子',
        },
    ];
</script>

<template>
    <div>
        <Info title="百度搜索" />
        <div :class="$style['design-title']">
            设计资产
        </div>

        <div :class="$style['design-list']">
            <DesignCard
                v-for="item in teamAssetsData"
                v-bind="item"
                :key="item.title"
            />
        </div>
        <div :class="$style['project-title']">
            项目类别
        </div>
        <div :class="$style['project-list']">
            <ProjectCard />
        </div>
    </div>
</template>

<style module>
.design-title {
    font-size: 24px;
    margin-bottom: 30px;
}
.design-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 22px;
}
.project-title {
    margin-top: 40px;
    margin-bottom: 30px;
    font-size: 24px;
}
.project-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    /* grid grid-cols-2 gap-22 lg:grid-cols-3 xl:gap--26 2xl:grid-cols-4 2xl:gap-14 */
}
</style>
