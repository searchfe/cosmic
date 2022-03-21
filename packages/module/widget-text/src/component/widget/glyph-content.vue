<script lang="ts" setup>
 import { Select, Row, Col, Input, RadioGroup, RadioButton } from 'cosmic-vue';
import { GlyphData, FontSize, FontWeight, FontType } from '../../data';
</script>


<template>
    <div>
        <Select
            size="sm"
            value="1"
        >
            <SelectOption
                v-for="data of GlyphData"
                :key="data.value"
                :value="data.value"
                :label="data.label"
            />
        </Select>

        <Row :class="$style.row">
            <Col :span="4">
                <div class="w-100">
                    <Select
                        size="sm"
                        value="12"
                        allow-input
                        :class="$style['margin-left']"
                    >
                        <template #prefix>
                            <i-cosmic-font :class="$style.icon" />
                        </template>
                        <SelectOption
                            v-for="data of FontSize"
                            :key="data.value"
                            :value="data.value"
                            :label="data.label"
                        />
                    </Select>
                </div>
            </Col>
            <Col :span="4">
                <div class="w-100">
                    <Select
                        size="sm"
                        value="400"
                    >
                        <SelectOption
                            v-for="data of FontWeight"
                            :key="data.value"
                            :value="data.value"
                            :label="data.label"
                        />
                    </Select>
                </div>
            </Col>
            <Col :span="4">
                <div class="w-100">
                    <Select
                        size="sm"
                        value="12"
                    >
                        <SelectOption
                            v-for="data of FontType"
                            :key="data.value"
                            :value="data.value"
                            :label="data.label"
                        />
                    </Select>
                </div>
            </Col>
        </Row>
        <Row :class="$style.row">
            <Col :span="4">
                <div :class="[$style['glyph-item']]" class="w-100">
                    <Input
                        size="sm"
                        value="121"
                    >
                        <template #prefix>
                            <i-cosmic-line-height :class="[$style.icon]" />
                        </template>
                    </Input>
                </div>
            </Col>
            <Col :span="4">
                <div :class="[$style['glyph-item']]" class="w-100">
                    <Select
                        size="sm"
                        value="123"
                        allow-input
                        :class="$style['margin-left']"
                    >
                        <template #prefix>
                            <i-cosmic-font :class="[$style.icon]" />
                        </template>
                        <SelectOption
                            value="123"
                            label="1"
                        />
                        <SelectOption
                            value="2"
                            label="10"
                        />
                        <SelectOption
                            value="3"
                            label="20"
                        />
                    </Select>
                </div>
            </Col>
            <Col :span="4">
                <div class="w-100">
                    <Select
                        size="sm"
                        value="123"
                        allow-input
                    >
                        <template #prefix>
                            <i-cosmic-vertical-height :class="[$style.icon]" />
                        </template>
                        <SelectOption
                            value="123"
                            label="1"
                        />
                        <SelectOption
                            value="2"
                            label="10"
                        />
                        <SelectOption
                            value="3"
                            label="20"
                        />
                    </Select>
                </div>
            </Col>
        </Row>
        <Row :class="$style.row">
            <Col :span="16">
                <div :class="$style['radio-left']">
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
                </div>
            </Col>
            <Col :span="8">
                <div>
                    <RadioGroup>
                        <RadioButton value="1">
                            <i-cosmic-width-auto :class="$style['radio-icon']" />
                        </RadioButton>

                        <RadioButton value="2">
                            <i-cosmic-linked-square :class="$style['radio-icon']" />
                        </RadioButton>
                        <RadioButton value="3">
                            <i-cosmic-linked-square :class="$style['radio-icon']" />
                        </RadioButton>
                    </RadioGroup>
                </div>
            </Col>
        </Row>
    </div>
</template>

 <style module>
 .row {
    composes: -v-my lg from global;
 }

 
 </style>