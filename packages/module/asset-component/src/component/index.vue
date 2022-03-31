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

function addBtn() {
    toolService.set(service.ToolState.Component);
}
function move(event: MouseEvent){
    if (exampleShow.value && example.value) {
        pos.value.x = event.clientX - example.value.getBoundingClientRect().width / 2;
        pos.value.y = event.clientY - example.value.getBoundingClientRect().height /2;
        console.log(pos.value);
    }
}

const example = ref<HTMLElement>();
const exampleShow = ref(false);
const pos = ref({x: 0, y: 0});

toolService.state().subscribe(state => {
    if (state === service.ToolState.Component) {
        exampleShow.value = true;
    }
});
onMounted(() => {
    document.addEventListener('mousemove', move);
});
</script>
<template>
    <div class="flex">
        <div class="m-16">
            <Button @mousedown="addBtn">按钮</Button>
            <div
                ref="example"
                :class="$style.example" :style="{
                    display: exampleShow ? 'block' : 'none',
                    top: pos.y + 'px',
                    left: pos.x + 'px',
                }"
            >
                <Button> 按钮 </Button>
            </div>
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
</style>
