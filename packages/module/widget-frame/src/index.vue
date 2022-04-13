<script lang="ts" setup>
import {computed, ref, watchEffect} from 'vue';
import { MTitle, MWidget, MColor, service } from '@cosmic/core/browser';
import { inject } from '@cosmic/core/parts';
import { Row, Col, InputNumber } from 'cosmic-vue';


const nodeService = inject<service.NodeService>(service.TOKENS.Node);

const node = nodeService.getSelection()[0];

const _node = ref();

const nodeId = ref(node?.id);

const x = ref(node?.x ?? 0);
const y = ref(node?.y ?? 0);
const width = ref(node?.width ?? 0);
const height = ref(node?.height ?? 0);

nodeService.selection.subscribe(nodes => {
    const node = nodes[0];
    _node.value = nodes[0];
    x.value = node?.x ?? 0;
    y.value = node?.y ?? 0;
    width.value = node?.width ?? 0;
    height.value = node?.height ?? 0;
    nodeId.value = node?.id ?? '';

});

const isHideColor = computed(() => {
    return _node.value && !_node.value.backgrounds;
});

const fillStyle = computed(() => {
    // const node = nodeService.getSelection().find(item => item.id === nodeId.value);
    if (!_node.value || !_node.value.backgrounds || _node.value.backgrounds.length === 0) return {color: {r: 0, g: 0, b: 0}, opacity: 0};
    return _node.value.backgrounds[0];
});


watchEffect(() => {
    const node = nodeService.getSelection()[0];
    if(!node) return;
    node.x = x.value;
    console.log(node.x);
    nodeService.update([node]);
});

watchEffect(() => {
    const node = nodeService.getSelection()[0];
    if(!node) return;
    node.y = y.value;
    nodeService.update([node]);
});

watchEffect(() => {
    const node = nodeService.getSelection()[0];
    if(!node) return;
    node.width = width.value;
    nodeService.update([node]);
});

watchEffect(() => {
    const node = nodeService.getSelection()[0];
    if(!node) return;
    node.height = height.value;
    nodeService.update([node]);
});

function change(event) {
    const node = nodeService.getSelection().find(item => item.id === nodeId.value);
    console.log(node);
    const [r, g, b] = event.colorObj.color;
    node.backgrounds = [{
        color: {r, g, b},
        opacity: event.opacity,
        type: 'SOLID',
    }];
    nodeService.update([node]);
}



</script>

<template>
    <m-widget>
        <m-title title="布局" />
        <div class="mb-10">
            <div class="flex justify-between items-center">
                <div>
                    <Row :class="$style.row">
                        <Col :span="6" :class="$style.col">
                            <div :class="[$style['glyph-item']]">
                                <input-number
                                    size="sm"
                                    :value="x"
                                    @on-input="(event) => x = Number(event.value)"
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
                                    :value="y"
                                    @on-input="(event) => y = Number(event.value)"
                                >
                                    <template #prefix>
                                        <i-cosmic-y :class="[$style.icon]" />
                                    </template>
                                </input-number>
                            </div>
                        </Col>
                    </Row>
                    <Row :class="$style.row">
                        <Col :span="6" :class="$style.col">
                            <div :class="[$style['glyph-item']]">
                                <input-number
                                    size="sm"
                                    :value="width"
                                    @on-input="(event) => width = Number(event.value)"
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
                                    :value="height"
                                    @on-input="(event) => height = Number(event.value)"
                                >
                                    <template #prefix>
                                        <i-cosmic-h :class="[$style.icon]" />
                                    </template>
                                </input-number>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div class="h-24 w-24" :class="$style['lock-icon']" />
            </div>
            
            <m-color
                v-if="!isHideColor"
                :color-style="fillStyle"
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
    font-size: .8rem;
}

.lock-icon {
    margin-left: .8rem;
    /* background-color: red */
}

.col {
    margin-right: .8rem
}

 </style>
