<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import {Select, SelectOption, Input} from 'cosmic-vue';
import MTitle from '../title/title.vue';
import MStandard from '../standard/standard.vue';
import { useModal } from './setup';

const props = withDefaults(defineProps<{
    title: string,
    standardList: any[],
    selected: any,
    target: () => HTMLElement,
}>(), {
    title: '',
    select: () => ({}),
    standardList: () => [],
});

const emits = defineEmits(['cancel', 'showDetail',  'select']);

const content = ref(null);

const hoverIndex = ref(-1);

const container = ref(null);

const { comoutPositionStyle, positionStyle, setContainerTarget } = useModal(props.target, emits);

comoutPositionStyle();

onMounted(() => {
    setContainerTarget(container.value as unknown as HTMLElement);
});

function showDetail(index: number) {
    const target = (content.value! as HTMLElement).children[index];
    emits('showDetail', target);
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
                <MTitle title="文字规范">
                    <i-cosmic-plus />
                </MTitle>
            </div>
        </slot>
        <slot name="filter">
            <div :class="$style.filter">
                <div>
                    <Select allow-input>
                        <SelectOption
                            label="1"
                            value="2"
                        />
                    </Select>
                </div>
                <div>
                    <Input
                        size="sm"
                        placeholder="请输入关键词"
                    />
                </div>
            </div>
        </slot>
        <div
            ref="content"
            :class="$style.content"
        >
            <MStandard 
                v-for="(data, index) of props.standardList"
                :key="data.title"
                :standard="data"
                :can-edit="true"
                :active="selected === data"
                classes="-v-bg-inapparent"
                @hover="() => hoverIndex = index"
                @click="(event) => emits('select', {event, data})"
            >
                <template #subfix>
                    <div
                        v-if="index === hoverIndex"
                        class="flex items-center w-40"
                    >
                        <i-cosmic-more @click.stop="showDetail(index)" />
                    </div>
                </template>
            </MStandard>
        </div>
    </div>
</template>

<style module>

.container {
    padding: var(--spacing-4) 0;
    background-color: var(--color-gray-50);
    border-radius: var(--spacing-4);
    color: var(--color-light);
    position: fixed;
    transform: translateX(-100%);
    user-select: none;
    width: 20vw
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
    border-radius: var(--spacing-4);
    overflow: auto;
}

</style>