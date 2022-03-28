<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { Input } from 'cosmic-vue';


interface ColorOptions {
    modelValue: {
        day: string;
        night: string;
        dark: string;
    }
}

const props = withDefaults(defineProps<ColorOptions>(), {
    modelValue: () => {
        return {
            day: '',
            night: '',
            dark: '',
        };
    },
});

const backgroundDay = ref('none');
const backgroundNight = ref('none');
const backgroundDark = ref('none');

watchEffect(() => {
    backgroundDay.value = props.modelValue.day ? '#' + props.modelValue.day : 'none';
    backgroundNight.value = props.modelValue.night ? '#' + props.modelValue.night : 'none';
    backgroundDark.value = props.modelValue.dark ? '#' + props.modelValue.dark : 'none';
});

const emits = defineEmits(['update:modelValue']);

function onChangeDay(e: { value: string }) {
    onChange('day', e.value);
}
function onChangeNight(e: { value: string }) {
    console.log(e);
    onChange('night', e.value);
}
function onChangeDark(e: { value: string }) {
    onChange('dark', e.value);
}

function onChange(colorType: 'day' | 'night' | 'dark', value: string) {
    emits('update:modelValue', {
        ...props.modelValue,
        [colorType]: value || '',
    });
}

</script>
<template>
    <div :class="$style.container">
        <!-- day -->
        <i-cosmic-sun class="text-lg" />
        <div :style="{ background: backgroundDay }" :class="$style.color" />
        <div>
            <Input size="sm" :value="modelValue.day" @on-input="onChangeDay">
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
            <Input size="sm" :value="modelValue.night" @on-input="onChangeNight">
                <template #prefix>
                    #
                </template>
            </Input>
        </div>
        <div>
            100%
        </div>
        <div :class="$style.clear" class="flex justify-center items-center" @click="onChangeNight({ value: '' })">
            <i-cosmic-minus />
        </div>

        <!-- dark -->
        <i-cosmic-dark class="text-lg" />
        <div :style="{ background: backgroundDark }" :class="$style.color" />
        <div>
            <Input size="sm" :value="modelValue.dark" @on-input="onChangeDark">
                <template #prefix>
                    #
                </template>
            </Input>
        </div>
        <div>100%</div>
        <div :class="$style.clear" class="flex justify-center items-center" @click="onChangeDark({ value: '' })">
            <i-cosmic-minus class="text-sm" />
        </div>
    </div>
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
</style>
