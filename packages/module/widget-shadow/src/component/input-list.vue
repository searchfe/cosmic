<script lang="ts" setup>
import type { EffectStyle } from '@cosmic/core/parts';
import { Row, Col, InputNumber } from 'cosmic-vue';

withDefaults(defineProps<{
    effectStyle: EffectStyle,
}>(), {
    effectStyle: () => ({}),
});

const emits = defineEmits(['change']);

function changeStyle(style, field: string, event) {
    style[field] = event.value || '0';
    emits('change');
}

</script>

<template>
    <Row :class="$style.row">
        <Col :span="6" :class="$style.col">
            <div>
                <input-number
                    :class="[$style['input']]"
                    :value="effectStyle.offset.x"
                    @on-input="(data) => changeStyle(effectStyle.offset, 'x',data)"
                >
                    <template #prefix>
                        <i-cosmic-x :class="[$style['icon']]" />
                    </template>
                </input-number>
            </div>
        </Col>
        <Col :span="6" :class="$style.col">
            <div>
                <input-number
                    :class="[$style['input']]"
                    :value="effectStyle.offset.y"
                    @on-input="(data) => changeStyle(effectStyle.offset, 'y', data)"
                >
                    <template #prefix>
                        <i-cosmic-y :class="[$style['icon']]" />
                    </template>
                </input-number>
            </div>
        </Col>
    </Row>
    <Row :class="$style.row">
        <Col :span="6" :class="$style.col">
            <div>
                <input-number
                    :class="[$style['input']]"
                    :value="effectStyle.radius"
                    @on-input="(data) => changeStyle(effectStyle, 'radius', data)"
                >
                    <template #prefix>
                        <i-cosmic-fuzzy :class="[$style['icon']]" />
                    </template>
                </input-number>
            </div>
        </Col>
        <Col :span="6" :class="$style.col">
            <div>
                <input-number
                    :class="[$style['input']]"
                    :value="effectStyle.spread"
                    @on-input="(data) => changeStyle(effectStyle, 'spread', data)"
                >
                    <template #prefix>
                        <i-cosmic-expand :class="[$style['icon']]" />
                    </template>
                </input-number>
            </div>
        </Col>
    </Row>
</template>

<style module>

.col {
    margin-right: .8rem;
}

 .row {
    composes: mb-10 from global;
 }
 
.icon {
    font-size: .8rem;
}
</style>
