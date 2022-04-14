<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import MShadow from './shadow.vue';
import { MClolorWidget } from '@cosmic/core/browser';
import { service } from '@cosmic/core/browser';
import type { EffectStyle, FillStyle } from '@cosmic/core/parts';
import { inject, SceneNode, hasMixin, BlendMixin, BaseNodeMixin } from '@cosmic/core/parts';

const effectStyleSevice = inject<service.EffectStyleService>(service.TOKENS.EffectStyle);
const fillStyleService = inject<service.FillStyleService>(service.TOKENS.FillStyle);
const nodeService = inject<service.NodeService>(service.TOKENS.Node);

let effectNode = nodeService.getSelection().find(item => hasMixin(item, BlendMixin)) as BlendMixin;

const effectId = ref(getEffectStyle(effectNode as BlendMixin).id);


const effectStyle = ref(effectStyleSevice.get(effectId.value));

const effectList = ref(effectStyleSevice.getServiceStyles());

const fillStyleId = ref(getFillStyle(effectNode as BlendMixin).id);

const fillStyleList = ref(fillStyleService.getServiceStyles());

const fillStyle =  ref(fillStyleService.get(fillStyleId.value));

const isLocalFillStyle = ref(fillStyleService.isLocalStyle(fillStyleId.value));

const isLocalStyle = ref(false);

nodeService.selection.subscribe((nodes) => {    
    effectNode = nodes.find(item => hasMixin(item, BlendMixin)) as BlendMixin;
    if (!effectNode) return;
    getEffectStyle(effectNode as SceneNode);
    getFillStyle(effectNode as SceneNode);
    effectId.value = effectNode.effectStyleId;
    fillStyleId.value = effectNode.effectStrokeStyleId;
});

effectStyleSevice.subject.subscribe((source: any) => {
    const  { type, data } = source;
    effectList.value = effectStyleSevice.getServiceStyles();
    switch(type) {
        case 'C':
        case 'U':
            selectStyle({id: data as string});
            effectChange();
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

watchEffect(() =>  {
    const id = effectId.value as string;
    resetFillStyle(id);
    isLocalStyle.value = effectStyleSevice.isLocalStyle(id);
});

watchEffect(() =>  {
    const id = fillStyleId.value as string;
    resetFillStyle(id);
    isLocalFillStyle.value = fillStyleService.isLocalStyle(id);
});



function getEffectStyle(node: BlendMixin): EffectStyle {
    if (!node) return {} as EffectStyle;
    const effectStyle = effectStyleSevice.get(node.effectStyleId || Date.now() + '');
    if (node.effectStyleId !== effectStyle.id) {
        node.effectStyleId = effectStyle.id;
    }
    return effectStyle;
}

function selectStyle(data: {id: string}) {
    effectId.value = data.id;
    effectNode.effectStyleId = data.id; 
    effectChange();
}

function updateStyle(style: EffectStyle) {
    effectStyleSevice.updateStyle(style);
}

function unSelectStyle() {
    const textStyle = effectStyleSevice.cloneById(effectId.value);
    effectStyleSevice.addLocalStyle(textStyle);
    selectStyle({id: textStyle.id});
} 

function saveStyle() {
    effectStyleSevice.saveStyle(effectId.value);
}

function effectChange() {
    console.log(211212);
    const style = effectStyleSevice.get(effectId.value);
    effectStyle.value = style;
    effectNode.effects = [style.effects[0]];
    if (hasMixin(effectNode, BaseNodeMixin)) {
        effectNode.update();
    }
}



function getFillStyle(node: BlendMixin): FillStyle {
    if (!node) return {} as FillStyle;
    const fillStyle = fillStyleService.get(node.effectStrokeStyleId ?? Date.now() + '');
    if (node.effectStrokeStyleId !== fillStyle.id) {
        node.effectStrokeStyleId = fillStyle.id;
    }
    return fillStyle;
}

function fillChage() {
    const node = nodeService.getSelection().find(item => hasMixin(item, BlendMixin)) as any;
    const style = fillStyleService.get(node.effectStrokeStyleId);
    node.effectStrokes = [style];
    if (hasMixin(node, BaseNodeMixin)) {
        node.update();
    }
}


function resetFillStyle(id: string) {
    fillStyle.value = fillStyleService.get(id);
}

function selectFillStyle(data: {id: string}) {
    fillStyleId.value = data.id;
    effectNode.effectStrokeStyleId = data.id;
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
    <div class="mb-10">
        <m-shadow 
            :is-local-style="isLocalStyle"
            :shadow-style="effectStyle"
            :style-list="effectList" 
            inset-title="外阴影"
            @add-style="saveStyle"
            @change="selectStyle"
            @select-style="selectStyle"
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
    </div>
</template>