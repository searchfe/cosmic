<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { FillStyle, inject, TextNode, TextStyle } from '@cosmic/core/parts';
import { MClolorWidget, service } from '@cosmic/core/browser';
import Glyph from './glyph.vue';


const textStyleSevice = inject<service.TextStyleSevice>(service.TOKENS.TextStyle);
const fillStyleService = inject<service.FillStyleService>(service.TOKENS.FillStyle);
const nodeService = inject<service.NodeService>(service.TOKENS.Node);

let textNode = nodeService.getSelection().find(item => item.type === 'TEXT') as TextNode;

const styleId = ref(getTextStyle(textNode).id);

const fillStyleId = ref(getFillStyle(textNode)?.id);

const textStyle = ref();

const isStandard = ref(false);

const isLocalFillStyle = ref(false);

const styleList = ref(textStyleSevice.getServiceStyles());

const fillStyle = ref();

const fillStyleList = ref(fillStyleService.getServiceStyles());

const isFillRepeat = ref(false);

watchEffect(() => {
    resetTextStyle(styleId.value);
    isStandard.value  =  !textStyleSevice.isLocalStyle(styleId.value);
});

watchEffect(() =>  {
    resetFillStyle(fillStyleId.value);
    isLocalFillStyle.value = fillStyleService.isLocalStyle(fillStyleId.value);
});

nodeService.selection.subscribe((nodes) => {    
    const selectNode = nodes.find(item => item.type === 'TEXT') as TextNode;
    if (!selectNode) return;
    getTextStyle(selectNode);
    getFillStyle(selectNode);
    styleId.value = selectNode.getRangeTextStyleId(0,0);
    fillStyleId.value = selectNode.getRangeFillStyleId(0,0);
});

textStyleSevice.subject.subscribe((source: any) => {
    const  { type, data } = source;
    styleList.value = textStyleSevice.getServiceStyles();
    switch(type) {
        case 'C':
        case 'U':
            selectStyle({id: data as string});
            resetTextStyle(data as string);
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

function resetTextStyle(id: string) {
    textStyle.value = textStyleSevice.get(id);
}

function resetFillStyle(id: string) {
    fillStyle.value = fillStyleService.get(id);
}

function getTextStyle(node: TextNode): TextStyle {
    if (!node) return {} as TextStyle;
    const textStyle = textStyleSevice.get(node.getRangeTextStyleId(0,0) ?? Date.now() + '');
    if (node.getRangeTextStyleId(0,0) !== textStyle.id) {
        node.setRangeTextStyleId(0, 0, textStyle.id);
    }
    return textStyle;
}

function getFillStyle(node: TextNode): FillStyle {
    if (!node) return {} as FillStyle;
    // isFillRepeat.value =  fillStyleService.isRepeat(fillStyleId.value);
    const fillStyle = fillStyleService.get(node.getRangeFillStyleId(0,0) ?? Date.now() + '');
    if (node.getRangeFillStyleId(0,0) !== fillStyle.id) {
        node.setRangeFillStyleId(0, 0, fillStyle.id);
    }
    return fillStyle;
}

function textChange() {
    const node = nodeService.getSelection().find(item => item.type === 'TEXT') as TextNode;
    const style = textStyleSevice.get(node.getRangeTextStyleId(0,0));
    node.setRangeFontSize(0, 0, style.fontSize);
    node.setRangeFontName(0, 0, {family: style.fontName.family ?? '宋体', style: style.fontName.style ?? ''});
    node.setRangeTextDecoration(0 , 0, style.textDecoration);
    node.setRangeLineHeight(0, 0, {...style.lineHeight});
    node.setParagraphSpacing(style.paragraphSpacing);
    node.update();
}

function fillChage() {
    const style = fillStyleService.get(textNode.getRangeFillStyleId(0, 0));
    textNode.setRangeFills(0, 0, [style as unknown as any]);
    textNode.update();
}

function saveStyle() {
    textStyleSevice.saveStyle(styleId.value);
}

function selectStyle(data: {id: string}) {
    styleId.value = data.id;
    textNode.setRangeTextStyleId(0, 0, data.id);
    textChange();
}

function selectFillStyle(data: {id: string}) {
    fillStyleId.value = data.id;
    textNode.setRangeFillStyleId(0, 0, data.id);
    fillChage();
}   

function unSelectStyle() {
    const textStyle = textStyleSevice.cloneById(styleId.value);
    textStyleSevice.addLocalStyle(textStyle);
    selectStyle({id: textStyle.id});
} 

function updateStyle(style: TextStyle) {
    textStyleSevice.updateStyle(style);
}

function updateFillStyle(style: FillStyle) {
    fillStyleService.updateStyle(style);
}

function unFillSelectStyle() {
    const cloneStyle = fillStyleService.cloneById(fillStyleId.value);
    fillStyleService.addLocalStyle(cloneStyle);
    selectFillStyle({id: cloneStyle.id});
}

function saveFillStyle() {
    fillStyleService.saveStyle(styleId.value);
}

</script>

<template>
    <div class="mb-10">
        <Glyph 
            :is-standard="isStandard"
            :text-style="textStyle"
            :style-list="styleList" 
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
            :is-repeat="isFillRepeat"
            @add-style="saveFillStyle"
            @change="fillChage"
            @select-style="selectFillStyle"
            @update-style="updateFillStyle"
            @un-select-style="unFillSelectStyle"
        />
    </div>
</template>