<script lang="ts" setup>
import { useRouter, useRoute } from '@cosmic/core/router';
import { watchEffect, ref, onBeforeMount } from 'vue';
import Region from '../../common/component/region.vue';
import DesignCard from '../../design/component/summary-card.vue';
import ProjectCard from '../../project/component/micro-card.vue';
import { useProjects, useDeleteProject } from '../../project/api';
import { service } from '@cosmic/core/browser';
import { inject } from '@cosmic/core/parts';


const userService = inject<service.UserService>(service.TOKENS.User);



// TODO 抽离一个容器组件，提供统一context，子组件不持有数据

const router = useRouter();
const { query = {} } = useRoute();

const { team } = query as { team: string; };

const projects = ref<gql.Project[]>([]);

const { data, fetching, executeQuery: refreshProjects } = useProjects({ team, parent: null });

const { executeMutation: deleteProject } = useDeleteProject();

onBeforeMount(() => {
    if (!userService.hasLogin()) {
        // TODO: redirect 逻辑需要重新设计
        userService.logout({ name: 'sheikah' });
    }
});

watchEffect(() => {
    if (team && data.value && !fetching.value) {
        projects.value = data.value?.projects;
    }
});

function onClickDesignCard(cardType: string) {
    if (cardType) {
        router.push({
            path: `/${cardType}/list`,
            query: { team: query.team },
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

const teamAssetsData = [{
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
    }, {
        header: 'https://fe-dev.bj.bcebos.com/design-card-header.png',
        type: 'component',
        title: '组件',
        imgs: [
            'https://fe-dev.bj.bcebos.com/dash%20%E9%A2%84%E5%88%B6%E7%BC%A9%E5%92%AF%E5%9B%BE1.png',
            'https://fe-dev.bj.bcebos.com/dash%20%E9%A2%84%E5%88%B6%E7%BC%A9%E5%92%AF%E5%9B%BE2.png',
            'https://fe-dev.bj.bcebos.com/dash%20%E9%A2%84%E5%88%B6%E7%BC%A9%E5%92%AF%E5%9B%BE3.png',
            'https://fe-dev.bj.bcebos.com/dash%20%E9%A2%84%E5%88%B6%E7%BC%A9%E5%92%AF%E5%9B%BE4.png',
        ],
        extra: '6个',
    }, {
        header: 'https://fe-dev.bj.bcebos.com/design-card-header.png',
        title: '预置',
        type: 'prefab',
        imgs: [
            'https://fe-dev.bj.bcebos.com/%E5%B7%A6.png',
            'https://fe-dev.bj.bcebos.com/%E4%B8%AD.png',
            'https://fe-dev.bj.bcebos.com/%E4%B8%AD2.png',
            'https://fe-dev.bj.bcebos.com/%E5%8F%B3.png',
        ],
        extra: '8个',
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
    row-gap: 24px;
}
.project-list {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 24px;
    row-gap: 24px;
}
@media (min-width: 960px) {
    .project-list {
        grid-template-columns: 1fr 1fr;
    }
    .design-list {
        grid-template-columns: 1fr 1fr;
    }
}
@media (min-width: 1080px) {
    .project-list {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    .design-list {
        grid-template-columns: 1fr 1fr 1fr;
    }
}
</style>
