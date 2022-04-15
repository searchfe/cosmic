<script lang="ts" setup>
import {ref, onMounted, onUnmounted} from 'vue';
import {Input, Select, SelectOption} from 'cosmic-vue';
import VIcon from './v-icon.vue';
import InputRadio from './input-radio.vue';

import {IconList} from '../data';

defineProps({
    text: {
        type: String,
        default: '',
    },
    data: {
        type: Object,
        default: () => ({}),
    },
    inputTypeList: {
        type: Array,
        default: () => [],
    },
});

const emits = defineEmits(['change']);

function changeStyle(
    style: Record<string, unknown>,
    field: string,
    value: string | number,
) {
    style[field] = value;
    emits('change');
}

// 处理弹窗交互
const container = ref(null);
const showWindow = ref(false);

function toggleWindow(event: Event, toggle: boolean) {
    const containerTarget: HTMLElement | null = container.value;
    const currentTarget = event.target as HTMLElement;
    const isIncludes = containerTarget && containerTarget.contains(currentTarget);
    if (isIncludes) {
        showWindow.value = toggle ? !showWindow.value : true;
        return;
    } else {
        showWindow.value = false;
    }
}

onUnmounted(() => {
    window.document.body.removeEventListener('click', toggleWindow);
});
onMounted(() => {
    window.document.body.addEventListener('click', toggleWindow, false);
});
</script>

<template>
    <div>
        <div :class="[$style['row'], 'flex']">
            <div :class="[$style['slot'], 'w-80 flex items-center']">
                <div :class="['w-40']">{{ text }}</div>
                <input-radio
                    class="w-24"
                    :picked="data.picked"
                    @change="value => changeStyle(data, 'picked', value)"
                />
            </div>
            <div class="flex w-80">
                <Select
                    size="sm"
                    :value="data.type"
                    @on-change="(event) => changeStyle(data, 'type', event.value)"
                >
                    <SelectOption
                        v-for="item of inputTypeList"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                    />
                </Select>
            </div>
        </div>

        <Input
            v-if="data.type === 'text'"
            :class="[$style['border']]"
            size="sm"
            :value="data.text"
            placeholder="请输入文本"
            @on-input="(event) => changeStyle(data, 'text', event.value)"
        />

        <div
            v-else
            ref="container"
            class="relative"
        >
            <Input
                ref="container"
                :class="[$style['border']]"
                size="sm"
                readonly
                value="选择图标"
                placeholder="选择图标"
                @click.stop="(event) => toggleWindow(event, true)"
            >
                <template #prefix>
                    <v-icon :icon="data.icon" />
                </template>
            </Input>
            <div>
                <div
                    v-if="showWindow"
                    :class="[$style['icon-modal'], 'w-full p-8 flex flex-wrap items-center']"
                >
                    <!-- 图标交互待定 -->
                    <div
                        v-for="(icon, index) in IconList"
                        :key="index"
                        :class="[$style['icons-item'], 'w-20 h-20 flex items-center justify-center']"
                        @click.stop="event => {toggleWindow(event, true);changeStyle(data, 'icon', icon);}"
                    >
                        <v-icon :icon="icon" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style module>
.slot {
    color: var(--color-gray-400);
    padding-left: var(--padding-sm);
    padding-right: var(--padding-sm);
}

.row {
    composes: mb-8 from global;
}

.border {
    border-width: .1rem;
    border-style: solid;
    border-color: var(--color-gray-300);
}

.icon-modal {
    composes: absolute -v-py from global;
    background-color: var(--color-gray-900);
    border-radius: var(--rounded);
    color: var(--color-light);
    z-index: 1;
}

.icons-item {
    composes: mr-12 mb-12 --font-xl from global;
}
</style>
