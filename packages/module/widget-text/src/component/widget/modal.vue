<script lang="ts" setup>
import { defineEmits, ref } from 'vue';
import { Input, Row, Col } from 'cosmic-vue';
import { MStandardModal, MStandard, MDetailModal } from '@cosmic/core/browser';
import GlyphContent from './glyph-content.vue';


withDefaults(defineProps<{
    select?: Record<string, string>
    standard: any[];
}>(),{
    select: () => ({}),
    standard: () => ([]),
});
const emits = defineEmits(['select']);

const style = ref({});
const container = ref(null);

const detail = ref(false);
const hoverIndex = ref({});

const detailAction = (index: number) => {
    const parent = container.value as HTMLElement;
    const target = [...parent.children][index];
    const react = target.getBoundingClientRect();
    style.value = {left: `${react.left - 1}px`, top: `${react.top}px` };
    detail.value = true;
};

const hoverAction = (event, index) => {
    hoverIndex.value = event ? index : -1;
    console.log(hoverIndex.value);
};

</script>

<template>
    <MStandardModal
        title="文字规范"
    >
        <div ref="container" :class="$style.content">
            <MStandard 
                v-for="(data, index) of standard"
                :key="data"
                :standard="data"
                :active="data === select"
                :can-edit="true"
                classes="-v-bg-inapparent"
                @click="(event) => emits('select', event)"
                @hover="(event) => hoverAction(event, index)"
            >
                <template #subfix>
                    <div 
                        v-show="index === hoverIndex"
                        :class="$style.subfix"
                        class="flex items-center"
                        @click.stop="detailAction(index)"
                    >
                        <i-cosmic-more />
                    </div>
                </template>
            </MStandard>
        </div>
    </MStandardModal>
    <div v-if="detail" :class="$style.detail" :style="style">
        <MDetailModal
            title="文字规范"
        >
            <div :class="$style['detail-content']">
                <Row class="flex items-center">
                    <Col :span="2">
                        标题：
                    </Col>
                    <Col>
                        <Input />
                    </Col>
                </Row>
                <Row
                    class="flex items-center h-32"
                    :class="$style['gray-text']"
                >
                    <Col :span="2">
                        编码：
                    </Col>
                    <Col>
                        qweqwe
                    </Col>
                </Row>
                <div :class="$style['glyph-content']">
                    <GlyphContent />
                </div>
            </div>
        </MDetailModal>
    </div>
</template>

<style module>
.content {
    width: 25vw;
    max-height: 400px;
    border-radius: var(--spacing-4);
    overflow: auto;
}

.detail {
    position: fixed;
    transform: translateX(-100%)
}

.subfix {
    width: var(--spacing-26)
}


.detail-content {
    composes: -v-px md from global;
    width: 25vw;
    max-height: 400px
}

.gray-text {
    color: var(--color-gray-300);
}

.glyph-content {
    border-top: solid 1px var(--color-gray-100);
    border-bottom: solid 1px var(--color-gray-100);
}
</style>