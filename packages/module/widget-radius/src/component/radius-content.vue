<script lang="ts" setup>
import { ref } from 'vue';
import { Row, Col, RadioGroup, RadioButton, Input} from 'cosmic-vue';

const multiple = ref(false);

const changeHandler = () => {
    multiple.value = !multiple.value;
};
</script>

<template>
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
            <div class="w-60">
                <Input
                    size="sm"
                    value="12"
                />
            </div>
            <div class="w-60">
                <Input
                    v-if="multiple"
                    size="sm"
                    value="12"
                />
            </div>
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
            <div class="w-60">
                <Input
                    size="sm"
                    value="12"
                />
            </div>
            <div class="w-60">
                <Input
                    size="sm"
                    value="12"
                />
            </div>
        </Col>
    </Row>
</template>

<style module>
.icon {
    font-size: var(--font-s)
}
.row {
    composes: -v-my lg from global;
}
</style>