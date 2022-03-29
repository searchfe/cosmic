<script lang="ts" setup>
import {reactive} from 'vue';
import InputText from './input-text.vue';
import type { EffectStyle } from '@cosmic/core/parts';

const props = withDefaults(defineProps<{
    effectStyle: EffectStyle,
}>(), {
    effectStyle: () => ({}),
});


const effectStyle = reactive(props.effectStyle);

</script>

<template>
    <div :class="[$style['input-list'], 'flex items-center flex-wrap']">
        <div :class="[$style['item']]">
            <InputText
                :class="[$style['input']]"
                :value="effectStyle.offset.x"
                @on-input="(data) => effectStyle.offset.x = data.value"
            >
                <template #prefix>
                    <i-cosmic-x :class="[$style['icon']]" />
                </template>
            </InputText>
        </div>
        <div :class="[$style['item']]">
            <InputText
                :class="[$style['input']]"
                :value="effectStyle.offset.y"
                @on-input="(data) => effectStyle.offset.y = data.value"
            >
                <template #prefix>
                    <i-cosmic-y :class="[$style['icon']]" />
                </template>
            </InputText>
        </div>
        <div :class="[$style['item']]">
            <InputText
                :class="[$style['input']]"
                :value="effectStyle.blur"
                @on-input="(data) => effectStyle.blur = data.value"
            >
                <template #prefix>
                    <i-cosmic-fuzzy :class="[$style['icon']]" />
                </template>
            </InputText>
        </div>
        <div :class="[$style['item']]">
            <InputText
                :class="[$style['input']]"
                :value="effectStyle.spread"
                @on-input="(data) => effectStyle.spread = data.value"
            >
                <template #prefix>
                    <i-cosmic-expand :class="[$style['icon']]" />
                </template>
            </InputText>
        </div>
    </div>
</template>

<style module>
.item {
    display: inline-block;
    margin: 0 .6rem .6rem 0;
}
</style>
