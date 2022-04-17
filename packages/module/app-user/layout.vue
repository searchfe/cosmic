<script lang="ts" setup>
import { RouterView, useRoute } from '@cosmic/core/router';

const route = useRoute();
</script>

<template>
    <router-view :key="route.fullPath" />
</template>
