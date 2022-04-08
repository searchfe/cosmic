<script lang="ts" setup>
import { ref, reactive} from 'vue';
import { Row, Col, RadioGroup, RadioButton, Input} from 'cosmic-vue';

const props = withDefaults(defineProps<{
    radiusStyle: any,
}>(), {
    radiusStyle: () => ({}),
});

const radiusStyle = reactive(props.radiusStyle);

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
                    :value="radiusStyle.tl"
                    @on-change="event => radiusStyle.tl = event.value"
                />
            </div>
            <div class="w-60">
                <Input
                    v-if="multiple"
                    size="sm"
                    :value="radiusStyle.tr"
                    @on-change="event => radiusStyle.tr = event.value"
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
                    :value="radiusStyle.bl"
                    @on-change="event => radiusStyle.bl = event.value"
                />
            </div>
            <div class="w-60">
                <Input
                    size="sm"
                    :value="radiusStyle.br"
                    @on-change="event => radiusStyle.bl = event.value"
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
    composes: mb-8 from global;
}
</style>