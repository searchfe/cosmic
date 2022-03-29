<script lang="ts" setup>
import LayerTree from './layer-tree/index.vue';
import SearchBox from './search-box/index.vue';
</script>
<template>
    <div class="flex flex-col h-full">
        <search-box class="border-bottom" />
        <div class="h-full">
            <layer-tree />
        </div>
    </div>
</template>
