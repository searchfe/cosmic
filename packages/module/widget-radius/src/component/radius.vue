<script lang="ts" setup>
import { watchEffect, ref } from 'vue';
import { MTitle, MStandard, MStandardModal, MDetailModal, usePropterty, service } from '@cosmic/core/browser';
import RadiusContent from './radius-content.vue';
import { inject } from '@cosmic/core/parts';

const radiusStyleService = inject<service.RadiusStyleService>(service.TOKENS.RadiusStyle);

withDefaults(defineProps<{
    radiusStyle: any,
    styleList: Record<string, string>[],
    isLocalStyle: boolean,
}>(), {});

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


const emits = defineEmits(['change', 'selectStyle', 'updateStyle', 'unSelectStyle', 'addStyle']);

let editId = '';

const editStyle = ref();

const container = ref<HTMLElement>();

watchEffect(() => {
    if (isShowDetailModal.value) {
        const style = radiusStyleService.cloneById(editId, false);
        editStyle.value = style;
    }
});

function updateStyle() {
    cancelDetailModal();
    emits('updateStyle', editStyle.value);
}


function selectStyle(event: {data: Record<string, string>}) {
    cancelStandardModal(),
    cancelDetailModal(),
    emits('selectStyle', event.data);
}

function unRef() {
    emits('unSelectStyle');
}

</script>

<template>
    <div ref="container">
        <div v-if="isLocalStyle">
            <m-title title="边角">
                <i-cosmic-grid-outline :class="$style.icon" @click.stop="(event) => openStandardModal(event.currentTarget)" />
            </m-title>
            <radius-content :radius-style="radiusStyle" @change="() => emits('change', radiusStyle)" />
        </div>
        <template v-else>
            <m-standard :standard="radiusStyle" :can-edit="false" @click="(event) => openStandardModal(event.event.currentTarget)">
                <template #subfix>
                    <div
                        class="flex items-center w-40 justify-around"
                    >
                        <i-cosmic-more @click.stop="(event) => openDetaileModal(container, radiusStyle)" />
                        <i-cosmic-lock @click.stop="unRef" />
                    </div>
                </template>
                <template #prefix>
                    <i-cosmic-linked-square />
                </template>
            </m-standard>
        </template>

        <m-standard-modal
            v-if="isShowStandardModal"
            title="圆角规范"
            :standard-list="styleList"
            :target="standardTarget"
            @cancel="cancelStandardModal"
            @add="() => emits('addStyle')"
            @select="(event) => selectStyle(event)"
            @show-detail="(event) => openDetaileModal(event.target, event.data)"
        >
            <template #prefix>
                <i-cosmic-linked-square />
            </template>
        </m-standard-modal>
        <m-detail-modal
            v-if="isShowDetailModal"
            title="圆角规范"
            :target="detailTarget"
            :standard="editStyle"
            @cancel="cancelDetailModal"
            @ok="updateStyle"
        >
            <div class="my-8">
                <radius-content :radius-style="editStyle" />
            </div>
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
    
}
</style>



