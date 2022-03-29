<script lang="ts" setup>
import { ref } from 'vue';
import { Dialog, Button, Input } from 'cosmic-vue';
import { buttonSolid } from 'cosmic-ui';
import { router as vueRouter } from '@cosmic/core/browser';

withDefaults(defineProps<{ title: string, visible: boolean }>(), {
    title: '', visible: false,
});

const team = vueRouter.useRoute().query?.team;

const name = ref('');


const emits = defineEmits(['ok', 'update:visible']);

function onCancel() {
    name.value = '';
    onUpdateVisible(false);
}

function onOK() {
    emits('ok', { name: name.value, team });
}

function onAdd() {
    name.value = '';
    onUpdateVisible(true);
}

function onUpdateVisible(value: boolean) {
    emits('update:visible', value);
}

</script>

<template>
    <div :class="$style.container">
        <div :class="$style.add" class="flex justify-center items-center" @click.stop="onAdd">
            <i-cosmic-plus class="text-md" />
        </div>
        <Dialog
            :visible="visible"
            :styles="$style"
            width="270px"
            class="text-sm cos-mode-reverse"
            @update:visible="onUpdateVisible"
        >
            <template #title>
                {{ title }}
            </template>
            <div class="my-12 flex justify-between items-center">
                <div :class="$style['title-label']">
                    名称
                </div>
                <Input v-model:value="name" size="sm" placeholder="起个名字吧" />
            </div>
            <div class="py-6 mb-20">
                <slot />
            </div>
            <template #actions>
                <Button
                    size="sm"
                    :styles="buttonSolid"
                    :class="$style.button"
                    class="rounded-full w-64 -v-border-apparent"
                    @click="onCancel"
                >
                    取消
                </Button>
                <Button
                    size="sm"
                    class="rounded-full w-64"
                    @click="onOK"
                >
                    确定
                </Button>
            </template>
        </Dialog>
    </div>
</template>

<style module>
.container {
    position: relative;
}
.dialog {
    position: absolute;
    left: -234px;
    top: 36px;
    padding: 13px 17px;
    color: #fff;
    border-radius: 8px;
    background-color: var(--color-gray-50);
    box-sizing: border-box;
    opacity: .95;
}
.add {
    height: 36px;
    width: 36px;
    border-radius: 4px;
    background: #f5f5f5;
}
.close {
    position: absolute;
    right: 17px;
    top: 13px;
}
.button {
    background-color: rgba(0,0,0,0);
    color: #fff;
    opacity: .5;
}
.title-label {
    flex: none;
    height: 24px;
    line-height: 22px;
}
</style>
