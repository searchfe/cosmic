<script lang="ts" setup>
import {ref} from 'vue';
import { Row, Col, Input, Select, SelectOption, RadioGroup, RadioButton } from 'cosmic-vue';
import { MTitle, MColor } from '@cosmic/core/browser';
const open = ref(false);

const clickHandler = () => {
    open.value = !open.value;
};

</script>

<template>
    <MTitle title="边框">
        <i-cosmic-plus
            v-if="!open"
            @click="clickHandler"
        />
        <i-cosmic-minus
            v-else
            @click="clickHandler"
        />
    </MTitle>
    <div
        v-if="open"
        :class="$style.container"
    >
        <MTitle title="描边">
            <i-cosmic-grid-outline />
        </MTitle>
        <Row :class="$style.row">
            <Col
                class="flex"
                :span="4"
            >
                <Input
                    size="sm"
                    :value="12"
                >
                    <template #prefix>
                        <i-cosmic-grid-outline />
                    </template>
                </Input>
            </Col>
            <Col 
                class="flex"
                :span="4"
            >
                <Select
                    size="sm"
                    value="1"
                >
                    <SelectOption
                        value="1"
                        label="内描边"
                    />
                </Select>
            </Col>
        </Row>
        <Row :class="$style.row">
            <Col
                class="flex"
                :span="4"
            >
                <Input
                    size="sm"
                    :value="12"
                >
                    <template #prefix>
                        <i-cosmic-grid-outline />
                    </template>
                </Input>
            </Col>
            <Col 
                class="flex"
                :span="4"
            >
                <Input
                    size="sm"
                    :value="12"
                >
                    <template #prefix>
                        <i-cosmic-grid-outline />
                    </template>
                </Input>
            </Col>
            <Col :span="4">
                <RadioGroup>
                    <RadioButton value="1">
                        <i-cosmic-text-left :class="$style['radio-icon']" />
                    </RadioButton>

                    <RadioButton value="2">
                        <i-cosmic-text-center :class="$style['radio-icon']" />
                    </RadioButton>

                    <RadioButton value="3">
                        <i-cosmic-text-right :class="$style['radio-icon']" />
                    </RadioButton>
                    <RadioButton value="4">
                        <i-cosmic-text-even :class="$style['radio-icon']" />
                    </RadioButton>
                </RadioGroup>
            </Col>
        </Row>
        <MTitle title="颜色">
            <div
                class="flex justify-between items-center"
                :class="$style.icon"
            >
                <i-cosmic-sun />
                <i-cosmic-grid-outline />
            </div>
        </MTitle>
        <MColor />
    </div>
</template>

<style module>
.icon {
    font-size: var(--font-md)
}
.row {
    margin: var(--margin-md) 0;
}

.container {
    padding-bottom: var(--padding-md);
}
</style>