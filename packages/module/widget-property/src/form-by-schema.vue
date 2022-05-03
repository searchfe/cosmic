<script lang="ts" setup>
import { MWidget } from '@cosmic/core/browser';
import FormNode from './field/form-node.vue';
import type { SchemaType } from './type/index';

withDefaults(defineProps<{
     schema: SchemaType,
     model: Record<string, any>
}>(), {});

</script>
<template>
    <div :class="$style.container">
        <m-widget>
            <form-node
                :schema="schema"
                :model="model"
                :layer="1"
            />
        </m-widget>
    </div>
</template>

<style module>
.container {
    display: block;
    overflow-y: auto;
    max-height: calc(100vh - 100px);
}
</style>