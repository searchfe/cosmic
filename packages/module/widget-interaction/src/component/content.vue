<script lang="ts" setup>
import {reactive} from 'vue';
import {Select, SelectOption} from 'cosmic-vue';
import Slot from './slot.vue';

// 数据
import {InputTypeList, TextTypeList} from '../data';
const effectStyle = reactive({
    prefix: {
        picked: 0,
        type: 'text',
        text: '',
        icon: 'arrow-left',
    },
    suffix: {
        picked: 1,
        type: 'icon',
        text: '',
        icon: 'arrow-left',
    },
    textType: 'number',
    textTypeList: TextTypeList,
    inputTypeList: InputTypeList,
});

// 处理交互
const effectChange = () => {
    console.log('effectStyle', effectStyle);
};
</script>

<template>
    <div>
        <div :class="[$style['row'], 'w-140']">
            <Select
                size="sm"
                :value="effectStyle.textType"
                @on-change="(event) => {effectStyle.textType = event.value;effectChange();}"
            >
                <template #prefix>
                    <div :class="[$style['text'], 'w-32']">输入</div>
                </template>
                <SelectOption
                    v-for="item of effectStyle.textTypeList"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                />
            </Select>
        </div>
        <Slot
            :class="[$style['row']]"
            text="前缀"
            :data="effectStyle.prefix"
            :input-type-list="effectStyle.inputTypeList"
            @change="effectChange"
        />
        <Slot
            text="后缀"
            :data="effectStyle.suffix"
            :input-type-list="effectStyle.inputTypeList"
            @change="effectChange"
        />
    </div>
</template>

<style module>
.text {
    color: var(--color-gray-400);
}

.row {
    composes: mb-8 from global;
}
</style>
