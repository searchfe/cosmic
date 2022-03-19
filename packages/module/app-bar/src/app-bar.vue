<script setup lang="ts">
import MenuList from './menu-list.vue';
import WorkbenchList from './workbench-list.vue';
</script>

<template>
    <div :class="[$style.root, 'flex justify-between items-center']">
        <menu-list class="mr-40" />
        <workbench-list />
    </div>
</template>
<style module>
.root {
    background-color: var(--color-gray-900);
    height: 2.6rem;
}
</style>
