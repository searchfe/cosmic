<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import { type Subject } from '@cosmic/core/rxjs';
import { MTitle, MWidget, service } from '@cosmic/core/browser';
import { inject, BaseNodeMixin, LayoutMixin, SceneNode, hasMixin, ConstraintType, ConstraintMixin } from '@cosmic/core/parts';
import { Select, SelectOption, Row, Col} from 'cosmic-vue';
import StateHelper from './common/state-helper';

import {
        VerticalStretchValue,
        HorizontalStretchValue,
        HorizontalConstraintOptions, 
        VerticalConstraintOptions,
    } from './common/data';

interface LayoutData {
    // layoutAlign: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH' | 'INHERIT';
    HorizontalStretch: number,
    VerticalStretch: number,
}


const data: Ref<LayoutData>  = ref({
    HorizontalStretch: 0,
    VerticalStretch: 0,

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

function toData(node: LayoutMixin & ConstraintMixin) {
    data.value.VerticalStretch = node.VerticalStretch || 0;
    data.value.HorizontalStretch = node.HorizontalStretch || 0;
    constraints.value.horizontal = node.constraints.horizontal;
    constraints.value.vertical = node.constraints.vertical;
    stateHelper.updateHelper(node.constraints);
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
            <Row v-show="false" :class="$style.row">
                <Col
                    class="flex"
                    :class="$style.col"
                    :span="5"
                >
                    <Select
                        size="sm"
                        :value="data.HorizontalStretch"
                        @on-change="({value}) => {node.HorizontalStretch = parseInt(value); node.update();}"
                    >
                        <template #prefix>
                            <i-cosmic-offset-x v-if="data.HorizontalStretch == 0" />
                            <i-cosmic-scale-x v-else />
                        </template>
                        <select-option
                            v-for="sv of HorizontalStretchValue"
                            :key="sv.value"
                            :value="sv.value"
                            :label="sv.label"
                        />
                    </Select>
                </Col>
                <!-- <Col :span="1" /> -->
                <Col
                    class="flex"
                    :class="$style.col"
                    :span="5"
                >
                    <Select
                        size="sm"
                        :value="data.VerticalStretch"
                        @on-change="({value}) => {node.VerticalStretch = parseInt(value); node.update();}"
                    >
                        <template #prefix>
                            <i-cosmic-offset-y v-if="data.VerticalStretch == 0" />
                            <i-cosmic-scale-y v-else />
                        </template>
                        <select-option
                            v-for="sv of VerticalStretchValue"
                            :key="sv.value"
                            :value="sv.value"
                            :label="sv.label"
                        />
                    </Select>
                </Col>
            </Row>
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
