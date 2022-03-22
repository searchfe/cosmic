<script lang="ts" setup>
import { ref, watchEffect, watch } from 'vue';
import { router as vueRouter } from '@cosmic/core/browser';
import Region from '../../common/component/region.vue';
import FileCard from '../component/file-card.vue';
import DirCard from '../component/dir-card.vue';
import { useProjectStructure } from '../api';

const { useRoute, useRouter } = vueRouter;

const router = useRouter();

// const query = useRoute().query;

const id = useRoute().query.project;

const { data, fetching } = useProjectStructure(id as string);

const projects = ref<gql.ProjectPlus[]>([]);

watch(() => router, () => {
    // const newId = router.currentRoute.value.query.project;
    // console.log(newId, '2222')
    // executeQuery({})
});

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
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 24px;
    row-gap: 24px;
}
</style>

