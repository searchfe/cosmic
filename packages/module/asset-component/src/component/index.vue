<script lang="ts" setup>
import { service } from '@cosmic/core/browser';
import { inject } from '@cosmic/core/parts';
import { Button } from 'cosmic-vue';
import { onMounted, ref } from 'vue';


const componentService = inject<service.ComponentService>(service.TOKENS.Component);
componentService.components.subscribe(next => {
    console.log('comp:', next[0]);
});

const toolService = inject<service.ToolService>(service.TOKENS.Tool);

function addBtn(name: string) {
        pos.value.x = 0;
        pos.value.y = 0;
        toolService.data.name = name;
        toolService.set(service.ToolState.Component);
        switch(name) {
            case 'button':
                example.value = exampleButton.value;
                break;
            case 'aladin':
                example.value = exampleAladin.value;
                break;
            case 'image':
                example.value = exampleImage.value;
                break;
        }
        pos.value.x = - 999;
        pos.value.y = -999;

}
function move(event: MouseEvent) {
    if (exampleShow.value && example.value) {
        pos.value.x = event.clientX - example.value.getBoundingClientRect().width / 2;
        pos.value.y = event.clientY - example.value.getBoundingClientRect().height / 2;
    }
}
function up() {
    if (exampleShow.value && example.value) {
        exampleShow.value = false;
        toolService.cancel(service.ToolState.Component);
    }
}

const example = ref<HTMLElement>();
const exampleButton = ref<HTMLElement>();
const exampleAladin = ref<HTMLElement>();
const exampleImage = ref<HTMLElement>();
const exampleShow = ref();
const pos = ref({ x: -999, y: -999 });

toolService.state().subscribe(state => {
    if (state === service.ToolState.Component) {
        exampleShow.value = toolService.data?.name;
    }
});
onMounted(() => {
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
});
</script>
<template>
    <div :class="$style.comp">
        <div class="m-16 text-md">基础组件</div>
        <div class="m-16">
            <Button @mousedown.stop="() => addBtn('button')">按钮</Button>
            <div
                ref="exampleButton"
                :class="$style.example"
                :style="{
                    display: exampleShow ==='button' ? 'block' : 'none',
                    top: pos.y + 'px',
                    left: pos.x + 'px',
                }"
            >
                <Button>按钮</Button>
            </div>
        </div>
        <div class="m-16 text-md">业务组件</div>
        <div class="m-16">阿拉丁整卡</div>
        <div class="m-16" @mousedown.stop="() => addBtn('aladin')">
            <s-component class name="aladin" />
        </div>
        <div
            ref="exampleAladin"
            :class="$style.example"
            :style="{
                display: exampleShow ==='aladin' ? 'block' : 'none',
                top: pos.y + 'px',
                left: pos.x + 'px',
                width: '360px',
                height: '200px',
            }"
        >
            <s-component class name="aladin" />
        </div>

        <div class="m-16">图片</div>
        <div class="m-16" @mousedown.stop="() => addBtn('image')">
            <s-component class name="image" />
        </div>
        <div
            ref="exampleImage"
            :class="$style.example"
            :style="{
                display: exampleShow ==='image' ? 'block' : 'none',
                top: pos.y + 'px',
                left: pos.x + 'px',
                width: '222px',
            }"
        >
            <s-component class name="image" />
        </div>
        <div class="m-16">横滑</div>
        <div class="m-16">
            <s-component class name="scroll" />
        </div>
    </div>
</template>
<style module>
.example {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
}
.comp {
    font-size: 1.2rem;
    user-select: none;
    overflow-y: scroll;
    height: 100%;
}
</style>
