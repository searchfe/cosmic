<script lang="ts" setup>
withDefaults(defineProps<{ title: string }>(), {
    title: '',
});
</script>

<template>
    <div :class="$style['title']">
        {{ title }}
    </div>
</template>
<style module>
.title {
    font-size: 24px;
    margin: 24px 0;
    padding: 0 4px;
}
</style>
