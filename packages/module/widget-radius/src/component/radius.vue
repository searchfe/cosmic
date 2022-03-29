<script lang="ts" setup>
import { MTitle, MStandard, MStandardModal, MDetailModal, usePropterty } from '@cosmic/core/browser';
import RadiusContent from './radius-content.vue';
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
    } = usePropterty();

</script>

<template>
    <div>
        <div v-if="!isSelected">
            <MTitle title="边角">
                <i-cosmic-grid-outline @click.stop="(event) => openStandardModal(event.currentTarget)" />
            </MTitle>
            <RadiusContent />
        </div>
        <template v-else>
            <MStandard :standard="selected" :can-edit="false" @click="(event) => openStandardModal(event.event.currentTarget)">
                <template #subfix>
                    <div
                        class="flex items-center w-40 justify-around"
                    >
                        <i-cosmic-more @click.stop="(event) => openDetaileModal(container, selected)" />
                        <i-cosmic-lock @click.stop="unSelectStandard" />
                    </div>
                </template>
            </MStandard>
        </template>

        <MStandardModal
            v-if="isShowStandardModal"
            title="文字规范"
            :standard-list="Standard"
            :target="standardTarget"
            @cancel="cancelStandardModal"
            @select="(event) => selectStandard(event.data)"
            @show-detail="openDetaileModal"
        />
        <MDetailModal
            v-if="isShowDetailModal"
            title="文字规范"
            :target="detailTarget"
            :standard="selected"
            @cancel="cancelDetailModal"
            @ok="cancelDetailModal"
        >
            <div :class="$style['detail-content']">
                <div :class="$style['glyph-content']">
                    <RadiusContent />
                </div>
            </div>
        </MDetailModal>
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



