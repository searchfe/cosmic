 <script lang="ts" setup>
import { ref } from 'vue';
import { MTitle, MStandard, MStandardModal, MDetailModal } from '@cosmic/core/browser';
import { Standard } from '../../data';
import GlyphContent from './glyph-content.vue'; 

let standardTarget:HTMLElement| null = null;
let detailTarget : HTMLElement| null = null;

const selected = ref(void 0);

const isShowDetailModal = ref(false);

const isShowStandardModal = ref(false);

const container = ref(null);

const unSelectAction = () => {
    selected.value = void 0;
};

const showDataileModal = (target: HTMLElement) => {
    if (detailTarget === target && isShowDetailModal.value) {
        return;
    }
    isShowDetailModal.value = false;
    Promise.resolve().then(() =>  {
        detailTarget = target;
        isShowDetailModal.value = true;
    });
};

const ok = () => {
    isShowDetailModal.value = false;
};

const cancel = () => {
    isShowDetailModal.value = false;
};

const selectStandard = (event: {event: MouseEvent, data: any}) => {
    selected.value = event.data;
    isShowStandardModal.value = false;
};

const cancelStandardModal = () => {
    Promise.resolve().then(() => isShowStandardModal.value = false);
};

const showStandardModal = (event: MouseEvent) => {
    standardTarget = event.target as HTMLElement;
    isShowStandardModal.value = true;
};

function getStandardTarge(): HTMLElement {
    return standardTarget as HTMLElement;
}

function getDetailTarget():HTMLElement {
    return detailTarget as HTMLElement;
}

 </script>

<template>
    <div ref="container">
        <div v-if="!selected">
            <MTitle title="字形">
                <i-cosmic-grid-outline @click.stop="showStandardModal" />
            </MTitle>
            <GlyphContent />
        </div>
        <template v-else>
            <MStandard :standard="selected" :can-edit="false">
                <template #subfix>
                    <div
                        class="flex items-center w-40 justify-between"
                        @click.stop="unSelectAction"
                    >
                        <i-cosmic-more @click.stop="(event) => showDataileModal(container)" />
                        <i-cosmic-link @click.stop="unSelectAction" />
                    </div>
                </template>
            </MStandard>
        </template>
        <MStandardModal
            v-if="isShowStandardModal" 
            title="文字规范" 
            :standard="Standard" 
            :target="() => getStandardTarge()" 
            @cancel="cancelStandardModal"
            @select="selectStandard"
            @show-detail="showDataileModal"
        />
        <MDetailModal
            v-if="isShowDetailModal"
            title="文字规范"
            :target="() => getDetailTarget()"
            @ok="ok"
            @cancel="cancel"
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
