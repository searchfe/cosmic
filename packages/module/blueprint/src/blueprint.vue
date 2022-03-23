<script setup lang="ts">
import { h, ref } from 'vue';
import { Space } from 'cosmic-vue';
import ProposalConstruction, { type ComponentSlots } from './components/proposal/construction.vue';
import ProposalProperty, { type ComponentProperties } from './components/proposal/property.vue';
import ProposalVariant, { type ComponentVariants } from './components/proposal/variant.vue';
import EditableText from './components/editable-text.vue';

const id = 'MEG Search Button';

const nameRef = ref('Button');
const descRef = ref('按钮组件');

const slots: ComponentSlots = [
    {
        name: 'default',
        desc: '按钮中间内容',
    },
    {
        name: 'prefix',
        desc: '按钮左侧',
    },
    {
        name: 'suffix',
        desc: '按钮右侧',
    },
];

const props: ComponentProperties = [
    {
        name: 'size',
        type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
        defaultValue: '"md"',
        desc: '按钮的尺寸',
    },
    {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        desc: '按钮是否被禁用',
    },
];

const variants: ComponentVariants = [
    {
        name: 'size',
        type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
        defaultValue: '"md"',
        desc: '按钮的尺寸',
    },
    {
        name: 'state',
        type: '"default" | "disabled" | "hover" | "active" | "loading"',
        defaultValue: '"default"',
        desc: '按钮的状态',
    },
    {
        name: 'prefix',
        type: 'boolean',
        defaultValue: 'false',
        desc: '按钮左侧插槽',
    },
    {
        name: 'suffix',
        type: 'boolean',
        defaultValue: 'false',
        desc: '按钮右侧插槽',
    },
];
</script>

<template>
    <Space direction="vertical" :class="$style.main">
        <EditableText
            :text-component="h('h1')"
            :value="nameRef"
            @on-update:value="v => nameRef = v"
        />
        <EditableText
            :text-component="h('p')"
            :value="descRef"
            @on-update:value="v => descRef = v"
        />
        <ProposalConstruction :component-id="id" :slots="slots" />
        <ProposalProperty :component-id="id" :properties="props" />
        <ProposalVariant :component-id="id" :variants="variants" />
    </Space>
</template>

<style module>
.main {
    padding: 24px;
    width: 100%;
}

.main > :not(:last-child) {
    margin-bottom: 8px;
}
</style>
