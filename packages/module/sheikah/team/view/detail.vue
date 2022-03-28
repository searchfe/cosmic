<script lang="ts" setup>
import { router as vueRouter } from '@cosmic/core/browser';
import { watchEffect, ref } from 'vue';
import Region from '../../common/component/region.vue';
import DesignCard from '../../design/component/summary-card.vue';
import ProjectCard from '../../project/component/micro-card.vue';
import { useProjects, useDeleteProject } from '../../project/api';


// TODO 抽离一个容器组件，提供统一context，子组件不持有数据

const { useRouter, useRoute } = vueRouter;
const router = useRouter();
const { query = {} } = useRoute();

const { team, project } = query as { team: string; project: string };

const projects = ref<gql.Project[]>([]);

const { data, fetching, executeQuery: refreshProjects } = useProjects({ team, parent: project});

const { executeMutation: deleteProject } = useDeleteProject();

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

function onDeleteProject(data: { id: string }) {
    const { id } = data;
    deleteProject({ id }).then(() => {
        refreshProjects({
          requestPolicy: 'network-only',
        });
    });
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
            <project-card v-for="pro in projects" :key="pro.id" v-bind="pro" @delete="onDeleteProject" />
        </div>
    </Region>
</template>

<style module>
.design-list {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 24px;
}
.project-list {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 24px;
    row-gap: 24px;
}
@media (min-width: 960px) {
    .project-list {
        grid-template-columns: 1fr;
    }
    .design-list {
        grid-template-columns: 1fr 1fr;
    }
}
@media (min-width: 1280px) {
    .project-list {
        grid-template-columns: 1fr 1fr 1fr;
    }
    .design-list {
        grid-template-columns: 1fr 1fr 1fr;
    }
}
@media (min-width: 1920px) {
    .project-list {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    .design-list {
        grid-template-columns: 1fr 1fr 1fr;
    }
}
</style>
