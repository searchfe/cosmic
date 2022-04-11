<script lang="ts" setup>
import { ref, computed } from 'vue';
import { MTitle, MWidget, MClolorWidget, service} from '@cosmic/core/browser';
import { inject, TextNode, hasMixin, MinimalStrokesMixin } from '@cosmic/core/parts';
import Stroke from './stroke.vue';
import { Standard } from '../data';

const isShowDetail = ref(false);

const strokeStyleSevice = inject<service.StrokeStyleService>(service.TOKENS.StrokeStyle);
const fillStyleService = inject<service.FillStyleService>(service.TOKENS.FillStyle);
const nodeService = inject<service.NodeService>(service.TOKENS.Node);

let strokeNode = nodeService.getSelection().find(item => hasMixin(item, MinimalStrokesMixin));

const strokeId = ref(getStrokeStyle(strokeNode).id);

const strokeStyleId = ref(getFillStyle(strokeNode).id);

const isLocalStyle = computed(() => strokeStyleSevice.isLocalStyle(strokeId.value));

const strokeStyle = computed(() => strokeStyleSevice.get(strokeId.value));

const fillStyle = computed(() => {
    console.log(1212212);
    return fillStyleService.get(strokeStyleId.value);
});

const isLocalFillStyle = computed(() => fillStyleService.isLocalStyle(strokeStyleId.value));

nodeService.selection.subscribe((nodes) => {    
    const selectNode = nodes.find(item => hasMixin(item, MinimalStrokesMixin));
    if (!selectNode) return;
    getStrokeStyle(selectNode);
    getFillStyle(selectNode);
    console.log(selectNode);
    strokeId.value = selectNode.strokeId;
    strokeStyleId.value = selectNode.strokeStyleId;
});

const clickHandler = () => {
    isShowDetail.value = !isShowDetail.value;
};

function getStrokeStyle(node) {
    if (!node) return {};
    const strokeStyle = strokeStyleSevice.get(node.strokeId || Date.now() + '');
    if (node.strokeId !== strokeStyle.id) {
        node.strokeId = strokeStyle.id;
    }
    return strokeStyle;
}

function getFillStyle(node: TextNode) {
    if (!node) return;
    const fillStyle = fillStyleService.get(node.strokeStyleId ?? Date.now() + '');
    if (node.strokeStyleId !== fillStyle.id) {
        node.strokeStyleId = fillStyle.id;
    }
    return fillStyle;
}

function styleChange() {
    const node = nodeService.getSelection().find(item => hasMixin(item, MinimalStrokesMixin)) as MinimalStrokesMixin;
    const style = strokeStyleSevice.get(node.strokeId);
    node.strokeWeight = style.strokeWeight;
    node.dashPattern = style.dashPattern;
    nodeService.update([node]);
}

function fillChage() {
    const node = nodeService.getSelection().find(item => hasMixin(item, MinimalStrokesMixin)) as MinimalStrokesMixin;
    const style = fillStyleService.get(node.strokeStyleId);
    console.log(style);
    node.strokes = [style];
    nodeService.update([node]);
}

</script>

<template>
    <div>
        <MWidget>
            <MTitle title="边框">
                <i-cosmic-plus
                    v-if="!isShowDetail"
                    @click="clickHandler"
                />
                <i-cosmic-minus
                    v-else
                    @click="clickHandler"
                />
            </MTitle>
            <div v-if="isShowDetail" :class="$style.detail">
                <Stroke :is-local-style="isLocalStyle" :stroke-style="strokeStyle" @change="styleChange" />
                <m-clolor-widget 
                    :standard-list="Standard" 
                    :is-local-style="isLocalFillStyle"
                    :fill-style="fillStyle"
                    @change="fillChage" 
                />
            </div>
        </MWidget>
    </div>
</template>

<style module>
.icon {
    font-size: var(--font-md)
}
.row {
    margin: var(--margin-md) 0;
}

.detail {
    composes: -v-py sm from global;
}
</style>