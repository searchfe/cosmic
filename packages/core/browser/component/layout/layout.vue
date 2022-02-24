<script lang="ts" setup>
const hasSider = false;
</script>

<template>
  <section
    class="layout"
    :class="{ hasSider }"
  >
    <slot />
  </section>
</template>

<style>
@import "./layout.css";

.has-sider {
    flex-direction: row;
}
</style>

