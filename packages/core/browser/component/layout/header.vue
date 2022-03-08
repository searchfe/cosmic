<template>
  <header class="layout layout-header">
    <slot />
  </header>
</template>

<style>
@import './layout.css';

.layout-header {
    flex-direction: row;
    height: 30px;
    align-items: center;
    flex: none;
    padding: 0 0;
}
</style>
