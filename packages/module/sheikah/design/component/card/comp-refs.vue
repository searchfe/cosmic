<script lang="ts" setup>
withDefaults(defineProps<{ name: string }>(), {
    name: '2n 按钮',
});
</script>
<template>
    <div :class="$style.card">
        <div :class="$style['card-content']" class="w-full h-full">
            <div :class="$style.preview" class="w-full" />
            <div :class="$style.info" class="w-full text-lg flex items-center pl-20">
                {{ name }}
            </div>
        </div>
    </div>
</template>

<style module>
.card {
    position: relative;
    box-sizing: border-box;
    height: 0;
    padding-bottom: 95.4%;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid rgba(151, 151, 151, .7);
    font-size: 0;
}
.card-content {
    position: absolute;
    overflow: hidden;
    font-size: 0;
}
.preview {
    height: 79%;
    background: #e5e5e5;
}
.info {
    height: 21%;
}
</style>
