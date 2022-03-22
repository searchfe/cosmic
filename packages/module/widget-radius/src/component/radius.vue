<script lang="ts" setup>
import { MTitle, MStandard, MStandardModal, MDetailModal, useAtom } from '@cosmic/core/browser';
import RadiusContent from './radius-content.vue';
import { Standard } from '../data';

const { 
        isShowStandardModal,
        isShowDetailModal,
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
        <div v-if="!selected">   
            <MTitle title="边角">
                <i-cosmic-grid-outline @click.stop="(event) => openStandardModal(event.currentTarget)" />
            </MTitle>
            <RadiusContent />
        </div>
        <template v-else>
            <MStandard :standard="selected" :can-edit="false" @click="(event) => openStandardModal(event.event.currentTarget)">
                <template #subfix>
                    <div
                        class="flex items-center w-40 justify-between"
                    >
                        <i-cosmic-more @click.stop="(event) => openDetaileModal(container)" />
                        <i-cosmic-link @click.stop="unSelectStandard" />
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
            @cancel="cancelDetailModal"
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
    width: 20vw;
    max-height: 400px
}


.glyph-content {
    border-top: solid 1px var(--color-gray-100);
    border-bottom: solid 1px var(--color-gray-100);
}
</style>



