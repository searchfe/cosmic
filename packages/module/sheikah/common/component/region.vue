<script lang="ts" setup>
withDefaults(defineProps<{ title: string, desc: string }>(), {
    title: '',
    desc: '',
});

</script>

<template>
    <div :class="$style.info">
        <div :class="$style['info-title']" class="mb-20">
            <span class="font-semibold">{{ title }}</span>
            <slot name="extra" />
        </div>
        <div class="mb-20">
            <slot />
        </div>
        <div v-if="desc" class="mb-20 text-sm">
            {{ desc }}
        </div>
        <div class="mb-20">
            <slot name="bottom" />
        </div>
    </div>
</template>

<style module>
.info {
    overflow: hidden;
    padding: 32px 32px 0;
    background: #fff;
    border-radius: 8px;
    font-size: 24px;
}
.info-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 24px;
}
</style>
