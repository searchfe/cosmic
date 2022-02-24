<script setup lang="ts">
import { onMounted, ref } from 'vue';

const content = ref('');

onMounted(() => {
     window.eventHub.subscribe('onTabChange', (e: { index: number, msg: string }) => {
         content.value = e.msg;
     });
});
</script>

<template>
  <div class="sworkbench">
    {{ content }}
  </div>
</template>
<style scoped>
.workbench {
    color: green;
}
</style>
