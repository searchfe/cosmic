<script setup lang="ts">
import { inject } from '@cosmic/core/parts';
import { Button } from 'cosmic-vue';
import MenuService from './menu.service';

const service = inject(MenuService);

function onButtonClicked(index: number, title: string) {
  service.selectTab(index, { title });
}
</script>

<template>
  <div class="menu-container">
    <i-cosmic-circles />
    <Button
      class="menu-button"
      c-style="./component/button/button.module.css"
      @click="onButtonClicked(1, '文件')"
    >
      资产管理
    </Button>
    <Button
      class="menu-button"
      c-style="./component/button/button.module.css"
      @click="onButtonClicked(2, '编辑')"
    >
      设计工具
    </Button>
  </div>
</template>
<style scoped>
.menu-container {
    display: flex;
    justify-content: center;
    height: 100%;
}
</style>
