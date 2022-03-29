<script lang="ts" setup>
import { service } from '@cosmic/core/browser';
import { inject } from '@cosmic/core/parts';
import { ref, onMounted } from 'vue';
import WidgetGuides from 'vue-guides';
import { Gesturer } from './gesturer';

const wrapper = ref();
const content = ref();

const guideHorizontal = ref();
const guideVertical = ref();

const gesturer = new Gesturer({
    content, wrapper,
    scrollX: guideHorizontal,
    scrollY: guideVertical,
});

const keyboardService = inject<service.KeyboardService>(service.TOKENS.Keyboard);

keyboardService.keydown('Space').subscribe(() => gesturer.enableDrag());
keyboardService.keyup('Space').subscribe(() => gesturer.disableDrag());


const box = ref();
onMounted(() => {
    gesturer.resize();
    window.addEventListener('resize', () => { gesturer.resize(); });
    gesturer.moveToCenter();
});
function onChange(e: any) {
    console.log(e);
}
</script>
<template>
    <div ref="wrapper" class="relative w-full h-full overflow-hidden canvas">
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

        <div ref="content" class="container inline-block">
            <slot />
        </div>
    </div>
</template>
<style scoped>
.canvas {
    background-color: var(--color-gray-100);
}

.ruler {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 20;
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
    z-index: 21;
    cursor:crosshair;
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

.container {
    background: var(--color-white);
}

</style>
