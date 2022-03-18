<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { router as vueRouter } from '@cosmic/core/browser';
import ProjectInfo from '../../common/component/region.vue';
// import FileCard from '../component/file-card.vue';
import DirCard from '../component/dir-card.vue';
import { useProjects } from '../api';

const { useRoute } = vueRouter;

const projects = ref<gql.Project[]>([]);
const { query } = useRoute();
const { data, fetching } = useProjects({ parent: query.project as string });

watchEffect(() => {
    if (data.value && !fetching.value) {
        projects.value = data.value?.projects;
    }
});

</script>

<template>
    <project-info title="搜索通用组件" desc="修改时间" />
    <div class="w-full" :class="$style['card-list']">
        <dir-card v-for="project in projects" v-bind="project" :key="project.id" />
        <!-- <FileCard /> -->
    </div>
</template>

<style module>
.card-list {
    margin-top: 24px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 24px;
    row-gap: 24px;
}
</style>

