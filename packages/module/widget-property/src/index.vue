<script lang="ts" setup>
import { ref } from 'vue';
import { BaseNodeMixin, SceneNode, getRenderSchemaAndModel } from '@cosmic/core/parts';
import FormBySchema from './form-by-schema.vue';
// import { schema as DataShema, mock as DataModel } from './data';
import { service, inject } from '@cosmic/core/browser';
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
        node.setPluginData('isPropertyUpdate', false);
        isSelected.value = true;
        const { model: currentModel, originSchema } = node.getPluginData('wise');
        // 重新获取需要渲染的数据
        const { schema, model } = getRenderSchemaAndModel(currentModel, originSchema);
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

// function test() {

//     const uiSchema = transformUiShema(nodeService.getCurrentPage(), 'wise');
//     console.log(uiSchema);

//     fetch('http://172.24.132.16:8849/api/card/getMirror?user=maxuelong', {
//         method: 'POST',
//         mode: 'cors',
//         headers: {
//             'Content-Type': 'application/json'
//             // 'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: JSON.stringify({
//             pcUiSchema: uiSchema,
//             wiseUiSchema: uiSchema
//         })
//     }).then(res => {
//         console.log(res);
//     });
// }


</script>

<template>
    <!-- <button @click="test">测试接口</button> -->
    <form-by-schema v-if="isSelected" :index="isUpdate" :schema="renderSchema" :model="renderModel" />
</template>