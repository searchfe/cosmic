<script lang="ts" setup>
import { ref, computed } from 'vue';
import { Dialog, Button, Input } from 'cosmic-vue';
import { buttonSolid } from 'cosmic-ui';
import ColorContent from './color.vue';
import { create as useCreate } from '../../../api/common';
import { router as vueRouter } from '@cosmic/core/browser';

import type { AtomType } from '../../../types';


interface AtomModal {
    type: AtomType;
}

const team = vueRouter.useRoute().query?.team;

const contentMap = {
    color: {
        title: '新建颜色',
        comp: ColorContent,
        save: useCreate('color', ['id']),
        format() {
            const color = contentData.value;
            return {
                team,
                name: name.value,
                day: color.day ? `#${color.night}` : '',
                night: color.night ? `#${color.day}` : '',
                dark: color.dark ? `#${color.dark}` : '',
            };
        },
    },
    font: {
        title: '新建字形',
        save: useCreate('color', ['id']),
        format() { return contentData.value; },
    },
    corner: {
        title: '新建边角',
        save: useCreate('color', ['id']),
        format() { return contentData.value; },
    },
    border: {
        title: '新建描边',
        save: useCreate('color', ['id']),
        format() { return contentData.value; },
    },
    shadow: {
        title: '新建阴影',
        save: useCreate('color', ['id']),
        format() { return contentData.value; },
    },
    opacity: {
        title: '新建透明度',
        save: useCreate('color', ['id']),
        format() { return contentData.value; },
    },
};

const props = defineProps<AtomModal>();

const showDialog = ref(false);
const contentData = ref<Record<string, unknown>>({});
const name = ref('');

const title = computed(() => {
    return contentMap[props.type].title;
});
const comp = computed(() => {
    return contentMap[props.type].comp;
});

const emits = defineEmits(['success']);

function onAdd() {
    showDialog.value = true;
}

function onCancel() {
    contentData.value = {};
    showDialog.value = false;
}

function onOK() {
    const { executeMutation: save } = contentMap[props.type].save;
    save({ data: contentMap[props.type]?.format() }).then(res => {
        if (res.data) {
            onCancel();
            emits('success');
        }
    });
}

</script>

<template>
    <div :class="$style.container">
        <div :class="$style.add" class="flex justify-center items-center" @click.stop="onAdd">
            <i-cosmic-plus class="text-md" />
        </div>
        <Dialog v-model:visible="showDialog" :styles="$style" width="270px" class="text-sm cos-mode-reverse">
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
                <component :is="comp" v-if="comp" v-model="contentData" />
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
