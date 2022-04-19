<script lang="ts" setup>
import { ref, onMounted, computed, toRaw } from 'vue';
import {Select, SelectOption, Input} from 'cosmic-vue';
import MTitle from '../title/title.vue';
import MStandard from '../standard/standard.vue';
import { useModal } from './setup';

const props = withDefaults(defineProps<{
    title: string,
    standardList: Record<string, string>[],
    target: HTMLElement,
}>(), {
    title: '',
    select: () => ({}),
});

const emits = defineEmits(['ok', 'cancel', 'showDetail',  'select', 'add', 'change']);

const content = ref(null);

const hoverIndex = ref(-1);

const container = ref(null);

const {
    positionStyle,
    comoutPositionStyle,
    setContainerTarget,
} = useModal(props.target, emits);

comoutPositionStyle();

onMounted(() => {
    setContainerTarget(container.value as unknown as HTMLElement);
});

const isEmpty = computed(() => !props.standardList || props.standardList.length === 0);

const inputValue = ref<string>();

const filterStandardList = computed(() => {
    const arr = toRaw(props.standardList).filter(item => !inputValue.value || item.name.includes(inputValue.value));
    return arr;
});

function showDetail(index: number, data: Record<string, string>) {
    const target = (content.value! as HTMLElement).children[index];
    emits('showDetail', {target, data});
}

function filterHandler(data: {value: string}) {
    inputValue.value = data.value;
}

</script>

<template>
    <div
        ref="container"
        :class="$style.container"
        :style="positionStyle"
        class="cos-mode-reverse flex flex-col pb-8"
    >
        <slot name="title">
            <div
                :class="$style.title"
                class="my-4"
            >
                <div
                    :class="[$style.wrapper]"
                    class="flex h-full justify-between items-center w-full"
                >
                    {{ title }}
                    <i-cosmic-plus @click.stop="emits('add')" />
                </div>
            </div>
        </slot>
        <div :class="$style['bottom-border']" />
        <slot name="filter">
            <div :class="$style.filter">
                <div
                    :class="$style['filter-title']"
                    class="flex items-center"
                >
                    标题
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
        <div :class="$style['bottom-border']" />
        <div
            v-if="!isEmpty"
            ref="content"
            :class="$style.content"
            class="ml-4 mr-2"
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
                            class="flex items-center justify-center w-40"
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
            class="flex items-center justify-center"
        >
            当前暂无原子
        </div>
    </div>
</template>

<style module>

.container {
    font-size: 1.2rem;
    background-color: #25252B;
    border-radius: calc(var(--rounded-md) * 2);
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
    composes: flex -v-px md my-4 from global;
}

.filter > div:first-child {
    flex: 0 0 4rem
}

.filter > div:last-child {
    flex: 3
}

.filter-title {
    color: var(--color-dark);
}

.bottom-border {
    border-bottom: 1px solid #1C1C20;
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
    flex: 1;
}

</style>
