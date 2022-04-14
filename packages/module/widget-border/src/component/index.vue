<script lang="ts" setup>
import { ref, computed, watchEffect } from 'vue';
import { MTitle, MWidget, MClolorWidget, service} from '@cosmic/core/browser';
import { inject, FrameNode, hasMixin, MinimalStrokesMixin, BaseNodeMixin, TextNode, FillStyle, StrokeStyle } from '@cosmic/core/parts';
import Stroke from './stroke.vue';

const isShowDetail = ref(false);

const strokeStyleSevice = inject<service.StrokeStyleService>(service.TOKENS.StrokeStyle);
const fillStyleService = inject<service.FillStyleService>(service.TOKENS.FillStyle);
const nodeService = inject<service.NodeService>(service.TOKENS.Node);

let strokeNode = nodeService.getSelection().find(item => hasMixin(item, MinimalStrokesMixin)) as TextNode | FrameNode;

const strokeId = ref(getStrokeStyle(strokeNode).id);


const isLocalStyle = computed(() => strokeStyleSevice.isLocalStyle(strokeId.value));

const strokeStyle = computed(() => strokeStyleSevice.get(strokeId.value));

const strokeStyleList = ref(strokeStyleSevice.getServiceStyles());

const fillStyleId = ref(getFillStyle(strokeNode)?.id);

const fillStyle = ref();

const isLocalFillStyle = ref(false);

const fillStyleList = ref(fillStyleService.getServiceStyles());

watchEffect(() =>  {
    const id = fillStyleId.value as string;
    resetFillStyle(id);
    isLocalFillStyle.value = fillStyleService.isLocalStyle(id);
});

nodeService.selection.subscribe((nodes) => {    
    const selectNode = nodes.find(item => hasMixin(item, MinimalStrokesMixin)) as TextNode | FrameNode;
    if (!selectNode) return;
    getStrokeStyle(selectNode);
    getFillStyle(selectNode);
    strokeId.value = selectNode.strokeId;
    fillStyleId.value = selectNode.strokeStyleId;
});

strokeStyleSevice.subject.subscribe(source => {
    const  { type, data } = source;
    strokeStyleList.value = strokeStyleSevice.getServiceStyles();
    switch(type) {
        case 'C':
        case 'U':
            selectStyle({id: data as string});
            styleChange(data as string);
    }
});


fillStyleService.subject.subscribe((source: any) => {
    const  { type, data } = source;
    fillStyleList.value = fillStyleService.getServiceStyles();
    switch(type) {
        case 'C':
        case 'U':
            selectFillStyle({id: data as string});
            resetFillStyle(data as string);
    }

});

const clickHandler = () => {
    isShowDetail.value = !isShowDetail.value;
};

function getStrokeStyle(node: TextNode | FrameNode) {
    if (!node) return {} as TextNode | FrameNode;
    const strokeStyle = strokeStyleSevice.get((node as any).strokeId || Date.now() + '');
    if ((node as any).strokeId !== strokeStyle.id) {
        (node as any).strokeId = strokeStyle.id;
    }
    return strokeStyle;
}

function styleChange() {
    const style = strokeStyleSevice.get(strokeNode.strokeId);
    strokeNode.strokeWeight = Number(style.strokeWeight);
    strokeNode.strokeLineStyle = style.style;
    if (hasMixin(strokeNode, BaseNodeMixin)) {
        strokeNode.update();
    }
}

function saveStrokeStyle() {
    strokeStyleSevice.saveStyle(strokeId.value);
}

function selectStyle(data: {id: string}) {
    strokeId.value = data.id;
    strokeNode.strokeId = data.id; 
    styleChange();
}

function updateStyle(style: StrokeStyle) {
    strokeStyleSevice.updateStyle(style);
}

function unSelectStyle() {
    const textStyle = strokeStyleSevice.cloneById(strokeId.value);
    strokeStyleSevice.addLocalStyle(textStyle);
    selectStyle({id: textStyle.id});
} 

function getFillStyle(node: TextNode | FrameNode ) {
    if (!node) return;
    const fillStyle = fillStyleService.get(node.strokeStyleId ?? Date.now() + '');
    if (node.strokeStyleId !== fillStyle.id) {
        node.strokeStyleId = fillStyle.id;
    }
    return fillStyle;
}

function fillChage() {
    const node = nodeService.getSelection().find(item => hasMixin(item, MinimalStrokesMixin)) as MinimalStrokesMixin;
    const style = fillStyleService.get(node.strokeStyleId);
    node.strokes = [style];
    if (hasMixin(node, BaseNodeMixin)) {
        node.update();
    }
}

function resetFillStyle(id: string) {
    fillStyle.value = fillStyleService.get(id);
}

function selectFillStyle(data: {id: string}) {
    fillStyleId.value = data.id;
    strokeNode.strokeStyleId = data.id;
    fillChage();
}

function unFillSelectStyle() {
    const cloneStyle = fillStyleService.cloneById(fillStyleId.value as string);
    fillStyleService.addLocalStyle(cloneStyle);
    selectFillStyle({id: cloneStyle.id});
}

function saveFillStyle() {
    fillStyleService.saveStyle(fillStyleId.value as string);
}

function updateFillStyle(style: FillStyle) {
    fillStyleService.updateStyle(style);
}


</script>

<template>
    <div>
        <m-widget>
            <m-title title="边框">
                <i-cosmic-plus
                    v-if="!isShowDetail"
                    @click="clickHandler"
                />
                <i-cosmic-minus
                    v-else
                    @click="clickHandler"
                />
            </m-title>
            <div v-if="isShowDetail" :class="$style.detail">
                <Stroke 
                    :is-local-style="isLocalStyle"
                    :stroke-style="strokeStyle" 
                    :style-list="strokeStyleList"
                    @add-style="saveStrokeStyle"
                    @update-style="updateStyle"
                    @select-style="selectStyle"
                    @change="styleChange" 
                    @un-select-style="unSelectStyle"
                />
                <m-clolor-widget 
                    :is-local-style="isLocalFillStyle"
                    :fill-style="fillStyle"
                    :style-list="fillStyleList"
                    @add-style="saveFillStyle"
                    @change="fillChage"
                    @select-style="selectFillStyle"
                    @update-style="updateFillStyle"
                    @un-select-style="unFillSelectStyle"
                />
            </div>
        </m-widget>
    </div>
</template>

<style module>
.icon {
    font-size: 1.4rem
}
.row {
    margin: var(--margin-md) 0;
}

.detail {
    margin-bottom: .8rem;
}
</style>