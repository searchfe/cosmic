<script lang="ts" setup>
import { BaseNodeMixin, FrameNode, PageNode, SceneNode, util } from '@cosmic/core/parts';
import { round } from '@cosmic/core/lodash';
import { service, inject } from '@cosmic/core/browser';
import { onUnmounted, ref } from 'vue';

import NodeControllService from '../../service/node-controll.service';

interface WrapperProps {
    node: BaseNodeMixin,
}

const props = withDefaults(defineProps<WrapperProps>(), {});
const nodeService = inject<service.NodeService>(service.TOKENS.Node);
const toolService = inject<service.ToolService>(service.TOKENS.Tool);
const nodeControllService = inject(NodeControllService);

const subject = nodeService.watch(props.node);
subject.subscribe((node: any) => {
    wrapperStyle.value = getWapperStyle(node);
    checkDistanceTop(node);
});

const showInfo = ref(true);
toolService.state().subscribe(state => {
    if (state == service.ToolState.MoveNode) showInfo.value = false;
    else showInfo.value = true;
});

onUnmounted(() => {
    nodeService.unwatch(subject);
});
const wrapperStyle = ref(getWapperStyle(props.node as any));

function getWapperStyle(node: SceneNode) {
    const canvasPos = util.toCanvasPos(node);
    return {
            left: round(canvasPos.x) + 'px',
            top: round(canvasPos.y) + 'px',
            width: round(node.width) + 'px',
            height: round(node.height) + 'px',
    };
}
const distance = ref({top: 0, right: 0, bottom: 0, left: 0});
function checkDistanceTop(node: SceneNode) {
    distance.value.top = distance.value.bottom = distance.value.left = distance.value.right = 0;
    const parent = node.parent as FrameNode | PageNode;
    if(!parent || parent.type === 'PAGE') return;
    let topDistance: number = node.y;
    let bottomDistance: number = parent.height - node.y - node.height;
    let leftDistance: number = node.x;
    let rightDistance: number = parent.width - node.x - node.width;
    parent.findAll((n => {
        if (node.x + node.width / 2 > n.x && node.x + node.width / 2 < n.x + n.width) {
            if (n.y + n.height < node.y && node.y - (n.y + n.height) < topDistance) {
                topDistance = node.y - (n.y + n.height);
            }
            if (n.y > node.y + node.height && n.y - node.y - node.height  < bottomDistance) {
                bottomDistance = n.y - node.y - node.height;
            }
        }
        if (node.y + node.height / 2 > n.y && node.y + node.height / 2 < n.y + n.height) {
            if (n.x + n.width < node.x && node.x - (n.x + n.width) < leftDistance) {
                leftDistance = node.x - (n.x + n.width);
            }
            if (n.x > node.x + node.width && node.x - node.width - n.y < rightDistance) {
                rightDistance = n.x - node.x - node.width;
            }
        }
        return false;
    }));
    if(topDistance > 0) distance.value.top = round(topDistance);
    if(bottomDistance > 0) distance.value.bottom = round(bottomDistance);
    if(leftDistance > 0) distance.value.left = round(leftDistance);
    if(rightDistance > 0) distance.value.right = round(rightDistance);
}
</script>
<template>
    <div
        class="absolute w-full h-full flex flex-col-reverse items-center"
        :class="$style.root"
        :style="wrapperStyle"
    >
        <div
            v-show="distance.top"
            :class="[$style['d-x'], node.VerticalLayout == 0 || node.VerticalLayout == 2? 'limit': '' ]"
            :style="{top: (distance.top * -1) + 'px', height: distance.top + 'px'}"
        >
            <div :class="[$style.info]">{{ distance.top }}</div>
        </div>
        <div
            v-show="distance.bottom"
            :class="[$style['d-x'], node.VerticalLayout == 1 || node.VerticalLayout == 2? 'limit': '']"
            :style="{bottom: (distance.bottom * -1) + 'px', height: distance.bottom + 'px'}"
        >
            <div :class="[$style.info]">{{ distance.bottom }}</div>
        </div>
        <div
            v-show="distance.left"
            :class="[$style['d-y'], $style['d-y-l'], node.HorizontalLayout == 0 || node.HorizontalLayout == 2? 'limit': '']" 
            :style="{left: (distance.left * -1) + 'px', width: distance.left + 'px'}"
        >
            <div :class="[$style.info]">{{ distance.left }}</div>
        </div>
        <div
            v-show="distance.right"
            :class="[$style['d-y'], $style['d-y-r'], , node.HorizontalLayout == 1 || node.HorizontalLayout == 2? 'limit': '']"
            :style="{right: (distance.right * -1) + 'px', width: distance.right + 'px'}"
        >
            <div :class="[$style.info]">{{ distance.right }}</div>
        </div>
        <div class="absolute w-full h-full" :class="$style.dragGroup">
            <div
                v-for="item in (new Array(8).keys())"
                :key="item" class="absolute"
                :class="[
                    $style.dragItem,
                ]"
                @mousedown="(event) => nodeControllService.startResize(node, item, event)"
            />
        </div>
        <div v-show="showInfo" :class="[$style.info, $style['info-wh']]">{{ round(node.width) }} × {{ round(node.height) }}</div>
    </div>
