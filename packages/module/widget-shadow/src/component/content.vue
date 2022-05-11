<script lang="ts" setup>
import { ref } from 'vue';
import MShadow from './shadow.vue';
import { MClolorWidget } from '@cosmic/core/browser';
import { service } from '@cosmic/core/browser';
import { SolidPaint } from '@cosmic/core/parts';
import { inject, SceneNode, hasMixin, BlendMixin, BaseNodeMixin, util } from '@cosmic/core/parts';
import { type Subject } from '@cosmic/core/rxjs';

const EFFECT_STROKES = 'effectStores';
const EFFECT_STROKES_ID = 'effectStoresId';

const effectStyleSevice = inject<service.EffectStyleService>(service.TOKENS.EffectStyle);
const fillStyleService = inject<service.FillStyleService>(service.TOKENS.FillStyle);
const nodeService = inject<service.NodeService>(service.TOKENS.Node);

let effectNode = nodeService.getSelection().find(item => hasMixin(item, BlendMixin)) as SceneNode;
let subject: Subject<BaseNodeMixin>;


const effectStyle = ref<Partial<Internal.DropShadowEffect>>();
const isLocalEffectStyle = ref<boolean>(!effectNode.effectStyleId);
const effectStyleList = ref(effectStyleSevice.getServiceStyles());

const effectStoreStyle = ref<Partial<Internal.SolidPaint>>();
const isEffectStoreLocalStyle= ref<boolean>();
const effectStoreStyleList = ref(fillStyleService.getServiceStyles());

effectStyleSevice.subject.subscribe((res: service.SubjectSourceType) => {
    effectStyleList.value = effectStyleSevice.getServiceStyles();
    const { type, data } = res;
    switch(type) {
        case 'C':
            effectNode.effectStyleId = data as string;
            break;
        case 'U':
            if (effectNode.effectStyleId === data) {
                resetEffectStyle(effectStyleSevice.get(data as string) as any);
            }
    }
});

fillStyleService.subject.subscribe((res: service.SubjectSourceType) => {
    effectStoreStyleList.value = fillStyleService.getServiceStyles();
    const { type, data } = res;
    switch(type) {
        case 'C':
            effectNode.setPluginData(EFFECT_STROKES_ID, data);
            break;
        case 'U':
            if (effectNode.getPluginData(EFFECT_STROKES_ID) === data) {
                resetEffectStore(fillStyleService.get(data as string) as any);
            }
    }
});

watchNode(effectNode);

function watchNode(node: SceneNode) {
    nodeService.unwatch(subject);
    subject = nodeService.watch(node);
    subject.subscribe(() => {
        resetEffectStyle(node);
        resetEffectStore(node);
    });
    resetEffectStyle(node);
    resetEffectStore(node);
}

function resetEffectStyle(node: SceneNode) {
    if (node.effectStyleId) {
        isLocalEffectStyle.value = false;
        effectStyle.value = effectStyleSevice.get(node.effectStyleId);
    } else {
        isLocalEffectStyle.value = true;
        effectStyle.value = util.transformDropEffectFromNode(node);
    }
}

function resetEffectStore(node: SceneNode) {
    if (node.getPluginData(EFFECT_STROKES_ID)) {
        isEffectStoreLocalStyle.value = false;
        effectStoreStyle.value = fillStyleService.get(node.getPluginData(EFFECT_STROKES_ID));
    } else {
         effectStoreStyle.value = util.transformEffectStoreFromNode(node);
         isEffectStoreLocalStyle.value = true;
    }
   
}

function changeEffectStyle(style: Internal.DropShadowEffect) {
    effectNode.effects = [style];
    effectNode.update();
}

function selectEffectStyle(data: {id: string}) {
    effectNode.effectStyleId = data.id;
    changeEffectStyle(effectStyleSevice.get(data.id).effects[0]);
    effectNode.update();
}

function unSelectEffectStyle() {
    Reflect.deleteProperty(effectNode, 'effectStyleId');
    effectNode.update();
}

function saveEffectStyle() {
    effectStyleSevice.saveStyle(util.transformDropEffectFromNode(effectNode) as Internal.DropShadowEffect);
}

function updateEffectStyle(style: Internal.DropShadowEffect & {id: string, name: string}) {
    effectStyleSevice.updateStyle(style);
}

function changeEffectStore(style: Internal.SolidPaint) {
    const solidPaint = new SolidPaint();
    solidPaint.opacity = style.opacity;
    solidPaint.color = {...style.color};
    effectNode.setPluginData(EFFECT_STROKES, solidPaint);
    effectNode.update();
}

function selectEffectStoreId(data: {id: string}) {
    effectNode.setPluginData(EFFECT_STROKES_ID, data.id);
    changeEffectStore(fillStyleService.get(data.id));
    effectNode.update();
}

function saveEffectStoreStyle(style: Internal.SolidPaint) {
    fillStyleService.saveStyle(style);
}

function unSelectEffectStoreId() {
    effectNode.setPluginData(EFFECT_STROKES_ID, void 0);
    effectNode.update();
}

function updateEffectStore(style: Internal.SolidPaint & {id: string, name: string}) {
    fillStyleService.updateStyle(style);
}

</script>

<template>
    <div class="mb-10">
        <m-shadow 
            :is-local-style="isLocalEffectStyle"
            :shadow-style="effectStyle"
            :style-list="effectStyleList" 
            inset-title="外阴影"
            @add-style="saveEffectStyle"
            @change="changeEffectStyle"
            @select-style="selectEffectStyle"
            @update-style="updateEffectStyle"
            @un-select-style="unSelectEffectStyle"
        />
        <m-clolor-widget 
            :is-local-style="isEffectStoreLocalStyle"
            :fill-style="effectStoreStyle"
            :style-list="effectStoreStyleList"
            @add-style="saveEffectStoreStyle"
            @change="changeEffectStore"
            @select-style="selectEffectStoreId"
            @update-style="updateEffectStore"
            @un-select-style="unSelectEffectStoreId"
        />
    </div>
</template>