<script lang="ts" setup>
import {ref} from 'vue';
import { MClolorWidget, service, inject } from '@cosmic/core/browser';
import { FrameNode, SolidPaint, hasMixin, CornerMixin, BaseNodeMixin, util } from '@cosmic/core/parts';
import { type Subject } from '@cosmic/core/rxjs';
import Raduis from './radius.vue';

const RADIUS_STYLE_ID = 'radiusStyleId';
const BACKGROUN_STYLE_ID = 'backgroundStyleId';

const radiusStyleService = inject<service.RadiusStyleService>(service.TOKENS.RadiusStyle);
const nodeService = inject<service.NodeService>(service.TOKENS.Node);
const fillStyleService = inject<service.FillStyleService>(service.TOKENS.FillStyle);

let radiusNode = nodeService.getSelection().find(item => hasMixin(item, CornerMixin)) as FrameNode;
let subject: Subject<BaseNodeMixin>;

const radiusStyle = ref<Internal.RectangleCornerMixin>();

const isLocalStyle = ref<boolean>(!radiusNode.getPluginData(RADIUS_STYLE_ID));

const radiusStyleList = ref(radiusStyleService.getServiceStyles());

const fillStyle = ref<Partial<Internal.SolidPaint>>();

const fillStyleList = ref(fillStyleService.getServiceStyles());

const isFillLocalStyle = ref<boolean>(!radiusNode.getPluginData(BACKGROUN_STYLE_ID));

nodeService.selection.subscribe(nodes => {
    radiusNode = nodes.find(item => hasMixin(item, CornerMixin)) as FrameNode;
    if (!radiusNode) return;
    watchNode(radiusNode);
});

radiusStyleService.subject.subscribe((res: service.SubjectSourceType) => {
    radiusStyleList.value = radiusStyleService.getServiceStyles();
    const { type, data } = res;
    switch(type) {
        case 'C':
            radiusNode.setPluginData(RADIUS_STYLE_ID, data);
            break;
        case 'U':
            if (radiusNode.getPluginData(RADIUS_STYLE_ID) === data) {
                changeRadiusStyle(radiusStyleService.get(data as string) as any);
            }
            break;
    }
});

fillStyleService.subject.subscribe((res: service.SubjectSourceType) => {
    fillStyleList.value = fillStyleService.getServiceStyles();
    const { type, data } = res;
    switch(type) {
        case 'C':
            radiusNode.setPluginData(BACKGROUN_STYLE_ID, data);
            break;
        case 'U':
            if (radiusNode.getPluginData(BACKGROUN_STYLE_ID) === data) {
                fillChangeStyle(fillStyleService.get(data as string) as any);
            }
    }
});

// 创建监控
watchNode(radiusNode);

function resetRadius(node: FrameNode) {
    if (!node) return;
    if (node.getPluginData(RADIUS_STYLE_ID)) {
        isLocalStyle.value = false;
        radiusStyle.value = radiusStyleService.cloneById(node.getPluginData(RADIUS_STYLE_ID), false);
        console.log(radiusStyle.value);
    } else {
        isLocalStyle.value = true;
        radiusStyle.value = util.transformCornerFromNode(node);
    }
}

function resetBackgroundStyle(node: FrameNode) {
    if (!node) return;
    if (node.getPluginData(BACKGROUN_STYLE_ID)) {
        isFillLocalStyle.value = false;
        fillStyle.value = fillStyleService.cloneById(node.getPluginData(BACKGROUN_STYLE_ID), false);
    } else {
        isFillLocalStyle.value = true;
        fillStyle.value = util.transformBackgroundFormNode(node);
    }
}

function watchNode(node: FrameNode) {
    if (!node) return;
    nodeService.unwatch(subject);
    subject = nodeService.watch(node);
    subject.subscribe(() => {
        resetRadius(radiusNode);
        resetBackgroundStyle(radiusNode);
    });
    resetRadius(radiusNode);
    resetBackgroundStyle(radiusNode);
}

function changeRadiusStyle(data: Internal.RectangleCornerMixin) {
    radiusNode.topLeftRadius = data.topLeftRadius;
    radiusNode.topRightRadius = data.topRightRadius;
    radiusNode.bottomLeftRadius = data.bottomLeftRadius;
    radiusNode.bottomRightRadius = data.bottomRightRadius;
    radiusNode.update();
}

function selectRadiusStyle(data: {id: string}) {
    radiusNode.setPluginData(RADIUS_STYLE_ID, data.id);
    changeRadiusStyle(radiusStyleService.cloneById(data.id, false));
}

function unSelectRadiusStyle() {
    radiusNode.setPluginData(RADIUS_STYLE_ID, void 0);
    radiusNode.update();
}

function updateRadiusStyle(radius: Internal.RectangleCornerMixin & {name: string, id: string}) {
    radiusStyleService.updateStyle(radius);
}

function saveRadiusStyle(radius: Internal.RectangleCornerMixin) {
    radiusStyleService.saveStyle(radius);
}

function fillChangeStyle(data: Partial<Internal.SolidPaint>) {
    const { opacity, color } = data;
    const solidPaint = new SolidPaint();
    solidPaint.opacity = opacity;
    solidPaint.color = color as Internal.RGB;
    radiusNode.backgrounds = [solidPaint];
    radiusNode.update();
}

function selectFillStyle(data: {id: string}) {
    console.log(12);
    radiusNode.setPluginData(BACKGROUN_STYLE_ID, data.id);
    isFillLocalStyle.value = false;
    fillChangeStyle(fillStyleService.get(data.id));
}

function saveFillStyle() {
    fillStyleService.saveStyle(util.transformBackgroundFormNode(radiusNode) as Internal.SolidPaint);
}

function updateFillStyle(fill: Internal.SolidPaint & {id: string, name: string}) {
    fillStyleService.updateStyle(fill);
}

function unFillSelectStyle() {
    radiusNode.setPluginData(BACKGROUN_STYLE_ID, void 0);
    radiusNode.update();
}


</script>

<template>
    <Raduis
        :is-local-style="isLocalStyle"
        :radius-style="radiusStyle"
        :style-list="radiusStyleList"
        @add-style="saveRadiusStyle"
        @select-style="selectRadiusStyle"
        @change="changeRadiusStyle"
        @update-style="updateRadiusStyle"
        @un-select-style="unSelectRadiusStyle"
    />
    <m-clolor-widget 
        :is-local-style="isFillLocalStyle"
        :fill-style="fillStyle"
        :style-list="fillStyleList"
        @add-style="saveFillStyle"
        @change="fillChangeStyle"
        @select-style="selectFillStyle"
        @update-style="updateFillStyle"
        @un-select-style="unFillSelectStyle"
    />
</template>


<style module>

.container {
    padding-bottom: var(--padding-md);
}
</style>