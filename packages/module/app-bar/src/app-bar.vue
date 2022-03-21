<script setup lang="ts">
import MenuBar from './menu-bar.vue';
import WorkbenchBar from './workbench-bar.vue';
</script>

<template>
    <div :class="[$style.root, 'h-26 flex justify-between items-center cos-mode-reverse']">
        <menu-bar class="mr-40" />
        <workbench-bar />
    </div>
</template>
<style module>
.root {
    background-color: var(--color-gray-200);
}
</style>
