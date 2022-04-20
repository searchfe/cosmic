<script lang="ts" setup>
import { reactive } from 'vue';
import { Row, Col, RadioGroup, RadioButton } from 'cosmic-vue';
import { service } from '@cosmic/core/browser';
import { inject, TextNode,  BaseNodeMixin } from '@cosmic/core/parts';
import { type Subject } from '@cosmic/core/rxjs';

interface TextLayout {
    textAutoResize: 'NONE' | 'WIDTH_AND_HEIGHT' | 'HEIGHT',
    textAlignHorizontal: 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFIED';
}

const nodeService = inject<service.NodeService>(service.TOKENS.Node);
let subject: Subject<BaseNodeMixin>;


const data= reactive<TextLayout>({
    textAlignHorizontal: 'LEFT',
    textAutoResize: 'NONE',
});

let node: TextNode = nodeService.getSelection().find(item => item instanceof TextNode) as TextNode;

nodeService.selection.subscribe(nodes => {
    nodeService.unwatch(subject);
    node = nodes.find(item => item instanceof TextNode) as TextNode;
    if (!node) return;

    subject = nodeService.watch(node);
    subject.subscribe(value => {
        toData(value as TextNode);
    });
});


function toData(value: TextNode) {
    data.textAlignHorizontal = value.textAlignHorizontal;
    data.textAutoResize = value.textAutoResize;
}

function update(key: 'textAlignHorizontal' | 'textAutoResize', value: any) {
    if (!node) return;
    node[key] = value;
    console.log(node[key]);
    node.update();
}

</script>

<template>
    <Row :class="$style.row">
        <Col :span="16" :class="$style.col">
            <div :class="$style['radio-left']">
                <RadioGroup
                    :value="data.textAlignHorizontal"
                    @on-change="(event) => update('textAlignHorizontal', event.value)"
                >
                    <RadioButton value="LEFT">
                        <i-cosmic-text-left :class="$style['radio-icon']" />
                    </RadioButton>

                    <RadioButton value="CENTER">
                        <i-cosmic-text-center :class="$style['radio-icon']" />
                    </RadioButton>

                    <RadioButton value="RIGHT">
                        <i-cosmic-text-right :class="$style['radio-icon']" />
                    </RadioButton>
                    <RadioButton value="JUSTIFIED">
                        <i-cosmic-text-even :class="$style['radio-icon']" />
                    </RadioButton>
                </RadioGroup>
            </div>
        </Col>
        <Col :span="8" :class="$style.col">
            <div>
                <RadioGroup value="3">
                    <RadioButton value="1">
                        <i-cosmic-width-auto :class="$style['radio-icon']" />
                    </RadioButton>

                    <RadioButton value="2">
                        <i-cosmic-height-auto :class="$style['radio-icon']" />
                    </RadioButton>
                    <RadioButton value="3">
                        <i-cosmic-linked-square :class="$style['radio-icon']" />
                    </RadioButton>
                </RadioGroup>
            </div>
        </Col>
    </Row>
</template>


 <style module>
 .row {
    composes: mb-8 from global;
 }

 </style>
