<script lang="ts" setup>
import { ref, onUnmounted } from 'vue';
import { inject, TextNode, BaseNodeMixin, util, SolidPaint } from '@cosmic/core/parts';
import { MClolorWidget, service } from '@cosmic/core/browser';
import Glyph from './glyph.vue';
import { type Subject } from '@cosmic/core/rxjs';


const textStyleSevice = inject<service.TextStyleSevice>(service.TOKENS.TextStyle);
const fillStyleService = inject<service.FillStyleService>(service.TOKENS.FillStyle);
const nodeService = inject<service.NodeService>(service.TOKENS.Node);

let textNode = nodeService.getSelection().find(item => item instanceof TextNode) as TextNode;

let subject: Subject<BaseNodeMixin>;

const styleList = ref(textStyleSevice.getServiceStyles());

const textStyle = ref<Partial<Internal.TextStyle>>(util.transformTextStyleFromNode(textNode));

const isLocalStyle = ref<boolean>(!!textNode.textStyleId);

const isLocalFillStyle = ref<boolean>(!!textNode.fillStyleId);

const fillStyle = ref<Partial<Internal.SolidPaint>>(util.transformSolidFromNode(textNode));

const fillStyleList = ref(fillStyleService.getServiceStyles());

// 创建监控
watchNode(textNode);

onUnmounted(() => {
    nodeService.unwatch(subject);
});

textStyleSevice.subject.subscribe((res: service.SubjectSourceType) => {
    styleList.value = textStyleSevice.getServiceStyles();
    const { type, data } = res;
    switch(type) {
        case 'C':
            textNode.textStyleId = data as string;
            break;
        case 'U':
            if (textNode.textStyleId) {
                const style = textStyleSevice.get(textNode.textStyleId as string) as Internal.TextStyle;
                changeStyle(style);
            }
            
            
    }
});

fillStyleService.subject.subscribe((res: service.SubjectSourceType) => {
    fillStyleList.value = fillStyleService.getServiceStyles();
    const { type, data } = res;
    switch(type) {
        case 'C':
            textNode.fillStyleId = data as string;
            break;
        case 'U':
            if (textNode.fillStyleId) {
                const style = fillStyleService.get(textNode.fillStyleId as string) as Internal.SolidPaint;
                changeFillStyle(style);
            }
    }
});

nodeService.selection.subscribe(nodes => {
    const selectNode = nodes.find(item => item instanceof TextNode) as TextNode;
    if (!selectNode || !textNode) {
        return;
    }
    if (selectNode.id === textNode.id) return;
    resetTextStyle(textNode);
    resetFillStyle(textNode);
    watchNode(textNode);
});

function watchNode(node: TextNode) {
    nodeService.unwatch(subject);
    subject = nodeService.watch(node);
    subject.subscribe(() => {
        resetTextStyle(node);
        resetFillStyle(node);
    });
    resetTextStyle(node);
    resetFillStyle(node);
}

function resetFillStyle(node: TextNode) {
    if(node.fillStyleId) {
        isLocalFillStyle.value = false;
        fillStyle.value = fillStyleService.get(node.fillStyleId as string);
    } else {
        fillStyle.value = util.transformSolidFromNode(node);
        isLocalFillStyle.value = true;
    }
}

function resetTextStyle(node: TextNode) {
    isLocalStyle.value = !node.textStyleId;
    if (isLocalStyle.value) {
        textStyle.value = util.transformTextStyleFromNode(node);
    } else {
        textStyle.value = textStyleSevice.cloneById(node.textStyleId as string, false);
    }
    
}

function selectStyle(data: {id: string}) {
    textNode.textStyleId = data.id;
    changeStyle(textStyleSevice.cloneById(data.id as string));
    textNode.update();
}

function unSelectStyle() {
    Reflect.deleteProperty(textNode, 'textStyleId');
    textNode.update();
}

function changeStyle(changeTextStyle: Internal.TextStyle) {
    textNode.fontSize = changeTextStyle.fontSize;
    textNode.paragraphSpacing = changeTextStyle.paragraphIndent;
    textNode.fontName = {...changeTextStyle.fontName};
    textNode.letterSpacing = {...changeTextStyle.letterSpacing};
    textNode.lineHeight = {...changeTextStyle.lineHeight};
    textNode.textDecoration = changeTextStyle.textDecoration;
    textNode.update();
}

function saveTextStyle() {
    textStyleSevice.saveStyle(util.transformTextStyleFromNode(textNode) as Internal.TextStyle);
}

function updateStyle(textStyle: Internal.TextStyle) {
    textStyleSevice.updateStyle(textStyle);
}

function selectFillStyle(fill: {id: string}) {
    textNode.fillStyleId = fill.id;
    const style = fillStyleService.get(fill.id);
    changeFillStyle(style);
    textNode.update();
}

function saveFillStyle() {
    fillStyleService.saveStyle(util.transformSolidFromNode(textNode) as Internal.SolidPaint);
}

function changeFillStyle(data: Partial<Internal.SolidPaint>) {
    const { opacity, color } = data;
    const solidPaint = new SolidPaint();
    solidPaint.opacity = opacity;
    solidPaint.color = color as Internal.RGB;
    textNode.fills = [solidPaint];
    textNode.update();
}

function updateFillStyle(solidPaint: Internal.SolidPaint & {id: string, name: string}){
    console.log(solidPaint);
    fillStyleService.updateStyle(solidPaint);
}

function unFillSelectStyle() {
    Reflect.deleteProperty(textNode, 'fillStyleId');
    textNode.update();
}

</script>

<template>
    <div class="mb-10">
        <Glyph 
            :is-local-style="isLocalStyle" :text-style="textStyle" :style-list="styleList" :is-repeat="isRepeat"
            @add-style="saveTextStyle" @change="changeStyle" @select-style="selectStyle" @update-style="updateStyle"
            @un-select-style="unSelectStyle" 
        />
        <m-clolor-widget 
            :is-local-style="isLocalFillStyle" :fill-style="fillStyle" :style-list="fillStyleList"
            :is-repeat="isFillRepeat" @add-style="saveFillStyle" @change="changeFillStyle" @select-style="selectFillStyle"
            @update-style="updateFillStyle" @un-select-style="unFillSelectStyle" 
        />
    </div>
</template>