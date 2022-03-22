<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Button, Row, Col, Input} from 'cosmic-vue';
import { buttonSolid } from 'cosmic-ui';
import { useModal } from './setup';

const props = withDefaults(defineProps<{
    title: string,
    target: HTMLElement,
}>(), {
    title: '',
});

const container = ref(null);

const emits = defineEmits(['cancel', 'ok']);

console.log(props.target);

const { comoutPositionStyle, positionStyle, setContainerTarget } = useModal(props.target, emits);

comoutPositionStyle();

onMounted(() => {
    setContainerTarget(container.value as unknown as HTMLElement);
});

</script>


<template>
    <div
        ref="container"
        class="cos-mode-reverse"
        :class="$style.container"
        :style="positionStyle"
        @click.stop="() => {}"
    >
        <div :class="$style.title">
            <slot name="title">
                {{ props.title }}
            </slot>
        </div>
        <div :class="$style.content">
            <Row class="flex items-center">
                <Col :span="2">
                    标题：
                </Col>
                <Col>
                    <Input
                        size="sm"
                        value="标题1"
                    />
                </Col>
            </Row>
            <Row
                class="flex items-center h-32"
                :class="$style['gray-text']"
            >
                <Col :span="2">
                    编码：
                </Col>
                <Col>
                    <span class="-v-px sm">
                        qweqwe
                    </span>
                </Col>
            </Row>
            <slot />
        </div>

        <footer
            :class="$style.footer"
            class="flex items-center justify-evenly"
        >
            <Button
                size="sm"
                :styles="buttonSolid"
                class="rounded-full w-64"
                @click="() => emits('ok')"
            >
                取消
            </Button>
            <Button
                size="sm"
                class="rounded-full w-64"
                @click="() => emits('cancel')"
            >
                确定
            </Button>
        </footer>
    </div>
</template>

<style module>
.container {
    padding: var(--spacing-4) 0;
    background-color: var(--color-gray-50);
    border-radius: var(--spacing-4);
    color: var(--color-dark);
    position: fixed;
    transform: translateX(-100%);
    width: 27rem;
}
.title {
    composes: -v-h -v-px items-center flex justify-between md from global;
}

.content {
    composes: -v-px md from global;
}
.gray-text {
    color: var(--color-gray-500);
}
.footer {
    composes: -v-py sm from global;
}
</style>