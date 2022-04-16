<script lang="ts" setup>
import { service } from '@cosmic/core/browser';
import { inject } from '@cosmic/core/parts';
import { ref, onMounted, type Ref } from 'vue';
import WidgetGuides from 'vue-guides';
import { Gesturer } from './gesturer';

const wrapper = ref() as Ref<HTMLDivElement>;
const content = ref() as Ref<HTMLDivElement>;
const box = ref() as Ref<HTMLDivElement>;

const guideHorizontal = ref();
const guideVertical = ref();

const gesturer = new Gesturer({
    content, wrapper,
    scrollX: guideHorizontal,
    scrollY: guideVertical,
});

const toolService = inject<service.ToolService>(service.TOKENS.Tool);
const canvasService = inject<service.CanvasService>(service.TOKENS.Canvas);

toolService.state().subscribe(state => {
    if (state !== service.ToolState.Hand) {
        gesturer.disableDrag();
    }
    switch(state) {
        case service.ToolState.Hand:
            gesturer.enableDrag();
            break;
        case service.ToolState.Frame:
        case service.ToolState.Text:
            wrapper.value.style.cursor = 'crosshair';
            break;
        default:
            wrapper.value.style.cursor = 'default';
    }

});

onMounted(() => {
    gesturer.resize();
    window.addEventListener('resize', () => {
        gesturer.resize();
        setCanvasClientPos();
    });
    gesturer.moveTo(100, 100);
    setCanvasClientPos();
    canvasService.setContentOffset(100, 100);
});

gesturer.onMoved((x, y) => {
    canvasService.setContentOffset(x, y);
});

function setCanvasClientPos() {
    if (!wrapper.value) return;
    const {left, top, width, height} = wrapper.value.getBoundingClientRect();
    canvasService.setClientPos(left + 25, top + 25, width - 25, height + 25);
}
function onChange(e: any) {
    console.log(e);
}

const cursorPos = ref({x: 0, y: 0});
function onWraperMouseMove(event: MouseEvent) {
    cursorPos.value = canvasService.getPosition(event.clientX, event.clientY);
}
</script>

<template>
    <div
        ref="wrapper"
        class="relative w-full h-full overflow-hidden"
        @mousemove="onWraperMouseMove"
    >
        <div ref="content" class="relative overflow-visable w-0 h-0 base-point flex">
            <slot />
        </div>
        <div ref="box" class="box" @click="() => gesturer.moveToStart()" />
        <div class="ruler horizontal">
            <widget-guides
                ref="guideHorizontal"
                type="horizontal"
                background-color="#FCFCFC"
                :text-offset="[0,5]"
                text-color="#BDBDBD"
                line-color="#BDBDBD"
                :ruler-style="{
                    left: '25px',
                    width: 'calc(100% - 25px)',
                    height: '25px',
                }"
                @change-guides="onChange"
            />
        </div>
        <div class="ruler vertical">
            <widget-guides
                ref="guideVertical"
                type="vertical"
                display-drag-pos="true"
                background-color="#FCFCFC"
                :text-offset="[5,0]"
                text-color="#BBBBBB"
                line-color="#BBBBBB"
                :ruler-style="{
                    top: '25px',
                    height: 'calc(100% - 25px)',
                    width: '25px',
                }"
                @change-guides="onChange"
            />
        </div>
        <div class="console">
            {{ cursorPos.x }} , {{ cursorPos.x }}
        </div>
    </div>
</template>
<style scoped>
.ruler {
    position: absolute;
    top: 0;
    left: 0;
}
.ruler.horizontal {
  left: 0px;
  width: 100%;
  height: 25px;
  cursor: row-resize;
}
.ruler.vertical {
  top: 0px;
  width: 25px;
  height: 100%;
  cursor: col-resize;
}
.box {
    position: absolute;
    width: 25px;
    height: 25px;
    background: #FCFCFC;
    box-sizing: border-box;
    cursor: crosshair;
    top: 0;
    left: 0;
    z-index: 1;
}
.box:before,
.box:after {
    position: absolute;
    content: "";
    background: #BDBDBD;
}
.box:before {
    width: 1px;
    height: 100%;
    left: 100%;
}
.box:after {
    height: 1px;
    width: 100%;
    top: 100%;
}

.console {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 0.4rem;
    opacity: 0.3;
}

</style>
