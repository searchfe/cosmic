<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
import { Button, Input} from 'cosmic-vue';
import { buttonSolid } from 'cosmic-ui';
import { useModal } from './setup';

const props = withDefaults(defineProps<{
    title: string,
    target: HTMLElement,
    standard: Record<string, string>,
}>(), {
    title: '',
    standard: () => ({}),
});

const container = ref(null);

const emits = defineEmits(['cancel', 'ok']);


const { comoutPositionStyle, positionStyle, setContainerTarget } = useModal(props.target, emits);

comoutPositionStyle();

onMounted(() => {
    setContainerTarget(container.value as unknown as HTMLElement);
});

const styles = reactive(props.standard);

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
            <div class="flex items-center">
                <div :class="$style['text']">
                    标题：
                </div>
                <Input
                    size="sm"
                    :value="styles.name"
                    @on-input="(event) => styles.name = event.value"
                />
            </div>
            <div
                class="flex items-center h-32"
                :class="$style['gray-text']"
            >
                <div :class="$style['text']">
                    编码：
                </div>
                <div>
                    <span class="-v-px sm">
                        {{ styles.description }}
                    </span>
                </div>
            </div>
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
                @click="() => emits('cancel')"
            >
                取消
            </Button>
            <Button
                size="sm"
                class="rounded-full w-64"
                @click="() => emits('ok')"
            >
                确定
            </Button>
        </footer>
    </div>
</template>

<style module>
.container {
    padding: .4rem 0;
    background-color: var(--color-gray-50);
    border-radius: var(--rounded-md);
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
.text {
    width: 3.6rem;
    flex-shrink: 0;
}
.footer {
    composes: -v-py sm from global;
}
</style>
