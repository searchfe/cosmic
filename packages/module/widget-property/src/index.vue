<script lang="ts" setup>
import { ref } from 'vue';
import { getRenderSchemaAndModel } from '@cosmic/core/parts';
import FormBySchema from './form-by-schema.vue';
import { schema, mock } from './data';

const {schema: resetSchema, model: resetModel} = getRenderSchemaAndModel(schema, mock);

const renderSchema = ref(resetSchema);
const renderModel = ref(resetModel);

// function update() {
//     const {schema: updateSchema, model: updateModel } = getRenderSchemaAndModel(schema, renderModel.value);
//     renderModel.value = updateModel;
//     renderSchema.value = updateSchema;
// }

// provide('update', update);

</script>

<template>
    <form-by-schema :index="isUpdate" :schema="renderSchema" :model="renderModel" />
</template>