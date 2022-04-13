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
    <Menu size="xs" :value="props.active" :opened="true" :class="$style.menu" @on-change="menuChangeHandler">
        <menu-option
            v-for="data of props.breakPoints" :key="data.id" :value="data.id" :label="data.label"
            :has-check="false"
        >
            <div :class="[$style.item, hoverRef===data.id ? $style.hoverItem: '']" :data-id="data.id" @mouseover="mouseoverHander">
                <i-cosmic-x v-if="data.range[1] <= 500" :class="$style.leading" @click.stop="deleteHandler(data.id)" />
                <i-cosmic-y v-else :class="$style.leadding" @click.stop="deleteHandler(data.id)" />
                {{ data.label }}
                <i-cosmic-trash :class="$style.trash" @click.stop="deleteHandler(data.id)" />
            </div>
        </menu-option>
    </Menu>
</template>

 <style module>
 /* style for override */
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
    border-radius: var(--rounded);
    align-items: center;
}

.trash {
    composes: hidden from global;
    margin-left: auto;
    margin-right: var(--margin-md);
}

.leading {
    composes: -v-mx md from global;
}

.menu :global(.active) .item {
    background-color: var(--color-gray-50);
}

.hoverItem .trash {
    display: block;
}
</style>