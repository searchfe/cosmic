<script lang="ts" setup>
import { Menu, MenuOption } from 'cosmic-vue';
import { BreakPoint } from './types';
import { ref } from 'vue';

const props = withDefaults(defineProps<{
    breakPoints: Array<BreakPoint>,
    active: string,
}>(), {
    active: '',
});

const emits = defineEmits(['onChange', 'onDelete']);
const menuChangeHandler = (item: { value: number }) => {
    emits('onChange', item.value);
};

const deleteHandler = (key: string) => {
    emits('onDelete', key);
};

const hoverRef = ref(props.active);
const mouseoverHander = (e: MouseEvent) => {
    hoverRef.value = e.currentTarget?.dataset?.id;
};

</script>

<template>
    <Menu size="sm" :value="props.active" :opened="true" :class="$style.menu" @on-change="menuChangeHandler">
        <menu-option
            v-for="data of props.breakPoints" :key="data.id" :value="data.id" :label="data.label" :class="$style.menuOption"
            :has-check="false"
        >
            <div :class="[$style.item, hoverRef===data.id ? $style.hoverItem: '']" :data-id="data.id" @mouseover="mouseoverHander">
                <i-cosmic-media-mobile v-if="data.range[1] <= 500" :class="$style.leading" @click.stop="deleteHandler(data.id)" />
                <i-cosmic-media-desktop v-else :class="$style.leading" @click.stop="deleteHandler(data.id)" />
                {{ data.label }}
                <i-cosmic-trash :class="$style.trash" @click.stop="deleteHandler(data.id)" />
            </div>
        </menu-option>
    </Menu>
</template>

 <style module>
 /* style for override */
 .menu {
    composes: -v-text from global;
 }
.menu>ul {
    padding-top: 0;
    background-color: transparent;
}

.menu>ul>li>div {
    background-color: transparent;
    padding: 0 !important;
}

.menu>ul>li>div:hover {
    background-color: transparent;
}

/* style for item */
.item {
    composes: -v-h md flex from global;
    align-items: center;
    border-radius: var(--rounded);
    line-height: 0;
}

.trash {
    composes: hidden from global;
    margin-left: auto;
    margin-right: 1.2rem;
    font-size: var(--font-md);
}

.trash:hover {
    color: var(--color-primary-500);
}

.leading {
    margin: 0 0.8rem 0 1rem;
    font-size: var(--font-md);
}

.menu :global(.active) .item {
    background-color: var(--color-gray-50);
}

.hoverItem .trash {
    display: block;
}

.menuOption>div {
    background-color: transparent;
}
</style>
