<script setup lang="ts">
import { onMounted, ref} from 'vue';
import { MenuService } from '@cosmic-module/frame-menu-bar';
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
  </div>
</template>
<style scoped>
.workbench {
    color: green;
}
</style>
