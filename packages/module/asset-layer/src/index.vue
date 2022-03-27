<script lang="ts" setup>
import LayerTree from './layer-tree/index.vue';
import SearchBox from './search-box/index.vue';
</script>
<template>
    <div class="flex flex-col">
        <search-box class="border-bottom" />
        <layer-tree />
    </div>
</template>
