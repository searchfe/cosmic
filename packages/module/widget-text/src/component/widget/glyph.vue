 <script lang="ts" setup>
 import { ref, watchEffect } from 'vue';
 import { inject } from '@cosmic/core/parts';
import { MTitle, MStandard, MStandardModal, MDetailModal, usePropterty, service } from '@cosmic/core/browser';
import GlyphContent from './glyph-content.vue';

withDefaults(defineProps<{
    isStandard: boolean,
    textStyle: object,
    styleList: object[],
    isRepeat: boolean,
}>(), {
    isRepeat: false,
});

const textStyleSevice = inject<service.TextStyleSevice>(service.TOKENS.TextStyle);

const emits = defineEmits(['change', 'selectStyle', 'updateStyle', 'unSelectStyle', 'addStyle']);

const containerRef = ref(null);

const {
    isShowStandardModal,
    isShowDetailModal,
    detailTarget,
    standardTarget,

    cancelStandardModal,
    cancelDetailModal,
    openDetaileModal,
    openStandardModal,
} = usePropterty(service.TOKENS.TextStyle);

let editId = '';

const editStyle = ref();

watchEffect(() => {
    if (isShowDetailModal.value) {
        const style = textStyleSevice.cloneById(editId, false);
        editStyle.value = style;
    }
});

function selectStyle(event: {data: Record<string, string>}) {
    cancelStandardModal(),
    cancelDetailModal(),
    emits('selectStyle', event.data);
}

function editStyleHandler(el: HTMLElement, id: string) {
    editId = id;
    openDetaileModal(el);
}

function updateStyle() {
    cancelDetailModal();
    emits('updateStyle', editStyle.value);
}

function unRef() {
    emits('unSelectStyle');
}

 </script>

<template>
    <div ref="containerRef">
        <div v-if="!isStandard">
            <m-title
                title="字形"
                @on-click="(event) => openStandardModal(event.currentTarget)"
            >
                <i-cosmic-grid-outline :class="[$style.icon, isRepeat ? $style.repeat : '']" />
            </m-title>
            <glyph-content :text-style="textStyle" @change="() => emits('change', textStyle)" />
        </div>
        <template v-else>
            <m-standard :standard="textStyle" :can-edit="false" :is-border="true" @click="(event) => openStandardModal(event.event.currentTarget)">
                <template #subfix>
                    <span class="w-24 h-24 justify-center text-md items-center inline-flex mr-8">
                        <i-cosmic-more @click.stop="(event) => editStyleHandler(containerRef, textStyle.id)" />
                    </span>
                    <span class="w-24 h-24 justify-center text-md items-center inline-flex">
                        <i-cosmic-lock @click.stop="unRef" />
                    </span>
                </template>
            </m-standard>
        </template>
        <m-standard-modal
            v-if="isShowStandardModal"
            title="文字规范"
            :standard-list="styleList"
            :target="standardTarget"
            @add="() => emits('addStyle')"
            @cancel="cancelStandardModal"
            @select="selectStyle"
        />
        <m-detail-modal
            v-if="isShowDetailModal"
            title="文字规范"
            :target="detailTarget"
            :standard="editStyle"
            @cancel="cancelDetailModal"
            @ok="updateStyle"
        >
            <glyph-content :text-style="editStyle" :show-layout="false" />
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

.icon {
    font-size: 1.2rem;
}

.repeat {
    color: var(--color-primary-500);
}
</style>
