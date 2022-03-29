 <script lang="ts" setup>
import { ref } from 'vue';
import { MTitle, MStandard, MStandardModal, MDetailModal, usePropterty, service} from '@cosmic/core/browser';
import GlyphContent from './glyph-content.vue';

const containerRef = ref(null);

const {
        isStandard,
        standard,

        isShowStandardModal,
        isShowDetailModal,
        detailTarget,
        standardTarget,
        standardList,

        getDetailEdit,
        cancelStandardModal,
        cancelDetailModal,
        saveDetail,
        selectStandard,
        openDetaileModal,
        openStandardModal,
        unRef,
    } = usePropterty(service.TOKENS.TextStyle);

 </script>

<template>
    <div ref="containerRef">
        <div v-if="!isStandard">
            <MTitle title="字形">
                <i-cosmic-grid-outline @click.stop="(event) => openStandardModal(event.currentTarget)" />
            </MTitle>
            <glyph-content :text-style="standard" />
        </div>
        <template v-else>
            <m-standard :standard="standard" :can-edit="false" @click="(event) => openStandardModal(event.event.currentTarget)">
                <template #subfix>
                    <div
                        class="flex items-center w-40 justify-around"
                    >
                        <i-cosmic-more @click.stop="(event) => openDetaileModal(containerRef, selected)" />
                        <i-cosmic-lock @click.stop="unRef" />
                    </div>
                </template>
            </m-standard>
        </template>
        <m-standard-modal
            v-if="isShowStandardModal"
            title="文字规范"
            :standard-list="standardList"
            :target="standardTarget"
            @cancel="cancelStandardModal"
            @select="(event) => selectStandard(event.data)"
            @show-detail="(event) => openDetaileModal(event.target, event.data)"
        />
        <m-detail-modal
            v-if="isShowDetailModal"
            title="文字规范"
            :target="detailTarget"
            :standard="getDetailEdit()"
            @cancel="cancelDetailModal"
            @ok="saveDetail"
        >
            <div :class="$style['detail-content']">
                <div :class="$style['glyph-content']">
                    <glyph-content :text-style="getDetailEdit()" :show-layout="false" />
                </div>
            </div>
        </m-detail-modal>
    </div>
</template>

<style module>
.detail-content {
    max-height: 400px
}


.glyph-content {
    border-top: solid 1px var(--color-gray-100);
    border-bottom: solid 1px var(--color-gray-100);
}
</style>
