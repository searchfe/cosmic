<script lang="ts" setup>

withDefaults(defineProps<{ title: string }>(), {
    title: '',
});

</script>

<template>
    <div :class="$style.info">
        <div :class="$style['info-title']">
            <span>{{ title }}</span>
            <slot name="extra" />
        </div>
        <slot />
        <slot name="bottom" />
    </div>
</template>

<style module>
.info {
    margin-bottom: 40px;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    font-size: 24px;
}
.info-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
</style>
