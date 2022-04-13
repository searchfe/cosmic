<script lang="ts" setup>
import { ref, onMounted, computed, toRaw } from 'vue';
import {Select, SelectOption, Input} from 'cosmic-vue';
import MTitle from '../title/title.vue';
import MStandard from '../standard/standard.vue';
import { useModal } from './setup';

const props = withDefaults(defineProps<{
    title: string,
    standardList: unknown[],
    target: HTMLElement,
}>(), {
    title: '',
    select: () => ({}),
});

const emits = defineEmits(['cancel', 'showDetail',  'select', 'add', 'change']);

const content = ref(null);

const hoverIndex = ref(-1);

const container = ref(null);

const { comoutPositionStyle, positionStyle, setContainerTarget } = useModal(props.target, emits);

comoutPositionStyle();

onMounted(() => {
    setContainerTarget(container.value as unknown as HTMLElement);
});

const isEmpty = computed(() => !props.standardList || props.standardList.length === 0);

const filterTitle = ref('2');

const inputValue = ref(null);

const filterStandardList = computed(() => {
    const arr = toRaw(props.standardList).filter(item => !inputValue.value || item.name.includes(inputValue.value));
    return arr;
});

function showDetail(index: number, data) {
    const target = (content.value! as HTMLElement).children[index];
    emits('showDetail', {target, data});
}

function filterHandler(data: string) {
    inputValue.value = data.value;
}

</script>

<template>
    <div
        ref="container"
        :class="$style.container"
        :style="positionStyle"
        class="cos-mode-reverse"
    >
        <slot name="title">
            <div :class="$style.title">
                <MTitle :title="title">
                    <i-cosmic-plus @click.stop="emits('add')" />
                </MTitle>
            </div>
        </slot>
        <slot name="filter">
            <div :class="$style.filter">
                <div>
                    <Select
                        allow-input
                        :value="filterTitle"
                    >
                        <select-option
                            label="标题"
                            value="1"
                        />
                        <select-option
                            label="属性"
                            value="2"
                        />
                    </Select>
                </div>
                <div>
                    <Input
                        size="sm"
                        placeholder="请输入关键词"
                        @on-input="filterHandler"
                    />
                </div>
            </div>
        </slot>
        <div
            v-if="!isEmpty"
            ref="content"
            :class="$style.content"
        >
            <m-standard
                v-for="(data, index) of filterStandardList"
                :key="data.title"
                :standard="data"
                :active="hoverIndex === index"
                classes="-v-bg-inapparent"
                @hover="() => hoverIndex = index"
                @click="(event) => emits('select', {event, data})"
                @change="(event) => emits('change', event)"
            >
                <template #prefix>
                    <slot
                        name="prefix"
                        :standard="data"
                    />
                </template>
                <template #subfix>
                    <slot name="subfix">
                        <div
                            v-if="index === hoverIndex"
                            class="flex items-center w-40"
                        >
                            <i-cosmic-more @click.stop="showDetail(index, data)" />
                        </div>
                    </slot>
                </template>
            </m-standard>
        </div>
        <div 
            v-else
            :class="$style['empty-container']"
        >
            当前暂无原子，请添加原子
        </div>
    </div>
</template>

<style module>

.container {
    padding: .4rem 0;
    background-color: var(--color-gray-50);
    border-radius: var(--rounded-md);
    color: var(--color-light);
    position: fixed;
    transform: translateX(-100%);
    user-select: none;
    min-height: 16.5rem;
    width: 27rem;
}
.title {
    composes: -v-h -v-px md from global;
    color: var(--color-dark);
}

.filter {
    composes: flex m-10 from global;
    border: solid 1px var(--color-gray-400);
}

.filter > div:first-child {
    flex: 1
}

.filter > div:last-child {
    flex: 3
}

.content {
    max-height: 400px;
    border-radius: var(--rounded-md);
    overflow: auto;
}

.empty-container {
    composes: -v-px md from global;
    color: var(--color-gray-500);
    padding: .4rem 0;
    font-size: 1.4rem;
}

</style>
