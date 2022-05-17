<script lang="ts" setup>
import { service, inject } from '@cosmic/core/browser';
import { util, hasMixin, ChildrenMixin } from '@cosmic/core/parts';
import { Button } from 'cosmic-vue';
import { buttonLight } from 'cosmic-ui';
import { onMounted, ref } from 'vue';
import { IImage, IAvatar, IImageList } from '@cosmic/core/browser';

import { Images } from './data';

const imageSrc = ref('https://t15.baidu.com/it/u=4099293214,170987867&fm=30&app=106&size=r3,2&n=0&g=4n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1DC5A9444B81017E1243B9010300E099');

const isShowAvatar = ref('1');
const avatar = ref('https://gimg3.baidu.com/search/src=https%3A%2F%2Fpic.rmb.bdstatic.com%2F25128e15d012d3a2da58101a57c98709.png&refer=http%3A%2F%2Fwww.baidu.com&app=2021&size=b45,45&n=0&g=0n&er=404&q=75&fmt=auto&maxorilen2heic=2000000');
const avatarTitle = ref('极兔测试');

const imageList = ref(Images.filter((_, index) => index < 3).map(item => item.value));

const style = {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
};


const componentService = inject<service.ComponentService>(service.TOKENS.Component);
componentService.components.subscribe(next => {
    console.log('comp:', next[0]);
});

const toolService = inject<service.ToolService>(service.TOKENS.Tool);
const nodeService = inject<service.NodeService>(service.TOKENS.Node);
const canvasService = inject<service.CanvasService>(service.TOKENS.Canvas);

let oldState: service.ToolState = service.ToolState.Null;
let oldValue: any;
toolService.state().subscribe((state: service.ToolState) => {
    if (oldState === service.ToolState.Component && state === service.ToolState.Null) {
        const pos = canvasService.getPosition(toolService.data.event.clientX, toolService.data.event.clientY);
        const frameNode = util.findParent(
            util.getSelectionInPageNode(nodeService.getCurrentPage(), pos),
            (node: any) => node.type !== 'DOCUMENT' && hasMixin(node, ChildrenMixin),
        );
        if (frameNode) {
            const node = nodeService.addComponent(frameNode as any);
            let width = 60, height = 32;
            switch(oldValue.name) {
                    case 'v-image':
                        width=120;
                        height=80;
                        node.setPluginData('imageSrc', imageSrc.value);
                        break;
                    case 'v-image-list':
                        width=440;
                        height=120;
                        node.setPluginData('imageList', imageList.value);
                        break;
                    case 'v-avatar':
                        width=440;
                        height=32;
                        node.setPluginData('isShowAvatar', isShowAvatar.value);
                        node.setPluginData('avatar', avatar.value);
                        node.setPluginData('avatarTitle', avatarTitle.value);
                        break;
            }
                        const nodePos = util.canvasPosToFrame(frameNode as any, pos);
            node.x = nodePos.x - width/2;
            node.y = nodePos.y - height/2;
            node.width = width;
            node.height = height;
            node.cname = oldValue.name;
        }
    }
    oldState =  state;
    oldValue = toolService.data;
});



function addComponent(name: string, event: MouseEvent) {
        pos.value.x = 0;
        pos.value.y = 0;
        toolService.set(service.ToolState.Component, {name});
        switch(name) {
            case 'button':
                example.value = exampleButton.value;
                break;
            case 'v-image':
                example.value = exampleImage.value;
                break;
            case 'v-image-list':
                example.value = exampleImageList.value;
                break;
            case 'v-avatar':
                example.value = exampleAvatar.value;
                break;
        }
        pos.value.x = - 999;
        pos.value.y = -999;
        event.preventDefault();
        event.stopPropagation();
}
function move(event: MouseEvent) {
    if (exampleShow.value && example.value) {
        pos.value.x = event.clientX - example.value.getBoundingClientRect().width / 2;
        pos.value.y = event.clientY - example.value.getBoundingClientRect().height / 2;
    }
}
function up(event: MouseEvent) {
    if (exampleShow.value && example.value) {
        exampleShow.value = false;
        toolService.cancel(service.ToolState.Component, {event});
    }
}

const example = ref<HTMLElement>();
const exampleButton = ref<HTMLElement>();
const exampleImage = ref<HTMLElement>();
const exampleImageList = ref<HTMLElement>();
const exampleAvatar = ref<HTMLElement>();
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
            <Button
                size="sm" class="w-80" :styles="buttonLight"
                @mousedown.stop="(event) => addComponent('button', event)"
            >
                按钮
            </Button>
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
        <div class="m-12">
            <h1>图片</h1>
            <div class="h-80">
                <i-image
                    :src="imageSrc"
                    @mousedown.stop="(event) => addComponent('v-image', event)"
                />
            </div>
            <div
                ref="exampleImage"
                :class="$style.example"
                :style="{
                    display: exampleShow ==='v-image' ? 'block' : 'none',
                    top: pos.y + 'px',
                    left: pos.x + 'px',
                }"
            >
                <div class="h-80">
                    <i-image
                        :src="imageSrc"
                    />
                </div>
            </div>
            <h1>图片集</h1>
            <div class="h-50">
                <i-image-list
                    :style="style" :images="imageList"
                    @mousedown.stop="(event) => addComponent('v-image-list', event)"
                />
            </div>

            <div
                ref="exampleImageList"
                :class="$style.example"
                :style="{
                    display: exampleShow ==='v-image-list' ? 'block' : 'none',
                    top: pos.y + 'px',
                    left: pos.x + 'px',
                }"
            >
                <div class="h-50">
                    <i-image-list
                        :style="style" :images="imageList"
                    />
                </div>
            </div>
            <h1>头像</h1>
            <i-avatar
                :is-show-avatar="isShowAvatar === '1'"
                :src="avatar"
                :title="avatarTitle"
                @mousedown.stop="(event) => addComponent('v-avatar', event)"
            />
            <div
                ref="exampleAvatar"
                :class="$style.example"
                :style="{
                    display: exampleShow ==='v-avatar' ? 'block' : 'none',
                    top: pos.y + 'px',
                    left: pos.x + 'px',
                }"
            >
                <i-avatar
                    :is-show-avatar="isShowAvatar === '1'"
                    :src="avatar"
                    :title="avatarTitle"
                />
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
.comp {
    font-size: 1.2rem;
    user-select: none;
    overflow-y: scroll;
    height: 100%;
}
</style>
