<template>
    <Card 
        :class="[yzClick]" 
        @mouseenter="onContententer"
        @mouseleave="onContentLeave"
        @click="onContentClick"
    >
        <div class="yz-card">
            <div :class="[styles['dc-yz'], hovering]">
                <section v-if="slots.iconLeft" :class="[styles['header-icon'], props.yzdata.state, (hovering || yzClick) ? size : '']">
                    <slot name="iconLeft" />
                </section>
            </div>
            <div class="menu">
                <Menu
                    :size="state"
                    value="2"
                    @on-change="menuChangeHandler"
                >
                    <template #activator>
                        <section v-if="slots.iconRight" :class="[styles['header-icon'], (hovering || yzClick) ? size : '']">
                            <slot name="iconRight" />
                        </section>
                    </template>
                    <MenuOption v-for="data of opeSelect" :key="data.value" :value="data.value" :label="data.label" :has-check="false" />
                </Menu>
            </div>
        </div>
    </Card>
</template>
<script setup lang="ts">
import { ref, useSlots } from 'vue';
import { Card, Menu, MenuOption } from 'cosmic-vue';
import styles from './prefab.module.css';

interface Yzdata {
    state: string;
    title: string;
} 
const props = withDefaults(defineProps<{
    yzdata: Yzdata
    // styles?: CSSModuleClasses
    size?: string;
}>(), {
    // styles,
    size: 'xs',
});

const slots = useSlots();

const hovering = ref('');
const yzClick = ref('');

const onContententer = function () {
    hovering.value = 'yz-hovering';
};
const onContentLeave = function () {
    hovering.value = '';
};
const onContentClick = function () {
    yzClick.value = 'yz-click';
};
const menuChangeHandler = () => {
    // eslint-disable-next-line no-console
    console.log(11);
};
const opeSelect = ref([{
    label: '高亮显示     7',
    value: 1,
},{
    label: '重命名',
    value: 2,
},{
    label: '编辑预制',
    value: 3,
},{
    label: '重新连接规范',
    value: 4,
},{
    label: '编辑规范',
    value: 5,
},{
    label: '删除规范',
    value: 6,
},{
    label: '脱离规范',
    value: 7,
},
]);
</script>
<style scoped>
    .yz-card {
        display: flex;
        place-content: flex-start space-between;
    }
</style>

