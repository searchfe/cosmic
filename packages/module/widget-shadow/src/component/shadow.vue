<script lang="ts" setup>
import { ref, computed, watchEffect } from 'vue';
import { MTitle, MStandard, MStandardModal, MDetailModal, usePropterty, service } from '@cosmic/core/browser';
import { inject } from '@cosmic/core/parts';
import InputList from './input-list.vue';

const effectStyleSevice = inject<service.EffectStyleService>(service.TOKENS.EffectStyle);

const emits = defineEmits(['change', 'addStyle', 'selectStyle', 'unSelectStyle', 'updateStyle', 'unSelectStyle']);

const props = withDefaults(defineProps<{
    insetTitle: string;
    isLocalStyle: boolean,
    shadowStyle: any,
    styleList: object[],

}>(), {});

const container = ref(null);

const {
    isShowStandardModal,
    isShowDetailModal,
    detailTarget,
    standardTarget,

    cancelStandardModal,
    cancelDetailModal,
    openDetaileModal,
    openStandardModal,
} = usePropterty();

let editId = '';

const editStyle = ref();

function editStyleHandler(el: HTMLElement, id: string) {
    editId = id;
    openDetaileModal(el);
}

watchEffect(() => {
    if (isShowDetailModal.value) {
        const style = effectStyleSevice.cloneById(editId, false);
        console.log(style);
        editStyle.value = style;
    }
});


const effectStyle = computed(() => props.shadowStyle && props.shadowStyle.effects ? props.shadowStyle && props.shadowStyle.effects[0] : {});

function selectStyle(event: {data: Record<string, string>}) {
    cancelStandardModal(),
    cancelDetailModal(),
    emits('selectStyle', event.data);
}

function unRef() {
    emits('unSelectStyle');
}

function updateStyle() {
    cancelDetailModal();
    emits('updateStyle', editStyle.value);
}


</script>

<template>
    <div ref="container">
        <div v-if="isLocalStyle">
            <m-title
                aria-label="效果属性"
                title="效果"
                @on-click="(event) => openStandardModal(event.currentTarget)"
            >
                <i-cosmic-grid-outline
                    :class="$style.icon"
                    class="-v-bg-inapparent"
                />
            </m-title>
            <input-list :effect-style="effectStyle" @change="() => emits('change', shadowStyle)" />
        </div>
        <template v-else>
            <MStandard
                aria-label="选中效果"
                classes="-v-bg-inapparent"
                :class="[$style['border']]"
                :standard="shadowStyle"
                :can-edit="false"
                @click="(event) => openStandardModal(event.event.currentTarget)"
            >
                <template #prefix>
                    <div
                        :class="[$style['demo'], 'w-20 h-20']"
                        :style="shadowStyle?.style"
                    />
                </template>
                <template #subfix>
                    <div
                        class="flex items-center w-40 justify-around"
                    >
                        <i-cosmic-more @click.stop="(event) => editStyleHandler(container, shadowStyle.id)" />
                        <i-cosmic-lock @click.stop="unRef" />
                    </div>
                </template>
            </MStandard>
        </template>

        <m-standard-modal
            v-if="isShowStandardModal"
            aria-label="阴影规范"
            :title="insetTitle + '规范'"
            :standard-list="styleList"
            :target="standardTarget"
            @add="() => emits('addStyle')"
            @cancel="cancelStandardModal"
            @select="selectStyle"
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
            :standard="editStyle"
            @cancel="cancelDetailModal"
            @ok="updateStyle"
        >
            <input-list :effect-style="editStyle.effects[0]" />
        </m-detail-modal>
    </div>
</template>

<style module>
.detail-content {
    max-height: 400px
}


.icon {
    font-size: 1.2rem;
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
