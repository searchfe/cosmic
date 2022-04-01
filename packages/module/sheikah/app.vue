<script lang="ts" setup>
import { onBeforeMount, getCurrentInstance } from 'vue';
import { routify } from './routes';
import SheikahLayout from './layout/layout.vue';

// register router
onBeforeMount(() => {
    getCurrentInstance()?.appContext.app.use(routify());
});

</script>

<template>
    <sheikah-layout />
</template>
