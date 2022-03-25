<script lang="ts" setup>
import {MTitle, MClolorWidget, MStandard, MStandardModal, MDetailModal, useAtom} from '@cosmic/core/browser';
import InputList from './input-list.vue';

import {Standard, InputValue, SelectValue, SelectList} from '../data';

defineProps({
    insetTitle: {
        type: String,
        default: '',
    },
});

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
            <MTitle aria-label="效果属性" title="效果">
                <i-cosmic-grid-outline
                    class="-v-bg-inapparent"
                    @click.stop="(event) => openStandardModal(event.currentTarget)"
                />
            </MTitle>
            <InputList @onInput="onInput" />
        </div>
        <template v-else>
            <MStandard
                aria-label="选中效果"
                classes="-v-bg-inapparent"
                :standard="selected"
                :can-edit="false"
                @click="(event) => openStandardModal(event.event.currentTarget)"
            >
                <template #prefix>
                    <div
                        :class="[$style['demo'], 'w-20 h-20']"
                        :style="selected?.style"
                    />
                </template>
                <template #subfix>
                    <div
                        class="flex items-center w-40 justify-around"
                    >
                        <i-cosmic-more @click.stop="(event) => openDetaileModal(container)" />
                        <i-cosmic-lock @click.stop="unSelectStandard" />
                    </div>
                </template>
            </MStandard>
        </template>

        <MStandardModal
            v-if="isShowStandardModal"
            aria-label="阴影规范"
            :title="insetTitle + '规范'"
            :standard-list="Standard"
            :input-value="InputValue"
            :select-value="SelectValue"
            :select-list="SelectList"
            :target="standardTarget"
            @cancel="cancelStandardModal"
            @select="(event) => selectStandard(event.data)"
            @show-detail="openDetaileModal"
        >
            <template #prefix="standard">
                <div
                    :class="[$style['demo'], 'w-20 h-20']"
                    :style="standard?.standard?.style"
                />
            </template>
        </MStandardModal>
        <MDetailModal
            v-if="isShowDetailModal"
            aria-label="编辑阴影规范"
            :title="'编辑' + insetTitle + '规范'"
            :target="detailTarget"
            @cancel="cancelDetailModal"
        >
            <div :class="$style['detail-content']">
                <div :class="$style['glyph-content']">
                    <InputList @onInput="onInput" />
                </div>
            </div>
        </MDetailModal>

        <div aria-label="颜色" :class="[$style['padding-bottom']]">
            <MClolorWidget :standard-list="Standard" />
        </div>
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

.demo {
    background-color: var(--color-white);
}

.padding-bottom {
    padding-bottom: var(--padding-md);
}
</style>
