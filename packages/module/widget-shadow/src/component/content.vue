<script lang="ts" setup>
import { ref, computed } from 'vue';
import {MTitle, MClolorWidget, MStandard, MStandardModal, MDetailModal, usePropterty, service} from '@cosmic/core/browser';
import { inject, TextNode, hasMixin, BlendMixin, BaseNodeMixin } from '@cosmic/core/parts';
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

const effectStyleSevice = inject<service.EffectStyleService>(service.TOKENS.EffectStyle);
const fillStyleService = inject<service.FillStyleService>(service.TOKENS.FillStyle);
const nodeService = inject<service.NodeService>(service.TOKENS.Node);

let effectNode = nodeService.getSelection().find(item => hasMixin(item, BlendMixin));

const effectId = ref(getEffectStyle(effectNode).id);

const effectStrokeStyleId = ref(getFillStyle(effectNode).id);

const fillStyle = computed(() => fillStyleService.get(effectStrokeStyleId.value));

const isLocalFillStyle = computed(() => fillStyleService.isLocalStyle(effectStrokeStyleId.value));


const isLocalStyle = computed(() => effectStyleSevice.isLocalStyle(effectId.value));

nodeService.selection.subscribe((nodes) => {    
    const selectNode = nodes.find(item => hasMixin(item, MinimalStrokesMixin));
    if (!selectNode) return;
    getEffectStyle(selectNode);
    getFillStyle(selectNode);
    effectId.value = selectNode.strokeId;
    effectStrokeStyleId.value = selectNode.strokeStyleId;
});

const effectStyle = computed(() => {
    const effectStyle = effectStyleSevice.get(effectId.value);
    return effectStyle ? effectStyle.effects[0] : {};
});

function getEffectStyle(node: BlendMixin) {
    if (!node) return {};
    const effectStyle = effectStyleSevice.get(node.effectStyleId || Date.now() + '');
    if (node.effectStyleId !== effectStyle.id) {
        node.effectStyleId = effectStyle.id;
    }
    return effectStyle;
}

function getFillStyle(node: TextNode) {
    if (!node) return;
    const fillStyle = fillStyleService.get(node.effectStrokeStyleId ?? Date.now() + '');
    if (node.effectStrokeStyleId !== fillStyle.id) {
        node.effectStrokeStyleId = fillStyle.id;
    }
    return fillStyle;
}

function effectChange() {
    let effectNode = nodeService.getSelection().find(item => hasMixin(item, BlendMixin)) as BlendMixin;
    const style = effectStyleSevice.get(effectId.value).effects[0];
    effectNode.effects = [style];
    if (hasMixin(effectNode, BaseNodeMixin)) {
        effectNode.update();
    }
}

function fillChage() {
    console.log(1212);
    const node = nodeService.getSelection().find(item => hasMixin(item, BlendMixin)) as any;
    const style = fillStyleService.get(node.effectStrokeStyleId);
    node.effectStrokes = [style];
    if (hasMixin(node, BaseNodeMixin)) {
        node.update();
    }
}

</script>

<template>
    <div ref="container">
        <div v-if="isLocalStyle">
            <m-title aria-label="效果属性" title="效果">
                <i-cosmic-grid-outline
                    :class="$style.icon"
                    class="-v-bg-inapparent"
                    @click.stop="(event) => openStandardModal(event.currentTarget)"
                />
            </m-title>
            <input-list :effect-style="effectStyle" @change="effectChange" />
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
            <m-clolor-widget 
                :standard-list="Standard" 
                :is-local-style="isLocalFillStyle"
                :fill-style="fillStyle"
                @change="fillChage" 
            />
        </div>
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
