<script lang="ts" setup>
import { Row, Col, InputNumber } from 'cosmic-vue';
import { toRaw } from 'vue';

withDefaults(defineProps<{
    effectStyle: Partial<Internal.DropShadowEffect>,
}>(), {
    effectStyle: () => ({}),
});

const emits = defineEmits(['change']);

function changeStyle(style: any, key: string, event: {value: any}) {
    const value = event.value;
    const changeStyle = toRaw(style) as any;
    if (key === 'x' || key === 'y') {
        changeStyle.offset = {...changeStyle.offset, [key]: parseInt(value || '0')};
    } else {
        changeStyle[key] = parseInt(value || '0');
    }
    emits('change', changeStyle);
}

</script>

<template>
    <Row :class="$style.row">
        <Col :span="6" :class="$style.col">
            <div>
                <input-number
                    :class="[$style['input']]"
                    :value="effectStyle.offset.x"
                    @on-input="(data) => changeStyle(effectStyle, 'x',data)"
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
                    @on-input="(data) => changeStyle(effectStyle, 'y', data)"
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
