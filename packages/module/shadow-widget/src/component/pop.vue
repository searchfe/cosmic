<script lang="ts" setup></script>

<template>
    <div :class="[$style['container']]">
        <slot />
    </div>
</template>

<style module>
.container {
    padding: var(--spacing-12) var(--spacing-12) var(--spacing-20) var(--spacing-12);
    box-sizing: border-box;
    background-color: #25252B;
    border-radius: 8px;
    color: var(--color-white);
}
</style>
