<script lang="ts" setup>
interface  ShadowOptions {
    type: string;
    offsetX: string;
    offsetY: string;
    spread: string;
    color: string;
    blur: string;
}


const props = withDefaults(defineProps<ShadowOptions>(), {
    type: 'inset',
    offsetX: '0px',
    offsetY: '0px',
    spread: '0px',
    blur: '0px',
    color: 'transparent',
});


function renderShadow() {
    const { type, offsetX, offsetY, spread, blur, color }  = props;
    return `${type} ${offsetX} ${offsetY} ${blur} ${spread} ${color}`;
}

</script>


<template>
    <div
        class="flex overflow-hidden"
        :class="$style.wrapper"
    >
        <div
            class="h-wull w-full"
            :style="{
                boxShadow: renderShadow(),
                background: '#f5f5f5',
            }"
        />
    </div>
</template>

<style module>
.wrapper {
    box-sizing: border-box;
    padding: 23px;
    width: 72px;
    height: 72px;
    border: 1px solid #f5f5f5;
    border-radius: var(--rounded-md);
}
</style>
