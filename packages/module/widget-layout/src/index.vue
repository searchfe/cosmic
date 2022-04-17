<script lang="ts" setup>
import { ref, watchEffect, type Ref } from 'vue';
import { type Subject } from '@cosmic/core/rxjs';
import { MTitle, MWidget, service } from '@cosmic/core/browser';
import { inject, PageNode, type SceneNode, SolidPaint, BaseNodeMixin } from '@cosmic/core/parts';
import { Button, Menu, MenuOption, Row, Col} from 'cosmic-vue';
import ButtonModeStyle from './component/button-mode.module.css';
import ButtoLightStyle from './component/button-light.module.css';

import PaddingInput from './component/padding-input.vue';



const isShow = ref(true);
const nodeService = inject<service.NodeService>(service.TOKENS.Node);
let subject: Subject<BaseNodeMixin>;

const data = ref({
    x: 0, y: 0, width: 0, height: 0, isHideColor: false,
    fillStyle: new SolidPaint(),
});


let node: SceneNode;
nodeService.selection.subscribe(nodes => {
    isShow.value = false;
    if (node instanceof PageNode) {
        return;
    }
    nodeService.unwatch(subject);
    if (nodes.length) {
        node = nodes[0] as SceneNode;
        subject = nodeService.watch(node);
        subject.subscribe((n) => {
            toData(n as SceneNode);
        });
        toData(node);
        isShow.value = true;
    }

});


function toData(node: SceneNode) {
    data.value.x = node.x;
    data.value.y = node.y;
    data.value.width = node.width;
    data.value.height = node.height;
    // if (hasMixin(node, ContainerMixin) && node.backgrounds && node.backgrounds[0]) {
    //     data.value.isHideColor = false;
    //     data.value.fillStyle = node.backgrounds[0];
    // } else {
    //     data.value.isHideColor = true;
    //     data.value.fillStyle = new SolidPaint();
    // }
}

// function change(event) {
//     const [r, g, b] = event.colorObj.color;
//     node.backgrounds = [{
//         color: {r, g, b},
//         opacity: event.opacity,
//         type: 'SOLID',
//     }];
//     if(node) node.update();
// }
type OverflowType = 'visible' | 'hidden' | 'overflow-x' | 'overflow-y';
const isOpen = ref(true);
const overflow = ref('visible') as Ref<OverflowType>;

const overflowX = ref(false);
const overflowY = ref(false);

watchEffect(() => {
    // if(overflowX.value == false && overflowY.value == false) {
    //     // overflow.value ='visible';
    // } else if(overflowX.value == true && overflowY.value == true) {
    //     overflow.value = 'hidden';
    // } else if (overflowX.value == true) {
    //     overflow.value = 'overflow-x';
    // } else {
    //     overflow.value = 'overflow-y';
    // }
});

</script>

<template>
    <m-widget v-show="isShow">
        <MTitle style="padding-left: 0;" :is-open="open" @on-click="boardSwitch">
            <template #prefix>
                <Menu size="sm" value="0" :class="$style.menu" @on-change="handler">
                    <template #activator>
                        <Button class="justify-start" size="sm" :styles="ButtonModeStyle" @click="isOpen = true">
                            自由布局
                            <template #subfix>
                                <i-cosmic-select-up-down />
                            </template>
                        </Button>
                    </template>
                    <MenuOption
                        v-for="data of [
                            { id: 'save', label: '自由布局' },
                            { id: 'new', label: '自适应' },
                            { id: 'open', label: '栅格' },
                        ]" :key="data.id" :value="data.id" :label="data.label" :has-check="false"
                    />
                </Menu>
            </template>
            <i-cosmic-arrow-up v-if="isOpen" @click="isOpen = flase" />
            <i-cosmic-arrow-down v-else @click="isOpen = true" />
        </MTitle>
        <div v-show="isOpen">
            <Row :class="$style.row">
                <Col
                    class="flex"
                    :class="$style.col"
                    :span="7"
                >
                    <padding-input />
                </Col>
            </Row>
            <Row :class="$style.row">
                <Col
                    class="flex"
                    :class="$style.col"
                    :span="7"
                    @click="overflow=overflow=='visible' ? 'hidden': 'visible'"
                >
                    <div class="-v-px -v-text sm" :class="[$style['flow-icon'], overflow == 'visible' ? 'off' : 'on']">
                        <i-cosmic-select-off v-if="overflow == 'visible'" class="align-middle" />
                        <i-cosmic-select-on v-else class="align-middle" />
                    </div>
                    <div>内容超出隐藏</div>
                </Col>
                <Col
                    class="flex flex-row-reverse relative"
                    :class="[$style.col, $style['flow-icons']]"
                    :span="7"
                >
                    <Button size="sm -v-mx" class="square" :styles="ButtoLightStyle" :class="overflowY? 'active': ''" @click="overflowY = !overflowY">
                        <i-cosmic-scroll-y />
                    </Button>
                    <Button size="sm -v-mx" class="square" :styles="ButtoLightStyle" :class="overflowX? 'active': ''" @click="overflowX = !overflowX">
                        <i-cosmic-scroll-x />
                    </Button>
                </Col>
            </Row>
        </div>
    </m-widget>
</template>


 <style module>
.menu {
    font-size: 1.2rem;
}

.row {
    composes: mb-10 from global;
}

.icon {
    font-size: 1rem;
}

.lock-icon {
    flex: 0 0 2.4rem;
    margin-left: .8rem;
    /* background-color: red */
}

.col {
    margin-right: .8rem;
    font-size: 1.2rem;
}
.flow-icon {
    color: var(--color-primary-500);
}
.flow-icon:global(.off) {
    color: var(--color-gray-300);
}

.flow-icons{
    top: -0.4rem;
    --font-sm: 1.3rem;
}
</style>
