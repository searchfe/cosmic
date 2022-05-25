<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import { InputNumber } from 'cosmic-vue';
import { type Subject } from '@cosmic/core/rxjs';
import { MTitle, MWidget, service, inject } from '@cosmic/core/browser';
import { FramePrototypingMixin, BaseNodeMixin, FrameNode, RowsColsLayoutGrid } from '@cosmic/core/parts';
import { Button, Menu, MenuOption, Row, Col} from 'cosmic-vue';
import ButtonModeStyle from './component/button-mode.module.css';
import ButtonLightStyle from './component/button-light.module.css';
import ButtonSelectStyle from './component/button-select.module.css';
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
    fenceGutterSize: number,
    fenceCount: number,
    fenceVisible: boolean,

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
    fenceGutterSize: 10,
    fenceCount: 12,
    fenceVisible: true,
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

    if(n.layoutGrids?.length) {
        const g = n.layoutGrids[0];
        if (g.pattern === 'ROWS' || g.pattern === 'COLUMNS') {
            data.value.ladyoutModeSelectedValue = 'fence';
            data.value.fenceCount = g.count;
            data.value.fenceGutterSize = g.gutterSize;
            data.value.fenceVisible = g.visible || false;
        }

    } else if (n.layoutMode == 'NONE') {
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
        node.layoutGrids = [];
    } else if (event.value == 'flex') {
        node.layoutMode  ='HORIZONTAL';
        node.layoutGrids = [];
    } else if (event.value == 'fence') {
        const fence = new RowsColsLayoutGrid();
        node.layoutGrids = [fence];
        // node.layoutMode  ='FENCE';
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

function changeFence({count, gutterSize, visible}: {count?:number, gutterSize?: number, visible?: boolean}) {
    if (!node) return;
    let updated = false;
    const f = node.layoutGrids[0];
    if (f.pattern !== 'ROWS' && f.pattern !=='COLUMNS' ) return;
    if (count && count > 0 && count !== f.count) {
        updated = true;
        f.count = count;
    }
    if (gutterSize && gutterSize > 0 && gutterSize !== f.gutterSize) {
        updated = true;
        f.gutterSize = gutterSize;
    }
    if (visible !== undefined && visible !== f.visible) {
        updated = true;
        f.visible = visible;
    }
    if (updated) {
        node.resize(node.width, node.height);
        node.update();
    }
}

const options = layoutModeOptions.map(item => {return {id: item, label: layoutModeLabel[item]};});
</script>

<template>
    <div v-show="isShow" class="border-bottom" />
    <m-widget v-show="isShow">
        <!-- Widgrt Head Start -->
        <MTitle style="padding-left: 0;" :is-open="open">
            <template #prefix>
                <Menu size="sm" :value="data.ladyoutModeSelectedValue" :class="$style.menu" @on-change="layoutModeHandler">
                    <template #activator>
                        <Button class="justify-start font-bold" size="sm" :styles="ButtonModeStyle" @click="isOpen = true">
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
                        :styles="ButtonLightStyle"
                        :class="data.flexDirection == 'HORIZONTAL'? 'active': ''"
                        @click="() => changeFlexDirection('HORIZONTAL')"
                    >
                        <i-cosmic-order-x />
                    </Button>
                    <Button
                        size="sm -v-mx" class="square"
                        :styles="ButtonLightStyle"
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
                        :styles="ButtonLightStyle"
                        :class="data.layoutWrap == 'WRAP'? 'active': ''"
                        @click="() => changeFlexWrap()"
                    >
                        <i-cosmic-auto-break />
                    </Button>
                </Col>
            </Row>
            <Row v-show="data.ladyoutModeSelectedValue == 'fence'" :class="$style.row">
                <Col :span="4" class="mr-8">
                    <div :class="[$style['glyph-item']]">
                        <Menu size="sm" :value="data.ladyoutModeSelectedValue" :class="$style.menu" @on-change="(event) => {changeFence({count: Number(event.value)}); }">
                            <template #activator>
                                <Button class="justify-start" size="sm" :styles="ButtonSelectStyle" @click="isOpen = true">
                                    <template #prefix>
                                        <i-cosmic-line class="mr-6" style="transform:rotate(-90deg);" />
                                    </template>
                                    <span class="block min-w-20">{{ data.fenceCount }}N</span>
                                    <template #subfix>
                                        <i-cosmic-arrow-down class="ml-8" style="font-size:8px;" />
                                    </template>
                                </Button>
                            </template>
                            <MenuOption
                                v-for="d of [6, 8, 10, 12, 16, 18, 20, 24]" :key="d" :value="d" :label="'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+d+'N'" :has-check="false" :selected="data.fenceCount==d"
                            />
                        </Menu>
                    </div>
                </Col>
                <Col :span="1" />
                <Col :span="4" class="mr-8">
                    <div :class="[$style['glyph-item']]">
                        <InputNumber
                            size="sm"
                            :value="data.fenceGutterSize"
                            @on-input="(event) => {changeFence({gutterSize: Number(event.value)}); }"
                        >
                            <template #prefix>
                                <i-cosmic-spacing-x :class="[$style.icon]" />
                            </template>
                        </InputNumber>
                    </div>
                </Col>
                <Col
                    class="flex flex-row-reverse relative"
                    :class="[$style.col]"
                    :span="2"
                >
                    <Button size="sm -v-mx" class="square" :styles="ButtonLightStyle" @click="() => {changeFence({visible: !data.fenceVisible}); }">
                        <template v-if="data.fenceVisible">
                            <i-cosmic-eye-open />
                        </template>
                        <template v-else>
                            <i-cosmic-eye-closed />
                        </template>
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
                    <Button size="sm -v-mx" class="square" :styles="ButtonLightStyle" :class="overflowY? 'active': ''" @click="overflowY = !overflowY">
                        <i-cosmic-scroll-y />
                    </Button>
                    <Button size="sm -v-mx" class="square" :styles="ButtonLightStyle" :class="overflowX? 'active': ''" @click="overflowX = !overflowX">
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
