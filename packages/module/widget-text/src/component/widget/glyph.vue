 <script lang="ts" setup>
import { ref, computed } from 'vue';
import { MTitle, MStandard, MStandardModal, MDetailModal, usePropterty, service} from '@cosmic/core/browser';
import GlyphContent from './glyph-content.vue';
import { inject, TextNode } from '@cosmic/core/parts';

const containerRef = ref(null);

const {
        isShowStandardModal,
        isShowDetailModal,
        detailTarget,
        standardTarget,

        getDetailEdit,
        cancelStandardModal,
        cancelDetailModal,
        saveDetail,
        selectStandard,
        openDetaileModal,
        openStandardModal,
        unRef,
        saveStyle,
    } = usePropterty(service.TOKENS.TextStyle);

const textStyleSevice = inject<service.TextStyleSevice>(service.TOKENS.TextStyle);
const nodeService = inject<service.NodeService>(service.TOKENS.Node);

let textNode = nodeService.getSelection().find(item => item.type === 'TEXT') as TextNode;

const styleId = ref(getTextStyle(textNode).id);

const textStyle = computed(() => textStyleSevice.get(styleId.value));

const isStandard = computed(() => !textStyleSevice.isLocalStyle(styleId.value));

const styleList = computed(() => {
    styleId.value;
    return textStyleSevice.getServiceStyles();
});

nodeService.selection.subscribe((nodes) => {    
    const selectNode = nodes.find(item => item.type === 'TEXT');
    if (!selectNode) return;
    getTextStyle(selectNode);
    styleId.value = selectNode.getRangeTextStyleId();
});

function getTextStyle(node: TextNode) {
    if (!node) return {};
    const textStyle = textStyleSevice.get(node.getRangeTextStyleId() ?? Date.now() + '');
    if (node.getRangeTextStyleId() !== textStyle.id) {
        node.setRangeTextStyleId(0, 0, textStyle.id);
    }
    return textStyle;
}

function textChange() {
    const node = nodeService.getSelection().find(item => item.type === 'TEXT') as TextNode;
    const style = textStyleSevice.get(node.getRangeTextStyleId());
    node.setRangeFontSize(0, 0, style.fontSize);
    nodeService.update([node]);
}

 </script>

<template>
    <div ref="containerRef">
        <div v-if="!isStandard">
            <MTitle title="字形">
                <i-cosmic-grid-outline @click.stop="(event) => openStandardModal(event.currentTarget)" />
            </MTitle>
            <glyph-content :text-style="textStyle" @change="textChange" />
        </div>
        <template v-else>
            <m-standard :standard="textStyle" :can-edit="false" @click="(event) => openStandardModal(event.event.currentTarget)">
                <template #subfix>
                    <div
                        class="flex items-center w-40 justify-around"
                    >
                        <i-cosmic-more @click.stop="(event) => openDetaileModal(containerRef, selected)" />
                        <i-cosmic-lock @click.stop="unRef" />
                    </div>
                </template>
            </m-standard>
        </template>
        <m-standard-modal
            v-if="isShowStandardModal"
            title="文字规范"
            :standard-list="styleList"
            :target="standardTarget"
            @add="() => saveStyle(styleId)"
            @cancel="cancelStandardModal"
            @select="(event) => selectStandard(event.data)"
            @show-detail="(event) => openDetaileModal(event.target, event.data)"
        />
        <m-detail-modal
            v-if="isShowDetailModal"
            title="文字规范"
            :target="detailTarget"
            :standard="getDetailEdit()"
            @cancel="cancelDetailModal"
            @ok="saveDetail"
        >
            <div :class="$style['detail-content']">
                <div :class="$style['glyph-content']">
                    <glyph-content :text-style="getDetailEdit()" :show-layout="false" />
                </div>
            </div>
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
</style>
