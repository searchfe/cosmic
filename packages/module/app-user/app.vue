<script lang="ts" setup>
import { getCurrentInstance, onBeforeMount } from 'vue';
import { routify } from './routes';
import Layout from './layout.vue';


// register router
onBeforeMount(() => {
    getCurrentInstance()?.appContext.app.use(routify());
});

</script>

<template>
    <Layout />
</template>
