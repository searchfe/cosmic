<script lang="ts" setup>
import { computed, toRaw } from 'vue';
import { Select, SelectOption, Row, Col, InputNumber } from 'cosmic-vue';
import { GlyphData, FontWeight, FontType } from '../../data';
import type { TextStyle } from '@cosmic/core/parts';

const props = withDefaults(defineProps<{
    showLayout?: boolean,
    textStyle?: TextStyle,
}>(), {
    showLayout: true,
    textStyle: () => ({} as unknown as TextStyle),
});

const textStyle = computed(() => props.textStyle);

const emits = defineEmits(['change']);

function changeStyle(textStyle: any, key: string, event: {value: any}) {
    const value = event.value || '1';
    const originaStyle = toRaw(textStyle);
    if (key === 'fontSize') {
        originaStyle.fontSize = parseInt(value, 10);
        originaStyle.lineHeight = {...originaStyle.lineHeight, value: +value};
    }
    if (key === 'family' || key === 'style') {
        originaStyle.fontName = {...originaStyle.fontName, [key]: value};
    }
    if (key === 'textDecoration') {
        originaStyle.textDecoration = value;
    }
    if (key === 'lineHeight' || key === 'letterSpacing') {
        originaStyle[key] = {...originaStyle[key], value: parseInt(value, 10)};
    }
    emits('change', originaStyle);
}

</script>


<template>
    <div v-if="textStyle.fontName">
        <div :class="$style.row">
            <Select
                size="sm"
                :value="textStyle.fontName.family"
                @on-change="(event) => changeStyle(textStyle, 'family', event)"
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
            <Col :span="4" class="ml-8">
                <input-number
                    size="sm"
                    :value="textStyle.fontSize"
                    :default-min-value="1"
                    :class="$style['margin-left']"
                    @on-input="(event) => changeStyle(textStyle, 'fontSize', event)"
                >
                    <template #prefix>
                        <i-cosmic-font :class="$style.icon" />
                    </template>
                </input-number>
            </Col>
            <Col :span="4" class="ml-8">
                <Select
                    size="sm"
                    :value="textStyle.fontName.style"
                    @on-change="(event) => changeStyle(textStyle, 'style', event)"
                >
                    <SelectOption
                        v-for="data of FontWeight"
                        :key="data.value"
                        :value="data.value"
                        :label="data.label"
                    />
                </Select>
            </Col>
            <Col :span="4">
                <Select
                    size="sm"
                    :value="textStyle.textDecoration"
                    @on-change="event => changeStyle(textStyle, 'textDecoration', event)"
                >
                    <SelectOption
                        v-for="data of FontType"
                        :key="data.value"
                        :value="data.value"
                        :label="data.label"
                    />
                </Select>
            </Col>
        </Row>
        <Row :class="$style.row">
            <Col :span="4" class="ml-8">
                <div :class="[$style['glyph-item']]">
                    <input-number
                        size="sm"
                        controls="false"
                        :value="textStyle.lineHeight.value"
                        @on-input="(event) => changeStyle(textStyle, 'lineHeight', event)"
                    >
                        <template #prefix>
                            <i-cosmic-line-height :class="[$style.icon]" />
                        </template>
                    </input-number>
                </div>
            </Col>
            <Col :span="4" class="ml-8">
                <div :class="[$style['glyph-item']]">
                    <input-number
                        size="sm"
                        :value="textStyle.letterSpacing.value"
                        allow-input
                        :class="$style['margin-left']"
                        @on-input="(event) => changeStyle(textStyle, 'letterSpacing', event)"
                    >
                        <template #prefix>
                            <i-cosmic-font :class="[$style.icon]" />
                        </template>
                    </input-number>
                </div>
            </Col>
            <Col :span="4">
                <input-number
                    size="sm"
                    :value="textStyle.paragraphSpacing"
                    allow-input
                    @on-input="(event) => changeStyle(textStyle, 'paragraphSpacing', event)"
                >
                    <template #prefix>
                        <i-cosmic-vertical-height :class="[$style.icon]" />
                    </template>
                </input-number>
            </Col>
        </Row>
    </div>
</template>

 <style module>
 .row {
    composes: mb-8 from global;
 }


.icon {
    font-size: .8rem;
}

 </style>