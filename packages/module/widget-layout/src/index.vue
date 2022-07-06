<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import { type Subject } from '@cosmic/core/rxjs';
import { MTitle, MWidget, service, inject } from '@cosmic/core/browser';
import { BaseNodeMixin, LayoutMixin, SceneNode, hasMixin, ConstraintType, ConstraintMixin, BaseFrameMixin } from '@cosmic/core/parts';
import { Select, SelectOption, Row, Col, Button, Menu, MenuOption} from 'cosmic-vue';
import StateHelper from './common/state-helper';
import ButtonSelectStyle from './component/button-select.module.css';

import {
        HorizontalConstraintOptions,
        VerticalConstraintOptions,
    } from './common/data';

interface LayoutData {
    // layoutAlign: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH' | 'INHERIT';
    layoutMode: 'NONE' | 'FLEX' | 'FENCE' | 'GRID',
    colSize: number,
    colSizes: number[],
    rowSize: number,
    rowSizes: number[],
}


const data: Ref<LayoutData>  = ref({
    layoutMode: 'NONE',

} as LayoutData);


const isShow = ref(false);
const isOpen = ref(true);
const nodeService = inject<service.NodeService>(service.TOKENS.Node);
let subject: Subject<BaseNodeMixin>;


let node: SceneNode | undefined;
nodeService.selection.subscribe(nodes => {
    isShow.value = false;
    node = undefined;
    nodeService.unwatch(subject as any);
    if (nodes.length) {
        node = nodes[0] as SceneNode;
        if (!hasMixin(node, LayoutMixin) || !hasMixin(node.parent, LayoutMixin)) {
            return;
        }
        subject = nodeService.watch(node);
        subject.subscribe((n) => {
            toData(n as any);
        });
        toData(node as any);
        isShow.value = true;
    }
});

const constraints = ref({
    horizontal: ConstraintType.MIN,
    vertical: ConstraintType.MIN,
});

const stateHelper = new StateHelper();
const helper = stateHelper.state;

function toData(node: LayoutMixin & ConstraintMixin & BaseNodeMixin) {
    constraints.value.horizontal = node.constraints.horizontal;
    constraints.value.vertical = node.constraints.vertical;
    stateHelper.updateHelper(node.constraints);
    const parent = node.parent;
    if(!parent || !hasMixin(parent, BaseFrameMixin)) return;
    const layoutGrid = parent.layoutGrids?.[0];
    if (layoutGrid) {
        if (layoutGrid.pattern ==='GRID') {
            data.value.layoutMode = 'GRID';
        } else {
        // } else if(layoutGrid.pattern === 'ROWS'){
            data.value.layoutMode = 'FENCE';
            data.value.colSize = node.colSize;
            data.value.colSizes = [...Array(layoutGrid.count)].map((i, k) => k + 1);
            data.value.rowSize = node.rowSize;
            data.value.rowSizes = [...Array(layoutGrid.count)].map((i, k) => k + 1);
        // } else if(layoutGrid.pattern === 'COLUMNS'){
        }
    } else if (parent.layoutMode === 'NONE') {
        data.value.layoutMode = 'NONE';
    } else if (parent.layoutMode === 'HORIZONTAL' || parent.layoutMode === 'VERTICAL') {
        data.value.layoutMode = 'FLEX';
    }
}
function setHelper(type: 'x' | 'y' | 'left' | 'right' | 'top' | 'bottom') {
    helper.value[type] = !helper.value[type];
    if(!node || !hasMixin(node, ConstraintMixin)) return;
    if(helper.value.x && helper.value.left && helper.value.right) {
        node.constraints.horizontal = ConstraintType.SCALE;
    } else if(helper.value.x && (helper.value.left || helper.value.right)) {
        node.constraints.horizontal = helper.value.left ? ConstraintType.MIN : ConstraintType.MAX;
    } else if(helper.value.left && helper.value.right) {
        node.constraints.horizontal = ConstraintType.STRETCH;
    } else if(helper.value.x) {
        node.constraints.horizontal = ConstraintType.CENTER;
    } else if (helper.value.right) {
        node.constraints.horizontal = ConstraintType.MAX;
    } else if(helper.value.left) {
        node.constraints.horizontal = ConstraintType.MIN;
    }
    if(helper.value.y && helper.value.top && helper.value.bottom) {
        node.constraints.vertical = ConstraintType.SCALE;
    } else if(helper.value.y && (helper.value.top || helper.value.bottom)) {
        node.constraints.vertical = helper.value.top ? ConstraintType.MIN : ConstraintType.MAX;
    } else if(helper.value.top && helper.value.bottom) {
        node.constraints.vertical = ConstraintType.STRETCH;
    } else if(helper.value.y) {
        node.constraints.vertical = ConstraintType.CENTER;
    } else if (helper.value.bottom) {
        node.constraints.vertical = ConstraintType.MAX;
    } else if(helper.value.top) {
        node.constraints.vertical = ConstraintType.MIN;
    }
    node.update();
}

function changeFence({colSize, rowSize}: {colSize?: number, rowSize?: number}) {
    if (!node) return;
    let updated = false;
    if (colSize && colSize !== data.value.colSize) {
        updated = true;
        node.colSize = colSize;
    }
    if (rowSize && rowSize !== data.value.rowSize) {
        updated = true;
        node.rowSize = rowSize;
    }
    if (updated) {
        node.resize(node.width, node.height);
        node.update();
    }
}
</script>