</template>
<style module>
.dragGroup {
    left: 0;
    top: 0;
}
.dragGroup div:nth-child(1) {
    left: -4px;
    top: -4px;
    cursor: nwse-resize;
}
.dragGroup div:nth-child(2) {
    left: 50%;
    top: -4px;
    margin-left: -4px;
    cursor: ns-resize;
}
.dragGroup div:nth-child(3) {
    right: -4px;
    top: -4px;
    cursor: nesw-resize;
}
.dragGroup div:nth-child(4) {
    right: -4px;
    top: 50%;
    margin-top: -4px;
    cursor: ew-resize;
}
.dragGroup div:nth-child(5) {
    right: -4px;
    bottom: -4px;
    cursor: nwse-resize;
}
.dragGroup div:nth-child(6) {
    left: 50%;
    bottom: -4px;
    margin-left: -4px;
    cursor: ns-resize;
}
.dragGroup div:nth-child(7) {
    left: -4px;
    bottom: -4px;
    cursor: nesw-resize;
}
.dragGroup div:nth-child(8) {
    left: -4px;
    top: 50%;
    margin-top: -4px;
    cursor: ew-resize;
}
.dragItem {
    width: 8px;
    height: 8px;
    border: 1px solid var(--color-primary-500);
    background-color: var(--color-light);
    pointer-events: all;
}

.root {
    border: 1px solid var(--color-primary-500);
    top: 0;
    pointer-events :none;
    letter-spacing: 0;
}

.info {
    position: absolute;
    color: var(--color-light);
    font-size: 1.0rem;
    line-height: 1.4rem;
    padding: 0 0.2rem 0.1rem 0.2rem;
    border-radius: 0.2rem;
    background-color: var(--color-primary-500);
    white-space: nowrap;
}
.info-wh {
    bottom: -2.5rem;
}

.d-x {
    position: absolute;
    width: 0px;
    left: 50%;
    margin-left: -0.5px;
    border-left: 1px dashed var(--color-primary-500);
}

.d-x div {
    left: 0.4rem;
    top: 50%;
    margin-top: -0.7rem;
}
.d-y {
    position: absolute;
    height: 0px;
    top: 50%;
    margin-top: -0.5px;
    border-top: 1px dashed var(--color-primary-500);
}

.d-y-l div {
    top: 0.4rem;
    left: 50%;
    margin-left: -2rem;
}
.d-y-r div {
    top: 0.4rem;
    left: 50%;
    margin-right: -2rem;
}

.d-x:global(.limit), .d-y:global(.limit){
    border-color: red;
}

</style>
