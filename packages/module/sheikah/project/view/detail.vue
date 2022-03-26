<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { router as vueRouter } from '@cosmic/core/browser';
import Region from '../../common/component/region.vue';
import FileCard from '../component/file-card.vue';
import DirCard from '../component/dir-card.vue';
import { useProjectStructure } from '../api';

const { useRoute } = vueRouter;

const id = useRoute().query.project;

const { data, fetching } = useProjectStructure(id as string);

const projects = ref<gql.ProjectPlus[]>([]);

watchEffect(() => {
    if (data.value && !fetching.value) {
        projects.value = data.value?.projectStructure;
    }
});

</script>

<template>
    <Region title="搜索通用组件" desc="修改时间" />
    <Region inverse>
        <div class="w-full" :class="$style['card-list']">
            <template v-for="project in projects" :key="project.id">
                <dir-card v-if="project.hasChildren" v-bind="project" />
                <file-card v-else v-bind="project" />
            </template>
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
</style>

