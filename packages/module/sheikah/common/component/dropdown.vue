<script lang="ts" setup>
import { ref } from 'vue';


interface MenuOption {
    label: string;
    id: string;
}

interface MenuOptions {
    data: MenuOption[];
}

withDefaults(defineProps<MenuOptions>(), {
    data: () => [],
});

const emis = defineEmits(['change']);

const open = ref(false);

function onButtonClick() {
    open.value = true;
}

function onBlur() {
    open.value = false;
}

function onClickItem(id: string) {
    open.value = false;
    emis('change', { id });
}

</script>

<template>
    <div class="relative" tabindex="0" hidefocus="true" :class="$style.container" @blur="onBlur">
        <div class="w-full h-full flex items-center justify-center text-sm" @click.stop="onButtonClick">
            <slot name="icon">
                <i-cosmic-more />
            </slot>
        </div>
        <div v-show="open" class="absolute w-80 py-10" :class="$style.menu">
            <div
                v-for="item in data"
                :key="item.id"
                class="w-full h-30 flex items-center text-sm"
                :class="$style.item"
                @click="onClickItem(item.id)"
            >
                {{ item.label }}
            </div>
        </div>
    </div>
</template>

<style module>
.container {
    width: 25px;
    height: 25px;
}
.menu {
    right: 0;
    background: #25252b;
    color: #fff;
    border-radius: 4px;
    z-index: 9999;
}
.item {
    overflow: hidden;
    box-sizing: border-box;
    padding-left: 16px;
}
.item:hover {
    background: rgb(255, 255, 255, .06);
}
</style>
