<script lang="ts" setup>
import { Row, Col, Input, Select, SelectOption, RadioGroup, RadioButton } from 'cosmic-vue';
import type { StrokeStyle } from '@cosmic/core/parts';
import { Border } from '../data';
withDefaults(defineProps<{
    strokeStyle: StrokeStyle
}>(), {
    strokeStyle: () => ({} as unknown as StrokeStyle),
});

const emits = defineEmits(['change']);

function changeStyle(strokeStyle, field: string, event) {
    strokeStyle[field] = event.value;
    emits('change');
}

function changeDash(strokeStyle, index, event) {
    strokeStyle.dashPattern[index] = event.value;
    emits('change');
}

</script>

<template>
    <div>
        <Row :class="$style.row">
            <Col
                class="flex"
                :span="3"
            >
                <div class="w-70">
                    <Input
                        size="sm"
                        :value="strokeStyle.strokeWeight"
                        @on-input="(event) => changeStyle(strokeStyle, 'strokeWeight', event)"
                    >
                        <template #prefix>
                            <i-cosmic-text-even />
                        </template>
                    </Input>
                </div>
            </Col>
            <Col 
                class="flex"
                :span="4"
            >
                <div class="w-80">
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
                </div>
            </Col>
        </Row>
        <Row :class="$style.row">
            <Col
                class="flex"
                :span="3"
            >
                <div class="w-70">
                    <Input
                        size="sm"
                        :value="strokeStyle.dashPattern[0]"
                        @on-input="(event) => changeDash(strokeStyle, 0, event)"
                    >
                        <template #prefix>
                            <i-cosmic-border />
                        </template>
                    </Input>
                </div>
            </Col>
            <Col 
                class="flex"
                :span="3"
            >
                <div class="w-70">
                    <Input
                        size="sm"
                        :value="strokeStyle.dashPattern[1]"
                        @on-input="(event) => changeDash(strokeStyle, 1, event)"
                    >
                        <template #prefix>
                            <i-cosmic-horizonal-width />
                        </template>
                    </Input>
                </div>
            </Col>
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

</style>