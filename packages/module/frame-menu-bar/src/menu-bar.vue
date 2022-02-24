<script setup lang="ts">
import { Button } from 'cosmic-vue';

function onButtonClicked(index: number, msg: string) {
    window.eventHub.publish('onTabChange', { index, msg });
}
</script>

<template>
  <div class="menu-container">
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
