<script lang="ts" setup>
import { Row, Col, Input, Select, SelectOption, RadioGroup, RadioButton } from 'cosmic-vue';
import { Border } from '../data';

</script>

<template>
    <div>
        <Row :class="$style.row">
            <Col
                class="flex"
                :span="4"
            >
                <div class="w-80">
                    <Input
                        size="sm"
                        :value="12"
                    >
                        <template #prefix>
                            <i-cosmic-grid-outline />
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
                        value="1"
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
                :span="4"
            >
                <div class="w-80">
                    <Input
                        size="sm"
                        :value="12"
                    >
                        <template #prefix>
                            <i-cosmic-grid-outline />
                        </template>
                    </Input>
                </div>
            </Col>
            <Col 
                class="flex"
                :span="4"
            >
                <div class="w-80">
                    <Input
                        size="sm"
                        :value="12"
                    >
                        <template #prefix>
                            <i-cosmic-grid-outline />
                        </template>
                    </Input>
                </div>
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
    </div>
</template>

<style module>
.icon {
    font-size: var(--font-md)
}
.row {
    composes: -v-my lg from global;
}

</style>