<script lang="ts" setup>
import { ref, watchEffect, toRaw } from 'vue';
import { Input } from 'cosmic-vue';
import { createUnique } from '../../../api/color';
import Dialog from '../common.vue';
import { color } from '@cosmic/core/browser';
import ColorCell from '../../cell/color.vue';

import type { AtomType } from '../../../types';


const { executeMutation: save } = createUnique('color', ['id']);

interface AtomModal {
    atomType: AtomType;
    id: string;
}

withDefaults(defineProps<AtomModal>(), {
    id: '',
});

const data = ref({
    day: '',
    night: '',
    dark: '',
});

const exsistingData = ref<Partial<gql.Color>[]>([]);

const showDialog = ref(false);

const backgroundDay = ref('none');
const backgroundNight = ref('none');
const backgroundDark = ref('none');

watchEffect(() => {
    backgroundDay.value = data.value.day ? '#' + data.value.day : 'none';
    backgroundNight.value = data.value.night ? '#' + data.value.night : 'none';
    backgroundDark.value = data.value.dark ? '#' + data.value.dark : 'none';
});

const emits = defineEmits(['success']);

function onOK(args: { name: string, team: string }) {
    if (!args.name) {
        alert('请输入名字');
        return;
    }
    const { day, night, dark } = toRaw(data.value);
    const newColor = {
        day: day ? color(`#${day}`).hex() : '',
        night: night ? color(`#${night}`).hex() : '',
        dark: dark ? color(`#${dark}`).hex() : '',
    };
    save({
        data: {
            ...args,
            ...newColor,
        },
        filter: {
            ...newColor,
        },
    }).then(res => {
        if (res.data?.createUniqueColor?.id) {
            emits('success');
        } else {
            const duplicatData = res.error?.graphQLErrors?.[0]?.extensions?.data;
            console.log(duplicatData);
            if (Array.isArray(duplicatData)) {
                exsistingData.value = duplicatData as unknown as Partial<gql.Color>[];
            }
        }
    });
}
</script>
<template>
    <Dialog v-model:visible="showDialog" title="新建颜色" @ok="onOK">
        <div :class="$style.container">
            <!-- day -->
            <i-cosmic-sun class="text-lg" />
            <div :style="{ background: backgroundDay }" :class="$style.color" />
            <div>
                <Input v-model:value="data.day" size="sm">
                    <template #prefix>
                        #
                    </template>
                </Input>
            </div>
            <div>100%</div>
            <div />

            <!-- night -->
            <i-cosmic-night class="text-lg" />
            <div :style="{ background: backgroundNight }" :class="$style.color" />
            <div>
                <Input v-model:value="data.night" size="sm">
                    <template #prefix>
                        #
                    </template>
                </Input>
            </div>
            <div>
                100%
            </div>
            <div :class="$style.clear" class="flex justify-center items-center" @click="data.night = ''">
                <i-cosmic-minus />
            </div>

            <!-- dark -->
            <i-cosmic-dark class="text-lg" />
            <div :style="{ background: backgroundDark }" :class="$style.color" />
            <div>
                <Input v-model:value="data.dark" size="sm">
                    <template #prefix>
                        #
                    </template>
                </Input>
            </div>
            <div>100%</div>
            <div :class="$style.clear" class="flex justify-center items-center" @click="data.dark = ''">
                <i-cosmic-minus class="text-sm" />
            </div>
        </div>
        <div v-if="exsistingData.length > 0" :class="$style.duplicate">
            <div class="flex" :class="$style['duplicate-info']">
                <div class="mr-8">
                    <i-cosmic-caution />
                </div>
                <div>
                    <div>已存在于规范，不可重新创建</div>
                    <div class="mr-12 opacity-30">将使用规范替换更新</div>
                </div>
            </div>
            <div v-for="item in exsistingData" :key="item.id" class="mt-8 flex px-12">
                <div class="mr-10" :class="$style.preview">
                    <color-cell v-bind="item" />
                </div>
                <div>
                    <div>四级标题</div>
                    <div class="mt-10 opacity-30">规范描述</div>
                </div>
            </div>
        </div>
    </Dialog>
</template>

<style module>
.container {
    display: grid;
    grid-template-columns: 9.24% 8.4% 34.45% 36.97% 10.92%;
    grid-template-rows: 26px;
    align-items: center;
    row-gap: 6px;
}
.color {
    width: 14px;
    height: 14px;
    border: 1px solid rgba(255, 255, 255, .1);
}
.clear {
    width: 26px;
    height: 26px;
}
.duplicate {
    border-top: 1px solid #25252B;
    padding-top: 12px;
}
.duplicate-info {
    padding: 0 14px 0 19px;
}
.preview {
    border: 1px solid rgba(255, 255, 255, .1);
}
</style>
