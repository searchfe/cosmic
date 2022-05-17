<script lang="ts" setup>
import { ref } from 'vue';
import { MTitle, MWidget, MClolorWidget, service, inject} from '@cosmic/core/browser';
import { FrameNode, hasMixin, MinimalStrokesMixin, BaseNodeMixin, TextNode, util, SolidPaint } from '@cosmic/core/parts';
import { type Subject } from '@cosmic/core/rxjs';
import Stroke from './stroke.vue';

const isShowDetail = ref(false);

const strokeStyleSevice = inject<service.StrokeStyleService>(service.TOKENS.StrokeStyle);
const fillStyleService = inject<service.FillStyleService>(service.TOKENS.FillStyle);
const nodeService = inject<service.NodeService>(service.TOKENS.Node);

let strokeNode = nodeService.getSelection().find(item => hasMixin(item, MinimalStrokesMixin)) as TextNode | FrameNode;
let subject: Subject<BaseNodeMixin>;

const strokeStyle = ref<Partial<MinimalStrokesMixin>>();
const strokeStyleList = ref(strokeStyleSevice.getServiceStyles());
const isLocalStoreStyle = ref<boolean>();

const strokePainStyle = ref<Partial<Internal.SolidPaint>>();
const isLocalStrokePainStyle = ref<boolean>();
const strokePainStyleList = ref(fillStyleService.getServiceStyles());

strokeStyleSevice.subject.subscribe((res: service.SubjectSourceType) => {
    strokeStyleList.value = strokeStyleSevice.getServiceStyles();
    const { type, data } = res;
    switch(type) {
        case 'C':
            strokeNode.strokeStyleId = data as string;
            break;
        case 'U':
            if (strokeNode.strokeStyleId === data) {
                changeStoreStyle(strokeStyleSevice.get(data as string) as any);
            }
    }
});

fillStyleService.subject.subscribe((res: service.SubjectSourceType) => {
    strokePainStyleList.value = fillStyleService.getServiceStyles();
    const { type, data } = res;
    switch(type) {
        case 'C':
            strokeNode.setPluginData('strokePainId', data);
            
            break;
        case 'U':
            if (strokeNode.getPluginData('strokePainId') === data) {
                changeStrokePainStyle(fillStyleService.get(data as string) as any);
            }
    }

});

nodeService.selection.subscribe(nodes => {
    const selectNode = nodes.find(item => hasMixin(item, MinimalStrokesMixin)) as TextNode | FrameNode;
    if (!selectNode) return;
    strokeNode = selectNode;
    resetStorePainStyle(strokeNode);
    resetStoreStyle(strokeNode);
    watchNode(strokeNode);
});

watchNode(strokeNode);

const clickHandler = () => {
    isShowDetail.value = !isShowDetail.value;
};

function watchNode(node: TextNode | FrameNode) {
    nodeService.unwatch(subject);
    subject = nodeService.watch(node);
    subject.subscribe(() => {
        resetStoreStyle(node);
        resetStorePainStyle(node);
    });
    resetStoreStyle(node);
    resetStorePainStyle(node);
    
}

function resetStoreStyle(node: TextNode | FrameNode) {
    if (node.strokeStyleId) {
    
        isLocalStoreStyle.value = false;
        strokeStyle.value = strokeStyleSevice.cloneById(node.strokeStyleId, false) as Partial<MinimalStrokesMixin>;
    } else {
        strokeStyle.value = util.transformStokeFromNode(node);
        isLocalStoreStyle.value = true;
    }
}

function resetStorePainStyle(node: TextNode | FrameNode) {
    if (node.getPluginData('strokePainId')) {
        isLocalStrokePainStyle.value = false;
        strokePainStyle.value = fillStyleService.get(node.getPluginData('strokePainId'));
    } else {
        isLocalStrokePainStyle.value = true;
        strokePainStyle.value = util.transformStrokePainFromNode(node);
    }
}

function changeStoreStyle(data: MinimalStrokesMixin) {
    strokeNode.strokeWeight = data.strokeWeight;
    strokeNode.strokeLineStyle = data.strokeLineStyle;
    strokeNode.update();
}

function selectStoreStyle(data: {id: string}) {
    strokeNode.strokeStyleId = data.id;
    changeStoreStyle(strokeStyleSevice.get(data.id) as any);
}

function saveStrokeStyle() {
    strokeStyleSevice.saveStyle(util.transformStokeFromNode(strokeNode) as MinimalStrokesMixin);   
}

function updateStoreStyle(style: MinimalStrokesMixin) {
    strokeStyleSevice.updateStyle(style);
}

function unSelectStoreStyle() {
    Reflect.deleteProperty(strokeNode, 'strokeStyleId');
    strokeNode.update();
}

function changeStrokePainStyle(data: Internal.SolidPaint) {
    const { opacity, color } = data;
    const solidPaint = new SolidPaint();
    solidPaint.opacity = opacity;
    solidPaint.color = color as Internal.RGB;
    strokeNode.strokes = [solidPaint];
    strokeNode.update();
}

function selectStrokePainStyle(data: {id: string}) {
    strokeNode.setPluginData('strokePainId', data.id);
    changeStrokePainStyle(fillStyleService.get(data.id));
}

function unSelectStrokePainStyle() {
    strokeNode.setPluginData('strokePainId', void 0);
    strokeNode.update();
}

function saveStrokePainStyle() {
    fillStyleService.saveStyle(util.transformStrokePainFromNode(strokeNode));
}

function updateStrokePainStyle(style: Internal.SolidPaint) {
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
                    :is-local-style="isLocalStoreStyle"
                    :stroke-style="strokeStyle" 
                    :style-list="strokeStyleList"
                    @add-style="saveStrokeStyle"
                    @update-style="updateStoreStyle"
                    @select-style="selectStoreStyle"
                    @change="changeStoreStyle" 
                    @un-select-style="unSelectStoreStyle"
                />
                <m-clolor-widget 
                    :is-local-style="isLocalStrokePainStyle"
                    :fill-style="strokePainStyle"
                    :style-list="strokePainStyleList"
                    @change="changeStrokePainStyle"
                    @select-style="selectStrokePainStyle"
                    @add-style="saveStrokePainStyle"
                    @update-style="updateStrokePainStyle"
                    @un-select-style="unSelectStrokePainStyle"
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