<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Button } from 'cosmic-vue';
import { buttonSolid } from 'cosmic-ui';
import { useModal } from './setup';

const props = withDefaults(defineProps<{
    title: string,
    target: () => HTMLElement,
}>(), {
    title: '',
});

const container = ref(null);

const emits = defineEmits(['cancel', 'ok']);

console.log(props.target);

const { comoutPositionStyle, positionStyle, setContainerTarget } = useModal(props.target?.(), emits);

comoutPositionStyle();

onMounted(() => {
    setContainerTarget(container.value as unknown as HTMLElement);
});

</script>


<template>
    <div
        ref="container"
        class="cos-mode-reverse"
        :class="$style.content"
        :style="positionStyle"
    >
        <div :class="$style.title">
            <slot name="title">
                {{ props.title }}
            </slot>
        </div>
        <slot />

        <footer
            :class="$style.footer"
            class="flex items-center justify-between"
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
.content {
    padding: var(--spacing-4) 0;
    background-color: var(--color-gray-50);
    border-radius: var(--spacing-4);
    color: var(--color-dark);
    position: fixed;
    transform: translateX(-100%)
}
.title {
    composes: -v-h -v-px items-center flex justify-between md from global;
}

.footer {
    composes: -v-py sm from global;
    padding: 0 25%;
}
</style>