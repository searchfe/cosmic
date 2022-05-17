<script lang="ts" setup>
import { ref, watchEffect, type Ref } from 'vue';
import { InputNumber } from 'cosmic-vue';
import { type Subject } from '@cosmic/core/rxjs';
import { MTitle, MWidget, service, inject } from '@cosmic/core/browser';
import { FramePrototypingMixin, BaseNodeMixin, FrameNode } from '@cosmic/core/parts';
import { Button, Menu, MenuOption, Row, Col} from 'cosmic-vue';
import ButtonModeStyle from './component/button-mode.module.css';
import ButtoLightStyle from './component/button-light.module.css';
import { round } from '@cosmic/core/lodash';

import PaddingInput from './component/padding-input.vue';
import FlexArrange from './component/flex-arrange.vue';

import { layoutModeLabel, layoutModeOptions } from './common/layout-mode';
import InputStyle from './component/input.module.css';


interface LayoutProps {
    ladyoutModeSelectedValue: string,
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
    paddingLeft: number;
    flexDirection: string; // 'HORIZONTAL' | 'VERTICAL'
    layoutWrap: string;
    primaryAxisAlignItems: string;
    counterAxisAlignItems: string;

}


const data: Ref<LayoutProps>  = ref({
    ladyoutModeSelectedValue: 'NONE',
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    flexDirection: 'HORIZONTAL',
    layoutWrap: 'NONE',
    primaryAxisAlignItems: 'MIN',
    counterAxisAlignItems: 'MIN',
});


const isShow = ref(false);
const nodeService = inject<service.NodeService>(service.TOKENS.Node);
let subject: Subject<BaseNodeMixin>;


let node: FrameNode | undefined;
nodeService.selection.subscribe(nodes => {
    isShow.value = false;
    node = undefined;
    nodeService.unwatch(subject);
    if (nodes.length) {
        node = nodes[0] as FrameNode;
        if (!(node instanceof FrameNode)) {
            return;
        }
        subject = nodeService.watch(node);
        subject.subscribe((n) => {
            toData(n as FrameNode);
        });
        toData(node);
        isShow.value = true;
    }

});

function toData(n: FrameNode & FramePrototypingMixin) {
    data.value.paddingTop = n.paddingTop || 0;
    data.value.paddingRight = n.paddingRight || 0;
    data.value.paddingBottom = n.paddingBottom || 0;
    data.value.paddingLeft = n.paddingLeft || 0;
    if (n.layoutMode == 'NONE') {
        data.value.ladyoutModeSelectedValue = 'absolute';
    } else if(n.layoutMode == 'HORIZONTAL' || n.layoutMode == 'VERTICAL') {
        data.value.ladyoutModeSelectedValue = 'flex';
    }
    if (n.overflowDirection == 'NONE') {
        overflow.value = 'hidden';
    } else {
        overflow.value = 'visible';
    }
    data.value.layoutWrap = n.layoutWrap;
    data.value.primaryAxisAlignItems = n.primaryAxisAlignItems;
    data.value.counterAxisAlignItems = n.counterAxisAlignItems;
}

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
function changePadding(event: any) {
    if(!node) return;
    node.paddingTop = event.value.top;
    node.paddingRight = event.value.right;
    node.paddingBottom = event.value.bottom;
    node.paddingLeft = event.value.left;
    node.resize(node.width, node.height);
    node.update();
}
function changeOverflow() {
    overflow.value = overflow.value == 'visible' ? 'hidden': 'visible';
    if(!node) return;
    if (overflow.value === 'hidden') {
        node.overflowDirection = 'NONE';
    } else {
        node.overflowDirection = 'BOTH';
    }
    node.update();

}
function layoutModeHandler(event: any) {
    if (!node) return;
    if (event.value == 'absolute') {
        node.layoutMode  ='NONE';
    } else if (event.value == 'flex') {
        node.layoutMode  ='HORIZONTAL';
    } else {
        //
    }
    node.resize(node.width, node.height);
    node.update();
}
function changeFlexDirection(dir: 'HORIZONTAL' | 'VERTICAL') {
    if (!node) return;
    data.value.flexDirection = dir;
    node.layoutMode = dir;
    node.resize(node.width, node.height);
    node.update();
}
function changeItemSpacing({event}: {event: InputEvent}) {
    if (!node) return;
    const val = round(parseFloat((event?.target as HTMLInputElement)?.value),  1);
    node.itemSpacing = val;
    node.resize(node.width, node.height);
    node.update();
}
function changeFlexWrap() {
    if (!node) return;
    node.layoutWrap = node.layoutWrap == 'NONE' ? 'WRAP' : 'NONE';
    node.resize(node.width, node.height);
    node.update();
}
function changePrimaryAxisAlignItems(value: any) {
    if (!node) return;
    node.primaryAxisAlignItems = value;
    node.resize(node.width, node.height);
    node.update();
}
function changeItems({justify, align}: {justify: any, align: any}) {
    if (!node) return;
    node.primaryAxisAlignItems = justify;
    node.counterAxisAlignItems = align;
    node.resize(node.width, node.height);
    node.update();
}