<template>
    <div v-show="isShow" class="border-bottom" />
    <m-widget v-show="isShow">
        <MTitle :is-open="open" @on-click="boardSwitch">
            <template #prefix>
                大小 & 位置
            </template>
            <i-cosmic-arrow-up v-if="isOpen" @click="isOpen = flase" />
            <i-cosmic-arrow-down v-else @click="isOpen = true" />
        </MTitle>
        <div v-show="isOpen">
            <template v-if="data.layoutMode == 'NONE'">
                <Row :class="$style.row">
                    <Col
                        class="flex ml-6"
                        :class="$style.col"
                        :span="4"
                    >
                        <!-- #546BFF -->
                        <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" :class="$style.helper">
                            <g fill="none" fill-rule="evenodd">
                                <rect stroke="#E0E0E0" fill="#FFF" x=".5" y=".5" width="63" height="63" rx="4" />
                                <rect stroke="#25252B" x="20.5" y="20.5" width="23" height="23" rx="4" />
                                <path d="M23 23h18v18H23z" />
                                <path dirs d="M28 32.5v-1.5h8v1.5z" :class="helper.x?'active':''" @click="() => setHelper('x')" />
                                <path dirs d="M31.5 28h1.5v8h-1.5z" :class="helper.y?'active':''" @click="() => setHelper('y')" />
                                <path dirp d="M5 32.75v-1.5h10v1.5z" :class="helper.left?'active':''" @click="() => setHelper('left')" />
                                <path dirp d="M31.25 50.25h1.5v8h-1.5z" :class="helper.bottom?'active':''" @click="() => setHelper('bottom')" />
                                <path dirp d="M50.25 32.75v-1.5h8v1.5z" :class="helper.right?'active':''" @click="() => setHelper('right')" />
                                <path dirp d="M31.25 5.25h1.5v10h-1.5z" :class="helper.top?'active':''" @click="() => setHelper('top')" />
                            </g>
                        </svg>
                    </Col>
                    <!-- Constraints Selection Start -->
                    <Col
                        class="flex flex-col"
                        :class="$style.col"
                        :span="5"
                    >
                        <Select
                            size="sm" :value="constraints.horizontal"
                            @on-change="({ value }) => { node.constraints.horizontal = value; }"
                        >
                            <select-option
                                v-for="sv of HorizontalConstraintOptions" :key="sv.value" :value="sv.value"
                                :label="sv.label"
                            />
                        </Select>
                        <Select
                            class="mt-6"
                            size="sm" :value="constraints.vertical"
                            @on-change="({ value }) => { node.constraints.vertical = value; }"
                        >
                            <select-option
                                v-for="sv of VerticalConstraintOptions" :key="sv.value" :value="sv.value"
                                :label="sv.label"
                            />
                        </Select>
                    </Col>
                    <!-- Constraints Selection End -->
                </Row>
            </template>
            <!-- FENCE START -->
            <template v-else-if="data.layoutMode =='FENCE'">
                <Row :class="$style.row">
                    <Col :span="5" class="mr-8">
                        <div :class="[$style['glyph-item']]">
                            <Menu size="sm" :value="data.colSize" :class="$style.menu" @on-change="(event) => {changeFence({colSize: Number(event.value)}); }">
                                <template #activator>
                                    <Button class="justify-start" size="sm" :styles="ButtonSelectStyle" @click="isOpen = true">
                                        <template #prefix>
                                            <i-cosmic-line class="mr-6" style="transform:rotate(-90deg);" />
                                        </template>
                                        <span class="block min-w-20">{{ data.colSize }}N</span>
                                        <template #subfix>
                                            <i-cosmic-arrow-down class="ml-8" style="font-size:8px;" />
                                        </template>
                                    </Button>
                                </template>
                                <MenuOption
                                    v-for="d of data.colSizes" :key="d" :value="d" :label="'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+d+'N'" :has-check="false" :selected="data.colSize==d"
                                />
                            </Menu>
                        </div>
                    </Col>
                    <Col :span="5" class="mr-8">
                        <div :class="[$style['glyph-item']]">
                            <Menu size="sm" :value="data.rowSize" :class="$style.menu" @on-change="(event) => {changeFence({rowSize: Number(event.value)}); }">
                                <template #activator>
                                    <Button class="justify-start" size="sm" :styles="ButtonSelectStyle" @click="isOpen = true">
                                        <template #prefix>
                                            <i-cosmic-line class="mr-6" />
                                        </template>
                                        <span class="block min-w-20">{{ data.rowSize }} 行</span>
                                        <template #subfix>
                                            <i-cosmic-arrow-down class="ml-8" style="font-size:8px;" />
                                        </template>
                                    </Button>
                                </template>
                                <MenuOption
                                    v-for="d of data.rowSizes" :key="d" :value="d" :label="'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+d+' 行'" :has-check="false" :selected="data.rowSize==d"
                                />
                            </Menu>
                        </div>
                    </Col>
                </Row>
            </template>
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
.helper [dirp], .helper [dirs]{
    fill: #25252B;
    cursor: pointer;
    stroke-width: 3px;
    stroke: transparent;
}
.helper [dirs]{
    stroke-width: 1.5px;
}
.helper [dirp]:global(.active), .helper [dirs]:global(.active){
    fill: var(--color-primary-500);
}
</style>
