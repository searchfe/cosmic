<script lang="ts" setup>
import { MWidget } from '@cosmic/core/browser';
import FormNode from './field/form-node.vue';

withDefaults(defineProps<{
     schema: SchemaType,
     model: Record<string, any>
}>(), {});

</script>
<template>
    <m-widget>
        <form-node
            :schema="schema"
            :model="model"
            :layer="1"
        />
    </m-widget>
</template>