const options = layoutModeOptions.map(item => {return {id: item, label: layoutModeLabel[item]};});
</script>

<template>
    <div v-show="isShow" class="border-bottom" />
    <m-widget v-show="isShow">
        <!-- Widgrt Head Start -->
        <MTitle style="padding-left: 0;" :is-open="open" @on-click="boardSwitch">
            <template #prefix>
                <Menu size="sm" :value="data.ladyoutModeSelectedValue" :class="$style.menu" @on-change="layoutModeHandler">
                    <template #activator>
                        <Button class="justify-start" size="sm" :styles="ButtonModeStyle" @click="isOpen = true">
                            {{ layoutModeLabel[data.ladyoutModeSelectedValue] }}
                            <template #subfix>
                                <i-cosmic-select-up-down />
                            </template>
                        </Button>
                    </template>
                    <MenuOption
                        v-for="d of options" :key="d.id" :value="d.id" :label="d.label" :has-check="false"
                    />
                </Menu>
            </template>
            <i-cosmic-arrow-up v-if="isOpen" @click="isOpen = flase" />
            <i-cosmic-arrow-down v-else @click="isOpen = true" />
        </MTitle>
        <!-- Widgrt Head End -->
        <div v-show="isOpen">
            <Row v-show="data.ladyoutModeSelectedValue == 'flex'" :class="$style.row">
                <Col
                    class="flex"
                    :class="[$style.col]"
                    :span="3"
                >
                    <!-- Layout Direction Start -->
                    <Button
                        size="sm -v-mx" class="square"
                        :styles="ButtoLightStyle"
                        :class="data.flexDirection == 'HORIZONTAL'? 'active': ''"
                        @click="() => changeFlexDirection('HORIZONTAL')"
                    >
                        <i-cosmic-order-x />
                    </Button>
                    <Button
                        size="sm -v-mx" class="square"
                        :styles="ButtoLightStyle"
                        :class="data.flexDirection == 'VERTICAL'? 'active': ''"
                        @click="() => changeFlexDirection('VERTICAL')"
                    >
                        <i-cosmic-order-y />
                    </Button>
                    <!-- Layout Direction End-->
                </Col>
                <Col
                    class="flex"
                    :class="[$style.col]"
                    :span="3"
                >
                    <!-- Item Spacing Start -->
                    <input-number
                        size="sm" :controls="false"
                        :class="isShowPopup? 'active': ''"
                        :value="sum" :styles="InputStyle"
                        @on-change="changeItemSpacing"
                    >
                        <template #prefix>
                            <i-cosmic-spacing-x />
                        </template>
                    </input-number>
                    <!-- Layout Direction End-->
                </Col>
                <Col
                    class="flex flex-row-reverse relative"
                    :class="[$style.col, $style['flow-icons']]"
                    :span="7"
                >
                    <flex-arrange
                        :flex-direction="data.flexDirection"
                        :primary-axis-align-items="data.primaryAxisAlignItems"
                        :counter-axis-align-items="data.counterAxisAlignItems"
                        @primary-axis-align-items="changePrimaryAxisAlignItems"
                        @change="changeItems"
                    />
                    <Button
                        size="sm -v-mx"
                        class="square"
                        :styles="ButtoLightStyle"
                        :class="data.layoutWrap == 'WRAP'? 'active': ''"
                        @click="() => changeFlexWrap()"
                    >
                        <i-cosmic-auto-break />
                    </Button>
                </Col>
            </Row>
            <Row :class="$style.row">
                <Col
                    class="flex"
                    :class="$style.col"
                    :span="7"
                >
                    <padding-input
                        :data="{
                            top: data.paddingTop,
                            right: data.paddingRight,
                            bottom: data.paddingBottom,
                            left: data.paddingLeft,
                        }"
                        @on-change="changePadding"
                    />
                </Col>
            </Row>
            <Row :class="$style.row">
                <Col
                    class="flex"
                    :class="$style.col"
                    :span="7"
                    @click="changeOverflow"
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
