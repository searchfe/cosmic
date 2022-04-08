<script lang="ts" setup>
import {reactive} from 'vue';
import InputText from './input-text.vue';
import type { EffectStyle } from '@cosmic/core/parts';
import { Row, Col } from 'cosmic-vue';

const props = withDefaults(defineProps<{
    effectStyle: EffectStyle,
}>(), {
    effectStyle: () => ({}),
});


const effectStyle = reactive(props.effectStyle);

</script>

<template>
    <Row :class="$style.row">
        <Col :span="6">
            <div class="w-80">
                <InputText
                    :class="[$style['input']]"
                    :value="effectStyle.offset.x"
                    @on-input="(data) => effectStyle.offset.x = data.value"
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
                    @on-input="(data) => effectStyle.offset.y = data.value"
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
                    :value="effectStyle.blur"
                    @on-input="(data) => effectStyle.blur = data.value"
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
                    @on-input="(data) => effectStyle.spread = data.value"
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
