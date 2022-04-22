<script lang="ts" setup>
import { Row, Col, Select, SelectOption, RadioGroup, RadioButton, InputNumber } from 'cosmic-vue';
import type { StrokeStyle } from '@cosmic/core/parts';
import { Border, BorderStyle } from '../data';
import { toRaw } from 'vue';
withDefaults(defineProps<{
    strokeStyle: StrokeStyle
}>(), {
    strokeStyle: () => ({} as unknown as StrokeStyle),
});

const emits = defineEmits(['change']);

function changeStyle(strokeStyle: any, key: string, data: {value: string}) {
    let value = data.value;
    const changeStyle = toRaw(strokeStyle);
    if (key === 'strokeWeight') {
        changeStyle[key] = parseInt(value, 10);
    } else {
         changeStyle[key] = value;
    }
    console.log(changeStyle);
    emits('change', changeStyle);
}

</script>

<template>
    <div>
        <Row :class="$style.row">
            <Col
                class="flex"
                :class="$style.col"
                :span="4"
            >
                <input-number
                    size="sm"
                    :controls="false"
                    :value="strokeStyle.strokeWeight"
                    @on-input="(event) => changeStyle(strokeStyle, 'strokeWeight', event)"
                >
                    <template #prefix>
                        <i-cosmic-line />
                    </template>
                </input-number>
            </Col>
            <Col
                class="flex"
                :class="$style.col"
                :span="4"
            >
                <Select
                    size="sm"
                    :value="strokeStyle.strokeLineStyle"
                    @on-change="(event) => changeStyle(strokeStyle, 'strokeLineStyle', event)"
                >
                    <template #prefix>
                        <i-cosmic-border />
                    </template>
                    <SelectOption
                        v-for="data of BorderStyle"
                        :key="data.value"
                        :value="data.value"
                        :label="data.label"
                    />
                </Select>
            </Col>
            <Col 
                class="flex"
                :span="4"
            >
                <Select
                    size="sm"
                    :value="strokeStyle.strokeAlign"
                    @on-change="(event) => changeStyle(strokeStyle, 'strokeAlign', event)"
                >
                    <SelectOption
                        v-for="data of Border"
                        :key="data.value"
                        :value="data.value"
                        :label="data.label"
                    />
                </Select>
            </Col>
        </Row>
        <Row :class="$style.row">
            <Col :span="6">
                <RadioGroup>
                    <RadioButton value="1">
                        <i-cosmic-inner-point :class="$style['radio-icon']" />
                    </RadioButton>

                    <RadioButton value="2">
                        <i-cosmic-circleend :class="$style['radio-icon']" />
                    </RadioButton>

                    <RadioButton value="3">
                        <i-cosmic-endpoint :class="$style['radio-icon']" />
                    </RadioButton>
                </RadioGroup>
            </Col>
        </Row>
    </div>
</template>

<style module>
.icon {
    font-size: var(--font-md)
}
.row {
    composes: mb-8 from global;
}

.col {
    margin-right: .8rem;
}

</style>