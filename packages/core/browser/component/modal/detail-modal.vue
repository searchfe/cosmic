<script lang="ts" setup>
import { Button } from 'cosmic-vue';
import { buttonSolid } from 'cosmic-ui';
const props = withDefaults(defineProps<{
    title: string,
}>(), {
    title: '',
}); 
</script>


<template>
    <div
        class="cos-mode-reverse"
        :class="$style.content"
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
            >
                取消
            </Button>
            <Button
                size="sm"
                class="rounded-full w-64"
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

}
.title {
    composes: -v-h -v-px items-center flex justify-between md from global;
}

.footer {
    composes: -v-py sm from global;
    padding: 0 25%;
}
</style>