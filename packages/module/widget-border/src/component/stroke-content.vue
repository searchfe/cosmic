<script lang="ts" setup>
import { reactive } from 'vue';
import { Row, Col, Input, Select, SelectOption, RadioGroup, RadioButton } from 'cosmic-vue';
import type { StrokeStyle } from '@cosmic/core/parts';
import { Border } from '../data';
const props = withDefaults(defineProps<{
    strokeStyle: StrokeStyle
}>(), {
    strokeStyle: () => ({} as unknown as StrokeStyle),
});

const strokeStyle = reactive(props.strokeStyle);


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
                        @on-input="(event) => strokeStyle.strokeWeight = event.value"
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
                        @on-change="(event) => strokeStyle.strokeAlign = event.value"
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
                        :value="strokeStyle.dashPattern"
                        @on-input="(event) => strokeStyle.dashPattern = event.value"
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
                        :value="strokeStyle.solidPattern"
                        @on-input="(event) => strokeStyle.solidPattern = event.value"
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