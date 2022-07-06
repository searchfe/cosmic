<script lang="ts" setup>
import { ref } from 'vue';
import { BaseNodeMixin, getRenderSchemaAndModel, ComponentNode } from '@cosmic/core/parts';
import FormBySchema from './form-by-schema.vue';
// import { schema as DataShema, mock as DataModel } from './data';
import { service, inject } from '@cosmic/core/browser';
import { type Subject } from '@cosmic/core/rxjs';

const nodeService = inject<service.NodeService>(service.TOKENS.Node);
const componentService = inject<service.ComponentService>(service.TOKENS.Component);

const renderSchema = ref();
const renderModel = ref();

let subject: Subject<BaseNodeMixin>;

let node: ComponentNode;
const isSelected = ref(false);

nodeService.selection.subscribe(nodes => {
    isSelected.value = false;
    if (nodes.length === 0) return;
    if(!(nodes[0] instanceof ComponentNode)) return;
    node = nodes[0];
    nodeService.unwatch(subject);
    subject = nodeService.watch(node);
    subject.subscribe(() => {
        isSelected.value = true;
        const originSchema = componentService.getSchema(node);
        // 重新获取需要渲染的数据
        const { schema, model } = getRenderSchemaAndModel(originSchema, {...renderModel.value});
        renderSchema.value = schema;
        renderModel.value = model;
    });
    const currentModel =  componentService.getData(node);
    const originSchema = componentService.getSchema(node);
    const { schema, model } = getRenderSchemaAndModel(originSchema, currentModel);
    isSelected.value = true;
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
    <form-by-schema
        v-if="isSelected"
        :index="isUpdate"
        :schema="renderSchema"
        :model="renderModel"
    />
</template>
