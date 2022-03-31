<script lang="ts" setup>
import {ref} from 'vue';
import {MTitle, MClolorWidget, MStandard, MStandardModal, MDetailModal, usePropterty, service} from '@cosmic/core/browser';
import InputList from './input-list.vue';


defineProps({
    insetTitle: {
        type: String,
        default: '',
    },
});

const container = ref(null);

const {
    isShowStandardModal,
    isShowDetailModal,
    isStandard,
    standard,
    standardList,
    detailTarget,
    standardTarget,

    cancelStandardModal,
    cancelDetailModal,
    selectStandard,
    openDetaileModal,
    openStandardModal,
    getDetailEdit,
    unRef,
    saveDetail,
} = usePropterty(service.TOKENS.EffectStyle);

</script>

<template>
    <div ref="container">
        <div v-if="!isStandard">
            <m-title aria-label="效果属性" title="效果">
                <i-cosmic-grid-outline
                    class="-v-bg-inapparent"
                    @click.stop="(event) => openStandardModal(event.currentTarget)"
                />
            </m-title>
            <input-list :effect-style="standard" />
        </div>
        <template v-else>
            <MStandard
                aria-label="选中效果"
                classes="-v-bg-inapparent"
                :class="[$style['border']]"
                :standard="standard"
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
                        <i-cosmic-more @click.stop="(event) => openDetaileModal(container, selected)" />
                        <i-cosmic-lock @click.stop="unRef" />
                    </div>
                </template>
            </MStandard>
        </template>

        <m-standard-modal
            v-if="isShowStandardModal"
            aria-label="阴影规范"
            :title="insetTitle + '规范'"
            :standard-list="standardList"
            :target="standardTarget"
            @cancel="cancelStandardModal"
            @select="(event) => selectStandard(event.data)"
            @show-detail="(event) => openDetaileModal(event.target, event.data)"
        >
            <template #prefix="data">
                <div
                    :class="[$style['demo'], 'w-20 h-20']"
                    :style="data?.standard?.style"
                />
            </template>
        </m-standard-modal>
        <m-detail-modal
            v-if="isShowDetailModal"
            aria-label="编辑阴影规范"
            :title="'编辑' + insetTitle + '规范'"
            :target="detailTarget"
            :standard="getDetailEdit()"
            @cancel="cancelDetailModal"
            @ok="saveDetail"
        >
            <div :class="$style['detail-content']">
                <div :class="$style['glyph-content']">
                    <input-list :effect-style="getDetailEdit()" />
                </div>
            </div>
        </m-detail-modal>

        <div aria-label="颜色" :class="[$style['padding-bottom']]">
            <m-clolor-widget />
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
