<script lang="ts" setup>
import { ref } from 'vue';
import StrokeContent from './stroke-content.vue';
import { MTitle, MStandard, MStandardModal, MDetailModal, usePropterty } from '@cosmic/core/browser';
import { Standard } from '../data';

const containerRef = ref(null);

const {
        isShowStandardModal,
        isShowDetailModal,
        isSelected,
        selected,
        detailTarget,
        standardTarget,
        detailEdit,

        cancelStandardModal,
        cancelDetailModal,
        selectStandard,
        openDetaileModal,
        openStandardModal,
        unSelectStandard,
    } = usePropterty();

</script>


<template>
    <div ref="containerRef">
        <div v-if="!isSelected">
            <MTitle title="描边">
                <i-cosmic-grid-outline @click.stop="(event) => openStandardModal(event.currentTarget)" />
            </MTitle>
            <StrokeContent />
        </div>
        <template v-else>
            <m-standard :standard="selected" :can-edit="false" @click="(event) => openStandardModal(event.event.currentTarget)">
                <template #subfix>
                    <div
                        class="flex items-center w-40 justify-around"
                    >
                        <i-cosmic-more @click.stop="() => openDetaileModal(containerRef, selected)" />
                        <i-cosmic-link @click.stop="unSelectStandard" />
                    </div>
                </template>
            </m-standard>
        </template>

        <m-standard-modal
            v-if="isShowStandardModal"
            title="文字规范"
            :standard-list="Standard"
            :target="standardTarget"
            @cancel="cancelStandardModal"
            @select="(event) => selectStandard(event.data)"
            @show-detail="(event) => openDetaileModal(event.target, event.data)"
        />
        <m-detail-modal
            v-if="isShowDetailModal"
            title="文字规范"
            :target="detailTarget"
            :standard="detailEdit"
            @cancel="cancelDetailModal"
            @ok="cancelDetailModal"
        >
            <div :class="$style['detail-content']">
                <div :class="$style['glyph-content']">
                    <StrokeContent />
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
