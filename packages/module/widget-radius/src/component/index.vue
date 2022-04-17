<script lang="ts" setup>
import {ref, watchEffect} from 'vue';
import { MClolorWidget, service } from '@cosmic/core/browser';
import { FrameNode, inject, RadiusStyle, hasMixin, CornerMixin, FillStyle } from '@cosmic/core/parts';
import Raduis from './radius.vue';
import { v4, v5 } from 'uuid';

const radiusStyleService = inject<service.RadiusStyleService>(service.TOKENS.RadiusStyle);
const nodeService = inject<service.NodeService>(service.TOKENS.Node);

let rudiusNode = nodeService.getSelection().find(item => hasMixin(item, CornerMixin)) as FrameNode;
const fillStyleService = inject<service.FillStyleService>(service.TOKENS.FillStyle);

const radiusStyleId = ref(getRadiusStyle(rudiusNode).id);

const isLocalStyle = ref(radiusStyleService.isLocalStyle(radiusStyleId.value));

const radiusStyle = ref(radiusStyleService.get(radiusStyleId.value));

const radiusStyleList = ref(radiusStyleService.getServiceStyles());

const fillStyleId = ref(getFillStyle(rudiusNode).id);

const fillStyleList = ref(fillStyleService.getServiceStyles());

const fillStyle =  ref(fillStyleService.get(fillStyleId.value));

const isLocalFillStyle = ref(fillStyleService.isLocalStyle(fillStyleId.value));


watchEffect(() => {
    resetRadiusStyle(radiusStyleId.value);
    isLocalStyle.value = radiusStyleService.isLocalStyle(radiusStyleId.value);
});

watchEffect(() =>  {
    const id = fillStyleId.value as string;
    resetFillStyle(id);
    isLocalFillStyle.value = fillStyleService.isLocalStyle(id);
});

nodeService.selection.subscribe((nodes) => {
    rudiusNode = nodes.find(item => hasMixin(item, CornerMixin)) as FrameNode;
    if (!rudiusNode) return;
    getRadiusStyle(rudiusNode);
    getFillStyle(rudiusNode);
    radiusStyleId.value = rudiusNode.radiusStyleId;
    fillStyleId.value = rudiusNode.backgroundStyleId;
});

radiusStyleService.subject.subscribe((source: service.SubjectSourceType) => {
    const { type, data } = source;
    radiusStyleList.value = radiusStyleService.getServiceStyles();
    switch(type) {
        case 'C':
        case 'U':
            selectStyle({id: data as string});
            resetRadiusStyle(data as string);
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


function getRadiusStyle(node: FrameNode): RadiusStyle {
    if (!node) return {} as RadiusStyle;
    const radiusStyle = radiusStyleService.get(node.radiusStyleId ?? v5('cosmic', v4()));
    if (node.radiusStyleId !== radiusStyle.id) {
        node.radiusStyleId = radiusStyle.id;
    }
    return radiusStyle;
}

function selectStyle(data: {id: string}) {
    radiusStyleId.value = data.id;
    rudiusNode.radiusStyleId = data.id;
    raduisChange();
}

function saveStyle() {
    radiusStyleService.saveStyle(radiusStyleId.value);
}

function raduisChange() {
    const style = radiusStyleService.get(radiusStyleId.value);
    rudiusNode.topLeftRadius = style.tl;
    rudiusNode.topRightRadius = style.tr;
    rudiusNode.bottomLeftRadius = style.bl;
    rudiusNode.bottomRightRadius = style.br;
    rudiusNode.update();
}

function resetRadiusStyle(id: string) {
    radiusStyle.value = radiusStyleService.get(id);
}

function updateStyle(style: RadiusStyle) {
    radiusStyleService.updateStyle(style);
}


function unSelectStyle() {
    const radiusStyle = radiusStyleService.cloneById(radiusStyleId.value);
    radiusStyleService.addLocalStyle(radiusStyle);
    selectStyle({id: radiusStyle.id});
} 

function getFillStyle(node: FrameNode): FillStyle {
    if (!node) return {} as FillStyle;
    const fillStyle = fillStyleService.get(node.backgroundStyleId ?? v5('cosmic', v4()));
    if (node.backgroundStyleId !== fillStyle.id) {
        node.backgroundStyleId = fillStyle.id;
    }
    return fillStyle;
}

function fillChage() {
    const style = fillStyleService.get(rudiusNode.backgroundStyleId);
    rudiusNode.backgrounds = [style as any];
    rudiusNode.update();
}


function resetFillStyle(id: string) {
    fillStyle.value = fillStyleService.get(id);
}

function selectFillStyle(data: {id: string}) {
    fillStyleId.value = data.id;
    rudiusNode.backgroundStyleId = data.id;
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
    <Raduis
        :is-local-style="isLocalStyle"
        :radius-style="radiusStyle"
        :select-style="selectStyle"
        :style-list="radiusStyleList"
        @add-style="saveStyle"
        @select-style="selectStyle"
        @change="selectStyle"
        @update-style="updateStyle"
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
</template>


<style module>

.container {
    padding-bottom: var(--padding-md);
}
</style>