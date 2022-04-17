<script lang="ts" setup>
import { defineEmits, toRaw } from 'vue';
import { Input } from 'cosmic-vue';

const props = withDefaults(defineProps<{
    standard: Record<string, string> | null,
    active?: boolean,
    classes?: string,
    canEdit?: boolean,
    isBorder: boolean
}>(), {
    active: false,
    standard: () => ({}),
    classes: '',
    canEdit: false,
    isBorder: false,
});

const emits = defineEmits(['click', 'hover', 'change']);

function changeHandler({value}: {value: string}) {
    const style = toRaw(props.standard);
    emits('change', {...style, name: value});
}

</script>


<template>
    <div
        :class="[$style.standard, props.classes, isBorder ? $style['content-border'] : '']"
        class="flex justify-between"
        @click.stop="(event) => emits('click', {event, standard: props.standard})"
        @mouseenter="() => emits('hover', true)"
        @mouseleave="() => emits('hover', false)"
    >
        <div
            :class="[$style.show, props.active ? $style.border : '']"
        >
            <slot
                name="prefix" 
                :standard="standard"
            >
                <i-cosmic-text />
            </slot>
        </div>
        <slot>
            <div :class="$style.info">
                <div :class="$style.item">
                    <span
                        v-if="!canEdit"
                        :class="$style.title"
                    >{{ standard?.name }}</span>
                    <div
                        v-else
                        @click.stop="() => {}"
                    >
                        <Input
                            size="sm"
                            :value="standard?.name"
                            @on-change="changeHandler"
                        />
                    </div>
                </div>
                <div :class="[$style.item, $style.description]">
                    {{ standard?.description }}
                </div>
            </div>
        </slot>
        <slot name="subfix" />
    </div>
</template>

<style module>
.standard {
    font-size: 1.2rem;
    composes: items-center -v-bg-inapparent from global;
    color: var(--color-dark);
    height: calc(var(--height-sm) * 3);
    border-radius: var(--rounded-md);
    padding: 0 var(--padding-sm);
    margin: var(--margin-sm) 0;
}

.border:after {
    display: block;
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url(https://psstatic.cdn.bcebos.com/operation/demo-border_1647516533000.png) no-repeat scroll center center / contain;
}

.show {
    position: relative;
    composes: flex justify-center items-center -v-mr from global;
    width: 5rem;
    height: 5rem;
    border-radius: var(--rounded-md);
    font-size: 26px;
    background-image: linear-gradient(45deg, var(--bg-hover-color) 25%, transparent 25%, transparent 75%, var(--bg-hover-color) 75%, var(--bg-hover-color)),
                    linear-gradient(45deg, var(--bg-hover-color) 26%, transparent 26%, transparent 74%, var(--bg-hover-color) 74%, var(--bg-hover-color));
    background-size: 10px 10px;
    background-position: 0 0, 5px 5px;
    overflow: hidden;
}

.info {
    composes: flex flex-col justify-center from global;
    flex: 1;
}

.item {
    composes: flex items-center from global;
    margin-right: 2rem;
}

.title {
    composes: mb-2 flex -v-px sm items-center from global;
}

.content-border {
    border: var(--border) var(--border-style) var(--border-color);
}

.description {
    composes: -v-px sm from global;
    color: var(--color-gray-300);
}

</style>
