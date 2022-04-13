<script lang="ts" setup>
import SearchBox from './search-box/index.vue';
import LayerTree from './layer-tree/index.vue';
import PageTree from './page-tree/index.vue';
</script>
<template>
    <div class="flex flex-col h-full">
        <search-box class="border-bottom" />
        <page-tree />
        <div class="h-full">
            <layer-tree />
        </div>
    </div>
</template>
