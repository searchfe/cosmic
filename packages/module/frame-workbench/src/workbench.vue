<script setup lang="ts">
import { onMounted, ref, defineAsyncComponent } from 'vue';
import { MenuService } from '@cosmic-module/app-bar';
import { inject } from '@cosmic/core/parts';

const content = ref('');
const selectedTabIndexRef = ref<number>();
const menuService = inject(MenuService);

const BluePrint = defineAsyncComponent(async () => {
    const mod = await import('@cosmic-module/blueprint');
    return mod.default.root;
});

onMounted(() => {
  menuService.change((index, data) => {
      content.value = data.title;
      selectedTabIndexRef.value = index;
  });
});
</script>

<template>
  <div class="sworkbench">
    {{ content }}
    <blue-print v-if="3 === selectedTabIndexRef" />
    <i-cosmic-align />
    <i-cosmic-board />
    <i-cosmic-canvas />
  </div>
</template>
<style scoped>
.workbench {
    color: green;
}
</style>
