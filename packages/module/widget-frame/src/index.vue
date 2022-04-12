<script lang="ts" setup>
import {ref, type Ref} from 'vue';
import { MTitle, MWidget, MColor, service } from '@cosmic/core/browser';
import { inject, PageNode, hasMixin, ContainerMixin, type SceneNode, type Paint, SolidPaint } from '@cosmic/core/parts';
import { Row, Col, InputNumber } from 'cosmic-vue';


const nodeService = inject<service.NodeService>(service.TOKENS.Node);

interface FramePorps {
    x: number,
    y: number,
    width: number,
    height: number,
    isHideColor: boolean,
    fillStyle: Paint;
}

const data: Ref<FramePorps>  = ref({
    x: 0, y: 0, width: 0, height: 0, isHideColor: false,
    fillStyle: new SolidPaint(),
});


let node: SceneNode;
nodeService.selection.subscribe(nodes => {
    if(node instanceof PageNode) {
        return;
    }
    nodeService.unwatch(node);
    node = nodes[0] as SceneNode;
    nodeService.watch(node).subscribe((n) => {
        toData(n);
    });
    toData(node);
});


function toData(node: SceneNode) {
    data.value.x = node.x;
    data.value.y = node.y;
    data.value.width = node.width;
    data.value.height = node.height;
    if (hasMixin(node, ContainerMixin) && node.backgrounds && node.backgrounds[0]) {
        data.value.isHideColor = true;
        data.value.fillStyle = node.backgrounds[0];
    } else {
        data.value.isHideColor = false;
        data.value.fillStyle = new SolidPaint();
    }
}

function update(key: 'x' | 'y' | 'width' | 'height', value: any) {
    node[key] = value;
    node.update();
}

function change(event) {
    const [r, g, b] = event.colorObj.color;
    node.backgrounds = [{
        color: {r, g, b},
        opacity: event.opacity,
        type: 'SOLID',
    }];
    if(node) node.update();
}
</script>

<template>
    <m-widget>
        <m-title title="布局" />
        <div class="mb-10">
            <Row :class="$style.row">
                <Col :span="6">
                    <div :class="[$style['glyph-item']]" class="w-80">
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
                    <div :class="[$style['glyph-item']]" class="w-80">
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
                <Col :span="6">
                    <div :class="[$style['glyph-item']]" class="w-80">
                        <input-number
                            size="sm"
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
                    <div :class="[$style['glyph-item']]" class="w-80">
                        <input-number
                            size="sm"
                            :value="height"
                            @on-input="(event) => { update('height', Number(event.value))}"
                        >
                            <template #prefix>
                                <i-cosmic-h :class="[$style.icon]" />
                            </template>
                        </input-number>
                    </div>
                </Col>
            </Row>
            <m-color
                v-if="!data.isHideColor"
                :color-style="data.fillStyle"
                @on-change="change"
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

 </style>
