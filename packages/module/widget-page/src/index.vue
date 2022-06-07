<script lang="ts" setup>
import { ref } from 'vue';
import { MTitle, MWidget, service, inject, MColor } from '@cosmic/core/browser';
import { SolidPaint } from '@cosmic/core/parts';

const defaultColor = {type: 'SOLID', color: {r: 245, g: 245, b: 245}, opacity: 1};
const isShow = ref(true);
const nodeService = inject<service.NodeService>(service.TOKENS.Node);
const strokePainStyle = ref(defaultColor);

nodeService.currentPage.subscribe((page) => {
    strokePainStyle.value = page.backgrounds?.[0] as any || defaultColor;
});

nodeService.selection.subscribe(selections => {
    isShow.value = selections.length ? false : true;
});

function changeColor(c: any){
    const color = new SolidPaint();
    color.color = c.color;
    color.opacity = c.opacity;
    const page = nodeService.getCurrentPage();
    page.backgrounds=[color];
    page.update();
}
</script>

<template>
    <m-widget v-show="isShow">
        <m-title title="页面" />
        <div class="mb-8">
            <m-color
                :fill-style="strokePainStyle"
                :show-mode="false"
                @change="changeColor"
            />
        </div>
    </m-widget>
</template>


 <style module>
 .row {
    composes: mb-10 from global;
 }

.icon {
    font-size: 1rem;
}

.lock-icon {
    flex: 0 0 2.4rem;
    margin-left: .8rem;
    font-size: 1.4rem;
    /* background-color: red */
}

.col {
    margin-right: .8rem
}

 </style>
