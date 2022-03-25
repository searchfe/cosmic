<script lang="ts" setup>
import { Tree as RTree } from 'cosmic-vue';
import { router as vueRouter } from '@cosmic/core/browser';
import { treeSecondary } from 'cosmic-ui';


const { useRouter } = vueRouter;

const router = useRouter();

interface ProjectNode {
    label: string;
    id: string;
    children: ProjectNode[];
    parent?: string;
}

interface ProjectOptions {
    data: ProjectNode;
    team: string;
}

const designTree = [{
    id: '',
    label: '设计资产',
    children: [{
        id: 'atom',
        label: '原子',
    }, {
        id: 'component',
        label: '组件',
    }],
}];

const props = withDefaults(defineProps<ProjectOptions>(), {
    team: '',
    data: () => {
        return {
            label: '',
            id: '',
            parent: '',
            children: [],
        };
    },
});

const emits = defineEmits(['add-project']);

function onToggleProject (data: { id: string}) {
    const { id: project } = data;
    if (project) {
        router.push({ name: 'project:detail', query: { project } });
    }
}

function onToggleDesignTree(data: { id: string }) {
    const { id: designType } = data;
    if (designType) {
        router.push({ name: `${designType}:list`, query: { team: props.team } });
    }
}

function onAddProject(data: { id: string }) {
    emits('add-project', { parent: data.id || undefined, team: props.team });
}

</script>

<template>
    <div class="mx-10">
        <r-tree size="sm" :styles="treeSecondary" :data="designTree" @toggle="onToggleDesignTree" />
        <r-tree size="sm" :styles="treeSecondary" :data="[data]" @toggle="onToggleProject" @click-extra="onAddProject" />
    </div>
</template>

<style module>
</style>
