<script lang="ts" setup>
import InputText from './input-text.vue';
import type { EffectStyle } from '@cosmic/core/parts';
import { Row, Col } from 'cosmic-vue';

withDefaults(defineProps<{
    effectStyle: EffectStyle,
}>(), {
    effectStyle: () => ({}),
});

const emits = defineEmits(['change']);

function changeStyle(style, field: string, event) {
    style[field] = event.value;
    emits('change');
}

</script>

<template>
    <Row :class="$style.row">
        <Col :span="6">
            <div class="w-80">
                <InputText
                    :class="[$style['input']]"
                    :value="effectStyle.offset.x"
                    @on-input="(data) => changeStyle(effectStyle.offset, 'x',data)"
                >
                    <template #prefix>
                        <i-cosmic-x :class="[$style['icon']]" />
                    </template>
                </InputText>
            </div>
        </Col>
        <Col :span="6">
            <div class="w-80">
                <InputText
                    :class="[$style['input']]"
                    :value="effectStyle.offset.y"
                    @on-input="(data) => changeStyle(effectStyle.offset, 'y', data)"
                >
                    <template #prefix>
                        <i-cosmic-y :class="[$style['icon']]" />
                    </template>
                </InputText>
            </div>
        </Col>
    </Row>
    <Row :class="$style.row">
        <Col :span="6">
            <div class="w-80">
                <InputText
                    :class="[$style['input']]"
                    :value="effectStyle.radius"
                    @on-input="(data) => changeStyle(effectStyle, 'radius', data)"
                >
                    <template #prefix>
                        <i-cosmic-fuzzy :class="[$style['icon']]" />
                    </template>
                </InputText>
            </div>
        </Col>
        <Col :span="6">
            <div class="w-80">
                <InputText
                    :class="[$style['input']]"
                    :value="effectStyle.spread"
                    @on-input="(data) => changeStyle(effectStyle, 'spread', data)"
                >
                    <template #prefix>
                        <i-cosmic-expand :class="[$style['icon']]" />
                    </template>
                </InputText>
            </div>
        </Col>
    </Row>
</template>

<style module>
 .row {
    composes: mb-10 from global;
 }
 
.item {
}
</style>
