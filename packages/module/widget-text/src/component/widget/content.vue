<script lang="ts" setup>
import { ref, computed, toRaw } from 'vue';
import { inject, TextNode } from '@cosmic/core/parts';
import { MClolorWidget, service } from '@cosmic/core/browser';
import Glyph from './glyph.vue';
import { Standard } from '../../data';


const textStyleSevice = inject<service.TextStyleSevice>(service.TOKENS.TextStyle);
const fillStyleService = inject<service.FillStyleService>(service.TOKENS.FillStyle);
const nodeService = inject<service.NodeService>(service.TOKENS.Node);

let textNode = nodeService.getSelection().find(item => item.type === 'TEXT') as TextNode;

const styleId = ref(getTextStyle(textNode).id);

const fillStyleId = ref(getFillStyle(textNode)?.id);

const textStyle = computed(() => textStyleSevice.get(styleId.value));

const isStandard = computed(() => !textStyleSevice.isLocalStyle(styleId.value));

const isLocalFillStyle = computed(() =>  styleId.value === '' || fillStyleService.isLocalStyle(fillStyleId.value));

const styleList = computed(() => {
    styleId.value;
    return textStyleSevice.getServiceStyles();
});

const fillStyle = computed(() => fillStyleService.get(fillStyleId.value));

nodeService.selection.subscribe((nodes) => {    
    const selectNode = nodes.find(item => item.type === 'TEXT');
    if (!selectNode) return;
    getTextStyle(selectNode);
    getFillStyle(selectNode);
    styleId.value = selectNode.getRangeTextStyleId();
    fillStyleId.value = selectNode.getRangeFillStyleId();
});

function getTextStyle(node: TextNode) {
    if (!node) return {};
    const textStyle = textStyleSevice.get(node.getRangeTextStyleId() ?? Date.now() + '');
    if (node.getRangeTextStyleId() !== textStyle.id) {
        node.setRangeTextStyleId(0, 0, textStyle.id);
    }
    return textStyle;
}

function getFillStyle(node: TextNode) {
    if (!node) return;
    const fillStyle = fillStyleService.get(node.getRangeFillStyleId() ?? Date.now() + '');
    if (node.getRangeFillStyleId() !== fillStyle.id) {
        node.setRangeFillStyleId(0, 0, fillStyle.id);
    }
    return fillStyle;
}

function textChange() {
    const node = nodeService.getSelection().find(item => item.type === 'TEXT') as TextNode;
    const style = textStyleSevice.get(node.getRangeTextStyleId());
    console.log(style.fontName);
    node.setRangeFontSize(0, 0, style.fontSize);
    node.setRangeFontName(0, 0, {family: style.fontName.family ?? '宋体', style: style.fontName.style ?? ''});
    node.setRangeTextDecoration(0 , 0, style.textDecoration);
    node.setRangeLineHeight(0, 0, {...style.lineHeight});
    node.setParagraphSpacing(style.paragraphSpacing);
    node.update();
}

function fillChage() {
    const node = nodeService.getSelection().find(item => item.type === 'TEXT') as TextNode;
    const style = fillStyleService.get(node.getRangeFillStyleId());
    node.setRangeFills(0, 0, [toRaw(style)]);
    node.update();
}

</script>

<template>
    <div class="mb-10">
        <Glyph 
            :is-standard="isStandard"
            :text-style="textStyle"
            :style-list="styleList" 
            @change="textChange"
        />
        <m-clolor-widget 
            :standard-list="Standard" 
            :is-local-style="isLocalFillStyle"
            :fill-style="fillStyle"
            @change="fillChage"
        />
    </div>
</template>