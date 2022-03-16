<script lang="ts" setup>
import {ref} from 'vue';
import { Row, Col, RadioGroup, RadioButton, Input} from 'cosmic-vue';
import { MTitle, MColor } from '@cosmic/core/browser';
const open = ref(false);
const multiple = ref(false);

const clickHandler = () => {
    open.value = !open.value;
};

const changeHandler = () => {
    multiple.value = !multiple.value;
};

</script>

<template>
    <MTitle title="矩形">
        <i-cosmic-plus
            v-if="!open"
            @click="clickHandler"
        />
        <i-cosmic-minus
            v-else
            @click="clickHandler"
        />
    </MTitle>
    <div
        v-if="open"
        :class="$style.container"
    >
        <MTitle title="边角">
            <i-cosmic-grid-outline />
        </MTitle>
        <Row :class="$style.row">
            <Col
                class="flex"
                :span="6"
            >
                <RadioGroup
                    value="1"
                    @on-change="changeHandler"
                >
                    <RadioButton value="1">
                        <i-cosmic-square />
                    </RadioButton>
                    <RadioButton value="2">
                        <i-cosmic-linked-square />
                    </RadioButton>
                </RadioGroup>
            </Col>
            <Col
                class="flex"
                :span="6"
            >
                <Input
                    size="sm"
                    value="12"
                />
                <Input
                    v-if="multiple"
                    size="sm"
                    value="12"
                />
            </Col>
        </Row>
        <Row
            v-if="multiple"
            :class="$style.row"
        >
            <Col :span="6" />
            <Col
                class="flex"
                :span="6"
            > 
                <Input
                    size="sm"
                    value="12"
                />
                <Input
                    size="sm"
                    value="12"
                />
            </Col>
        </Row>
        <MTitle title="颜色">
            <div
                class="flex justify-between items-center"
                :class="$style.icon"
            >
                <i-cosmic-sun />
                <i-cosmic-grid-outline />
            </div>
        </MTitle>
        <MColor />
    </div>
</template>


<style module>
.icon {
    font-size: var(--font-s)
}
.row {
    margin: var(--margin-md) 0;
    padding: 0 var(--padding-md);
}

.container {
    padding-bottom: var(--padding-md);
}
</style>