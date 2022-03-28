<script lang="ts" setup>
import {ref} from 'vue';

import InputText from './input-text.vue';

import {Shadow} from '../data';

const inputData = ref(Shadow);

const emits = defineEmits(['onInput']);

const onInput = (data) => {
    emits('onInput', data);
};
</script>

<template>
    <div :class="[$style['input-list'], 'flex items-center flex-wrap']">
        <div
            v-for="(val, key) in inputData"
            :key="key"
            :class="[$style['item']]"
        >
            <InputText
                :id="key"
                :class="[$style['input']]"
                :type="val.type"
                :model="key"
                :value="val.value"
                @on-input="onInput"
            >
                <template #prefix>
                    <i-cosmic-x v-if="val.icon === 'x'" :class="[$style['icon']]" />
                    <i-cosmic-y v-if="val.icon === 'y'" :class="[$style['icon']]" />
                    <i-cosmic-fuzzy v-if="val.icon === 'fuzzy'" :class="[$style['icon']]" />
                    <i-cosmic-expand v-if="val.icon === 'expand'" :class="[$style['icon']]" />
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
