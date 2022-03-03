<script setup lang="ts">
import { onMounted, ref} from 'vue';
import { MenuService } from '@cosmic-module/app-bar';
import { inject } from '@cosmic/core/parts';

const content = ref('');
const menuService = inject(MenuService);


onMounted(() => {
  menuService.change((index, data) => {
    content.value = data.title;
  });
});
</script>

<template>
  <div class="sworkbench">
    {{ content }}
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
