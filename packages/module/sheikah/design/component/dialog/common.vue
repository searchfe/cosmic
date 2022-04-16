<script lang="ts" setup>
import { Dialog, Button, Input } from 'cosmic-vue';
import { buttonSolid, buttonLight } from 'cosmic-ui';
import { useRoute } from '@cosmic/core/router';

withDefaults(defineProps<{ title: string, visible: boolean, name: string, editMode: boolean }>(), {
    title: '',
    visible: false,
    name: '',
    editMode: false,
});

const team = useRoute().query?.team;

const emits = defineEmits(['ok', 'update:visible', 'update:name']);

function onCancel() {
    emits('update:name', '');
    onUpdateVisible(false);
}

function onOK() {
    emits('ok', { team });
}

function onAdd() {
    onUpdateVisible(true);
}

function onUpdateVisible(value: boolean) {
    emits('update:visible', value);
}

function onUpdateName(data: {value: string}) {
    emits('update:name', data.value);
}

</script>

<template>
    <div :class="$style.container">
        <div v-if="!editMode" :class="$style.add" class="flex justify-center items-center" @click.stop="onAdd">
            <i-cosmic-plus class="text-md" />
        </div>
        <div v-else class="flex justify-center items-center text-md" @click.stop="onAdd">
            <Button size="lg" :styles="buttonLight">编辑</Button>
        </div>
        <Dialog
            :visible="visible"
            :styles="$style"
            width="270px"
            class="text-sm cos-mode-reverse"
            @update:visible="onUpdateVisible"
        >
            <template #title>
                <div :class="$style.region">
                    {{ title }}
                </div>
            </template>
            <div :class="$style.line" />
            <div class="my-12 flex justify-between items-center" :class="[$style['has-line'], $style.region]">
                <div :class="$style['title-label']">
                    名称
                </div>
                <Input :value="name" size="sm" placeholder="起个名字吧" @on-input="onUpdateName" />
            </div>
            <div class="py-6 mb-20">
                <slot />
            </div>
            <div :class="$style.line" />
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
    padding: 13px 0;
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

.edit {
    width: 90px;
    height: 36px;
    background: #d8d8d8;
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
.line {
    margin: 12px 0;
    height: 1px;
    width: 100%;
    background: rgba(255, 255, 255, .1);
}
.region {
    margin: 0 17px;
}
</style>
