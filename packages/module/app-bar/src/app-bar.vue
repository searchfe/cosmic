<script setup lang="ts">
import { inject } from '@cosmic/core/parts';
import { Button } from 'cosmic-vue';
import MenuService from './menu.service';
import ButtonStyle from './component/button/button.module.css';

const service = inject(MenuService);

function onButtonClicked(index: number, title: string) {
  service.selectTab(index, { title });
}
</script>

<template>
  <div class="container">
    <i-cosmic-circles class="logo" />
    <Button
      class="menu-button"
      :styles="ButtonStyle"
      @click="onButtonClicked(1, '文件')"
    >
      资产管理
    </Button>
    <Button
      class="menu-button"
      :styles="ButtonStyle"
      @click="onButtonClicked(2, '编辑')"
    >
      设计工具
    </Button>
    <Button
      class="menu-button"
      :styles="ButtonStyle"
      @click="onButtonClicked(3, 'blueprint')"
    >
      Blueprint
    </Button>
  </div>
</template>
<style scoped>
.container {
    display: flex;
    justify-content: left;
    height: 30px;
    background-color: #232323;
    align-items: center;
}
.logo {
  color: #D8D8D8;
  font-size: 1.5rem;
  margin-left: 0.5rem;
  border-radius: 0.4rem;
}
.logo:hover {
    background: #424242;
}
</style>
