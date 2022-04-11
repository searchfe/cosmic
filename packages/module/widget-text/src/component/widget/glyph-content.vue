<script lang="ts" setup>
import { toRaw, watch } from 'vue';
import { Select, SelectOption, Row, Col, Input, RadioGroup, RadioButton } from 'cosmic-vue';
import { GlyphData, FontSize, FontWeight, FontType } from '../../data';
import type { TextStyle } from '@cosmic/core/parts';

const props = withDefaults(defineProps<{
    showLayout?: boolean,
    textStyle?: TextStyle,
}>(), {
    showLayout: true,
    textStyle: () => ({} as unknown as TextStyle),
});

let originalStyle = toRaw(props.textStyle);

const emits = defineEmits('change');

function changeStyle(textStyle, field, event) {
    textStyle[field] = event.value;
    emits('change');
}

watch(() => props.textStyle, (newValue) => {
    originalStyle = toRaw(newValue);
});

</script>


<template>
    <div v-if="textStyle.fontName">
        <div :class="$style.row">
            <Select
                size="sm"
                :value="textStyle.fontName.family"
                @on-change="(event) => changeStyle(originalStyle.fontName, 'family', event)"
            >
                <SelectOption
                    v-for="data of GlyphData"
                    :key="data.value"
                    :value="data.value"
                    :label="data.label"
                />
            </Select>
        </div>
        <Row :class="$style.row">
            <Col :span="4">
                <div class="w-80">
                    <Select
                        size="sm"
                        :value="textStyle.fontSize + ''"
                        allow-input
                        :class="$style['margin-left']"
                        @on-change="(event) => changeStyle(originalStyle, 'fontSize', event)"
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
                <div class="w-80">
                    <Select
                        size="sm"
                        :value="textStyle.fontName.style"
                        @on-change="(event) => changeStyle(originalStyle.fontName, 'style', event)"
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
                <div class="w-80">
                    <Select
                        size="sm"
                        :value="textStyle.textDecoration"
                        @on-change="event => changeStyle(originalStyle, 'textDecoration', event)"
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
                <div :class="[$style['glyph-item']]" class="w-80">
                    <Input
                        size="sm"
                        :value="textStyle.lineHeight.value"
                        @on-change="(event) => changeStyle(originalStyle.lineHeight, 'value', event)"
                    >
                        <template #prefix>
                            <i-cosmic-line-height :class="[$style.icon]" />
                        </template>
                    </Input>
                </div>
            </Col>
            <Col :span="4">
                <div :class="[$style['glyph-item']]" class="w-80">
                    <Select
                        size="sm"
                        :value="textStyle.letterSpacing.value"
                        allow-input
                        :class="$style['margin-left']"
                        @on-change="(event) => changeStyle(originalStyle.letterSpacing, 'value', event)"
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
                <div class="w-80">
                    <Select
                        size="sm"
                        :value="textStyle.paragraphSpacing"
                        allow-input
                        @on-change="(event) => changeStyle(originalStyle, 'paragraphSpacing', event)"
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
                    <RadioGroup value="1">
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
                    <RadioGroup value="1">
                        <RadioButton value="1">
                            <i-cosmic-width-auto :class="$style['radio-icon']" />
                        </RadioButton>

                        <RadioButton value="2">
                            <i-cosmic-height-auto :class="$style['radio-icon']" />
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
    composes: mb-8 from global;
 }

 
 </style>