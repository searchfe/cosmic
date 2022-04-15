<script lang="ts" setup>
import { ref, watchEffect, toRaw } from 'vue';
import MTitle from '../title/title.vue';
import MColor from './color.vue';
import MStandard from '../standard/standard.vue';
import MStandardModal from '../modal/standard-modal.vue';
import MDetailModal from '../modal/detail-modal.vue';
import { usePropterty } from '../../use/use-property';
import { service } from '@cosmic/core/browser';
 import { inject } from '@cosmic/core/parts';

const props = withDefaults(defineProps<{
    type?: string | string[],
    showTitle?: boolean,
    isLocalStyle: boolean,
    fillStyle: object,
    styleList: object[],
    isRepeat: boolean
}>(), {
    type: 'TEXT',
    showTitle: true,
});

const fillStyleService = inject<service.FillStyleService>(service.TOKENS.FillStyle);

const emits = defineEmits(['change', 'selectStyle', 'updateStyle', 'unSelectStyle', 'addStyle']);

const content = ref(null);

let editId = '';

const editStyle = ref();

const {
    isShowStandardModal,
    isShowDetailModal,
    detailTarget,
    standardTarget,

    cancelStandardModal,
    cancelDetailModal,
    openDetaileModal,
    openStandardModal,
} = usePropterty(service.TOKENS.FillStyle);

watchEffect(() => {
    if (isShowDetailModal.value) {
        const style = fillStyleService.cloneById(editId, false);
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
    <div class="w-full">
        <div ref="content">
            <div
                v-if="isLocalStyle" 
            >
                <m-title
                    v-if="showTitle"
                    :coustom-icon="true"
                    title="颜色"
                >
                    <span
                        class="flex justify-between items-center"
                    >
                        <span
                            :class="$style.icon"
                            class="mr-8"
                        >
                            <i-cosmic-sun />
                        </span>
                        <span 
                            :class="[$style.icon, isRepeat ? $style.repeat : '']"
                            @click.stop="(event) => openStandardModal(event.target)"
                        >
                            <i-cosmic-grid-outline />
                        </span>
                        
                    </span>
                </m-title>
                <m-color
                    :color-style="fillStyle"
                    @on-change="() => emits('change')"
                />
            </div>
            <m-standard
                v-else
                classes="-v-bg-inapparent"
                :is-border="true"
                :standard="fillStyle"
                :can-edit="false"
                @click="(event) => editStyleHandler(content, fillStyle)"
            >
                <!-- demo 样式 -->
                <template #prefix="data">
                    <div :class="[$style['demo'], 'flex']">
                        <div
                            :class="[$style['demo-item'], 'flex items-center align-center']"
                            :style="{backgroundColor: `rgba(${data.standard?.color?.r}, ${data.standard?.color?.g}, ${data.standard?.color?.b}, 1)`}"
                        />
                    </div>
                </template>
                <template #subfix>
                    <span class="w-24 h-24 justify-center text-md items-center inline-flex mr-8">
                        <i-cosmic-more @click.stop="() => editStyleHandler(content, fillStyle.id)" />
                    </span>
                    <span class="w-24 h-24 justify-center text-md items-center inline-flex">
                        <i-cosmic-lock @click.stop="unRef" />
                    </span>
                </template>
            </m-standard>
        </div>
    </div>

    <m-standard-modal
        v-if="isShowStandardModal"
        title="颜色"
        :standard-list="styleList"
        :target="standardTarget"
        @add="() => emits('addStyle')"
        @cancel="cancelStandardModal"
        @select="selectStyle"
    >
        <!-- demo 样式 -->
        <template #prefix="data">
            <div :class="[$style['demo'], 'flex']">
                <div
                    :class="[$style['demo-item'], 'flex items-center align-center']"
                    :style="{backgroundColor: `rgba(${data.standard.color.r}, ${data.standard?.color?.g}, ${data.standard?.color?.b}, 1)`}"
                    @mouseover="text(data)"
                >
                    <i-cosmic-question v-if="!data.standard?.color" />
                </div>
            </div>
        </template>
    </m-standard-modal>
    <m-detail-modal
        v-if="isShowDetailModal"
        title="颜色"
        :target="detailTarget"
        :standard="editStyle"
        @cancel="cancelDetailModal"
        @ok="updateStyle"
    >
        <div :class="$style['color-content']">
            <m-color :color-style="editStyle" />
        </div>
    </m-detail-modal>
</template>

<style module>
.color-content {
    composes: -v-py w-full md from global;
    max-height: 400px
}

.icon {
    composes: w-24 h-24 inline-flex items-center justify-center -v-bg-inapparent from global;
    border-radius: .4rem;
    font-size: 1.2rem;
}

.repeat {
    color: blue;
}

.demo {
    width: 100%;
    height: 100%;
}

.demo-item {
    flex: 1;
    flex-shrink: 0;
    font-size: var(--font-sm)
}
</style>
