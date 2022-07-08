<script lang="ts" setup>
import {ref, type Ref} from 'vue';
import { MWidget, service, inject } from '@cosmic/core/browser';
import { PageNode, hasMixin, ContainerMixin, type SceneNode, type Paint, SolidPaint, BaseNodeMixin, BaseFrameMixin, util } from '@cosmic/core/parts';
import { Row, Col, InputNumber, Select, SelectOption } from 'cosmic-vue';
import { type Subject } from '@cosmic/core/rxjs';
import { getAxisSizingOptions, type AxisSizingType } from './data';


const isShow = ref(false);
const nodeService = inject<service.NodeService>(service.TOKENS.Node);
let subject: Subject<BaseNodeMixin>;

interface FramePorps {
    id: number,
    x: number,
    y: number,
    width: number,
    height: number,
    isHideColor: boolean,
    fillStyle: Paint;
    primaryAxisSizingMode: string,
    counterAxisSizingMode: string,
    primaryAxisSizingOptions: AxisSizingType[],
    counterAxisSizingOptions: AxisSizingType[],
}

const data: Ref<FramePorps>  = ref({
    id: 0,
    x: 0, y: 0, width: 0, height: 0, isHideColor: false,
    fillStyle: new SolidPaint(),
    primaryAxisSizingMode: 'FIXED',
    counterAxisSizingMode: 'FIXED',
    primaryAxisSizingOptions: [],
    counterAxisSizingOptions: [],
});


let node: SceneNode;
nodeService.selection.subscribe(nodes => {
    isShow.value = false;
    if(node instanceof PageNode) {
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
    if (hasMixin(node, BaseFrameMixin)) {
        data.value.primaryAxisSizingMode = node.primaryAxisSizingMode;
        data.value.counterAxisSizingMode = node.counterAxisSizingMode;
    }
    const mode = util.getLayoutMode(node as any);
    const parentMode = util.getLayoutMode((node?.parent as any));
    data.value.primaryAxisSizingOptions = getAxisSizingOptions('primary', mode, parentMode);
    data.value.counterAxisSizingOptions = getAxisSizingOptions('counter', mode, parentMode);
    data.value.id = new Date().getTime(); // to fix selection-option bug
    data.value.x = node.x;
    data.value.y = node.y;
    data.value.width = node.width;
    data.value.height = node.height;
    if (hasMixin(node, ContainerMixin) && node.backgrounds && node.backgrounds[0]) {
        data.value.isHideColor = false;
        data.value.fillStyle = node.backgrounds[0];
    } else {
        data.value.isHideColor = true;
        data.value.fillStyle = new SolidPaint();
    }
}

function update(key: 'x' | 'y' | 'width' | 'height', value: any) {
    node[key] = value;
    node.update();
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
function updateAxisSizing(type: 'primary' | 'counter', value: any) {
    if (hasMixin(node, BaseFrameMixin)) {
        if (type === 'primary') {
            node.primaryAxisSizingMode = value;
        } else {
            node.counterAxisSizingMode = value;
        }
        node.update();
    }
}
</script>

<template>
    <m-widget v-show="isShow">
        <!-- <m-title title="布局" /> -->
        <div class="mt-20 mb-8">
            <div class="flex justify-between items-center">
                <div>
                    <Row :class="$style.row">
                        <Col :span="6" class="mr-8">
                            <div :class="[$style['glyph-item']]">
                                <input-number
                                    size="sm"
                                    :value="data.x"
                                    @on-input="(event) => { update('x', Number(event.value))}"
                                >
                                    <template #prefix>
                                        <i-cosmic-x :class="[$style.icon]" />
                                    </template>
                                </input-number>
                            </div>
                        </Col>
                        <Col :span="6">
                            <div :class="[$style['glyph-item']]">
                                <input-number
                                    size="sm"
                                    :value="data.y"
                                    @on-input="(event) => { update('y', Number(event.value))}"
                                >
                                    <template #prefix>
                                        <i-cosmic-y :class="[$style.icon]" />
                                    </template>
                                </input-number>
                            </div>
                        </Col>
                    </Row>
                    <Row :class="$style.row">
                        <Col :span="6" class="mr-8">
                            <div :class="[$style['glyph-item']]">
                                <input-number
                                    size="sm"
                                    :class="$style.input"
                                    :disabled="data.primaryAxisSizingMode !== 'NONE'"
                                    :value="data.width"
                                    @on-input="(event) => { update('width', Number(event.value))}"
                                >
                                    <template #prefix>
                                        <i-cosmic-w :class="[$style.icon]" />
                                    </template>
                                </input-number>
                            </div>
                        </Col>
                        <Col :span="6">
                            <div :class="[$style['glyph-item']]">
                                <input-number
                                    size="sm"
                                    :class="$style.input"
                                    :disabled="data.counterAxisSizingMode !== 'NONE'"
                                    :value="data.height"
                                    @on-input="(event) => { update('height', Number(event.value))}"
                                >
                                    <template #prefix>
                                        <i-cosmic-h :class="[$style.icon]" />
                                    </template>
                                </input-number>
                            </div>
                        </Col>
                    </Row>
                    <Row :class="$style.row">
                        <Col
                            class="flex mr-4"
                            :span="6"
                        >
                            <Select
                                :key="data.id"
                                size="sm"
                                :value="data.primaryAxisSizingMode"
                                @on-change="({value}) => {updateAxisSizing('primary', value)}"
                            >
                                <template #prefix>
                                    <i-cosmic-offset-x />
                                    <!-- <i-cosmic-scale-x /> -->
                                </template>
                                <select-option
                                    v-for="sv of data.primaryAxisSizingOptions"
                                    :key="sv.value"
                                    :value="sv.value"
                                    :label="sv.label"
                                />
                            </Select>
                        </Col>
                        <!-- <Col :span="1" /> -->
                        <Col
                            class="flex"
                            :span="6"
                        >
                            <Select
                                :key="data.id"
                                size="sm"
                                :value="data.counterAxisSizingMode"
                                @on-change="({value}) => {updateAxisSizing('counter', value)}"
                            >
                                <template #prefix>
                                    <i-cosmic-offset-y />
                                </template>
                                <select-option
                                    v-for="sv of data.counterAxisSizingOptions"
                                    :key="sv.value"
                                    :value="sv.value"
                                    :label="sv.label"
                                />
                            </Select>
                        </Col>
                    </Row>
                </div>
                <div :class="$style['lock-icon']">
                    <i-cosmic-lock />
                </div>
            </div>
            <!-- <m-color
                v-if="!data.isHideColor"
                :color-style="data.fillStyle"
                @on-change="change"
            /> -->
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
    margin-top: -4rem;
    /* background-color: red */
}
.input input[disabled] {
    opacity: 0.3;
}
 </style>
