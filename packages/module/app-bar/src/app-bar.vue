<script setup lang="ts">
import MenuList from './menu-list.vue';
import WorkbenchList from './workbench-list.vue';
</script>

<template>
    <div :class="[$style.root, 'h-26 flex justify-between items-center cos-mode-reverse']">
        <menu-list class="mr-40" />
        <workbench-list />
    </div>
</template>
<style module>
.root {
    background-color: var(--color-gray-200);
}
</style>
