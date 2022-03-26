<script lang="ts" setup>
import StrokeContent from './stroke-content.vue';
import { MTitle, MStandard, MStandardModal, useAtom } from '@cosmic/core/browser';
import { Standard } from '../data';


const {
        isShowStandardModal,
        isShowDetailModal,
        isSelected,
        selected,
        detailTarget,
        standardTarget,

        cancelStandardModal,
        cancelDetailModal,
        selectStandard,
        openDetaileModal,
        openStandardModal,
        unSelectStandard,
    } = useAtom({property: {}});

</script>


<template>
    <div>
        <div v-if="!isSelected">
            <MTitle title="描边">
                <i-cosmic-grid-outline @click.stop="(event) => openStandardModal(event.currentTarget)" />
            </MTitle>
            <StrokeContent />
        </div>
        <template v-else>
            <MStandard :standard="selected" :can-edit="false" @click="(event) => openStandardModal(event.event.currentTarget)">
                <template #subfix>
                    <div
                        class="flex items-center w-40 justify-around"
                    >
                        <i-cosmic-more @click.stop="(event) => openDetaileModal(container, selected)" />
                        <i-cosmic-link @click.stop="unSelectStandard" />
                    </div>
                </template>
            </MStandard>
        </template>

        <m-standard-modal
            v-if="isShowStandardModal"
            title="文字规范"
            :standard-list="Standard"
            :target="standardTarget"
            @cancel="cancelStandardModal"
            @select="(event) => selectStandard(event.data)"
            @show-detail="openDetaileModal"
        />
        <m-detail-msodal
            v-if="isShowDetailModal"
            title="文字规范"
            :target="detailTarget"
            :standard="selected"
            @cancel="cancelDetailModal"
            @ok="cancelDetailModal"
        >
            <div :class="$style['detail-content']">
                <div :class="$style['glyph-content']">
                    <StrokeContent />
                </div>
            </div>
        </m-detail-msodal>
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
