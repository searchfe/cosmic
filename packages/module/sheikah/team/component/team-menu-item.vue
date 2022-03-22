<script lang="ts" setup>
import { Tree as RTree } from 'cosmic-vue';
import { router as vueRouter } from '@cosmic/core/browser';


const { useRouter } = vueRouter;

const router = useRouter();

interface ProjectNode {
    title: string;
    key: string;
    children: ProjectNode[];
    parent?: string;
}

interface ProjectOptions {
    data: ProjectNode;
    team: string;
}

const designTree = [{
    key: '',
    title: '设计资产',
    children: [{
        key: 'atom',
        title: '原子',
    }, {
        key: 'component',
        title: '组件',
    }],
}];

const props = withDefaults(defineProps<ProjectOptions>(), {
    team: '',
    data: () => {
        return {
            title: '',
            key: '',
            parent: '',
            children: [],
        };
    },
});

const emits = defineEmits(['add-project']);

function onToggleProject (data: { key: string}) {
    const { key: project } = data;
    if (project) {
        router.push({ name: 'project:detail', query: { project } });
    }
}

function onToggleDesignTree(data: { key: string }) {
    const { key: designType } = data;
    if (designType) {
        router.push({ name: `${designType}:list`, query: { team: props.team } });
    }
}

function onAddProject(data: { key: string }) {
    emits('add-project', { parent: data.key || undefined, team: props.team });
}

</script>

<template>
    <r-tree :data="designTree" @toggle="onToggleDesignTree" />
    <r-tree :data="[data]" @toggle="onToggleProject" @click-extra="onAddProject" />
</template>

<style module>
</style>
