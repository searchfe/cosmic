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
    children: [
        {
            id: 'atom',
            label: '原子',
        },
        {
            id: 'component',
            label: '组件',
        },
        {
            id: 'prefab',
            label: '预置',
        },
    ],
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

function onToggleProject(data: { id: string }) {
    const { id: project } = data;
    if (project) {
        router.push({ name: 'project:detail', query: { project, team: props.team } });
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
        <r-tree
            size="sm"
            :indent="10"
            :styles="treeSecondary"
            :data="designTree"
            @click-node="onToggleDesignTree"
        >
            <template #arrow="slotProps">
                <i-cosmic-atom v-if="slotProps.nodeData.children" class="text-md inline-block mt-2 mr-6" />
            </template>
        </r-tree>
        <r-tree
            size="sm"
            :indent="25"
            :styles="treeSecondary"
            :data="[data]"
            @click-node="onToggleProject"
            @click-subfix="onAddProject"
        >
            <template #arrow="slotProps">
                <i-cosmic-category v-if="slotProps.nodeData.label === '项目类别'" class="text-md inline-block mt-2 mr-6" />
                <i-cosmic-dir v-else class="text-md inline-block mt-2 mr-6" />
            </template>
            <template #subfix>
                <i-cosmic-plus />
            </template>
        </r-tree>
    </div>
</template>

<style module>
</style>
