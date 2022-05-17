<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import StrokeContent from './stroke-content.vue';
import { MTitle, MStandard, MStandardModal, MDetailModal, usePropterty, service, inject} from '@cosmic/core/browser';

withDefaults(defineProps<{
    isLocalStyle: boolean,
    strokeStyle: object,
    styleList: object[]
}>(), {});

const containerRef = ref(null);

const emits = defineEmits(['change', 'addStyle', 'selectStyle', 'unSelectStyle', 'updateStyle', 'unSelectStyle']);

const strokeStyleSevice = inject<service.StrokeStyleService>(service.TOKENS.StrokeStyle);

const {
        isShowStandardModal,
        isShowDetailModal,
        detailTarget,
        standardTarget,

        cancelStandardModal,
        cancelDetailModal,
        openDetaileModal,
        openStandardModal,
    } = usePropterty(service.TOKENS.StrokeStyle);

let editId = '';

const editStyle = ref();

watchEffect(() => {
    if (isShowDetailModal.value) {
        const style = strokeStyleSevice.cloneById(editId, false);
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

function unRef() {
    emits('unSelectStyle');
}

function updateStyle() {
    cancelDetailModal();
    emits('updateStyle', editStyle.value);
}

</script>



<template>
    <div ref="containerRef">
        <div v-if="isLocalStyle">
            <m-title
                title="描边"
                @on-click="(event) => openStandardModal(event.currentTarget)"
            >
                <i-cosmic-grid-outline />
            </m-title>
            <stroke-content :stroke-style="strokeStyle" @change="(event) => emits('change', event)" />
        </div>
        <template v-else>
            <m-standard :standard="strokeStyle" :is-border="true" :can-edit="false" @click="(event) => openStandardModal(event.event.currentTarget)">
                <template #subfix>
                    <span class="w-24 h-24 justify-center text-md items-center inline-flex mr-8">
                        <i-cosmic-more @click.stop="() => editStyleHandler(containerRef, strokeStyle.id)" />
                    </span>
                    <span class="w-24 h-24 justify-center text-md items-center inline-flex">
                        <i-cosmic-lock @click.stop="unRef" />
                    </span>
                </template>
                <template #prefix>
                    <i-cosmic-square />
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
            @show-detail="(event) => openDetaileModal(event.target, event.data)"
        >
            <template #prefix>
                <i-cosmic-square />
            </template>
        </m-standard-modal>
        <m-detail-modal
            v-if="isShowDetailModal"
            title="文字规范"
            :target="detailTarget"
            :standard="editStyle"
            @cancel="cancelDetailModal"
            @ok="updateStyle"
        >
            <stroke-content :stroke-style="editStyle" />
        </m-detail-modal>
    </div>
</template>

<style module>
.detail-content {
    max-height: 400px
}

.icon {
    font-size: 1.4rem
}

.glyph-content {
    border-top: solid 1px var(--color-gray-100);
    border-bottom: solid 1px var(--color-gray-100);
}
</style>
