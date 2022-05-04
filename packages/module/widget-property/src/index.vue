<script lang="ts" setup>
import { ref } from 'vue';
import { BaseNodeMixin, SceneNode } from '@cosmic/core/parts';
import FormBySchema from './form-by-schema.vue';
// import { schema as DataShema, mock as DataModel } from './data';
import { service } from '@cosmic/core/browser';
import { inject } from '@cosmic/core/parts';
import { type Subject } from '@cosmic/core/rxjs';

const nodeService = inject<service.NodeService>(service.TOKENS.Node);

const renderSchema = ref();
const renderModel = ref();

let subject: Subject<BaseNodeMixin>;

let node: SceneNode;
const isSelected = ref(false);

nodeService.selection.subscribe(nodes => {
    isSelected.value = false;
    if (nodes.length === 0) return;
    node = nodes[0] as SceneNode;
    nodeService.unwatch(subject);
    subject = nodeService.watch(node);
    subject.subscribe(() => {
        const isPropertyUpdate = node.getPluginData('isPropertyUpdate');
        if (!isPropertyUpdate) return;
        isSelected.value = true;
        const { schema, model } = node.getPluginData('wise');
        renderSchema.value = schema;
        renderModel.value = model;
    });
    const wise = node.getPluginData('wise');
    if (!wise) return;
    isSelected.value = true;
    const { schema, model } = wise;
    renderSchema.value = schema;
    renderModel.value = model;
});



</script>

<template>
    <form-by-schema v-if="isSelected" :index="isUpdate" :schema="renderSchema" :model="renderModel" />
</template>