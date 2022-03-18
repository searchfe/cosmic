<script lang="ts" setup>
import Pop from './pop.vue';
import HistoryList from './history-list.vue';
import {Select, SelectOption, Input} from 'cosmic-vue';

defineProps({
    title: {
        type: String,
        default: '外阴影规范',
    },
    current: {
        type: Number,
        default: 0,
    },
    dataList: {
        type: Array,
        default: () => [],
    },
});

const emits = defineEmits(['onAdd', 'onEdit']);
const onAdd = () => {
    emits('onAdd');
};
const editBoxShadow = ({data, index}) => {
    emits('onEdit', {data, index});
};
</script>

<template>
    <Pop :class="[$style['preview']]">
        <div>
            <div :class="[$style['title']]">
                {{ title }}
                <div
                    :class="[$style['icon-wrap']]"
                    @click="onAdd"
                >
                    <i-cosmic-plus :class="[$style['icon']]" />
                </div>
            </div>
            <div :class="$style['line']" />
            <div :class="[$style['filter-select']]">
                <Select
                    size="sm"
                    value="1"
                    :class="[$style['select']]"
                >
                    <template #prefix>
                        <i-cosmic-arrow-down />
                    </template>
                    <SelectOption
                        value="1"
                        label="标题"
                        :class="[$style['select-option']]"
                    />
                    <SelectOption
                        value="2"
                        label="描述"
                        :class="[$style['select-option']]"
                    />
                    <SelectOption
                        value="3"
                        label="编码"
                        :class="[$style['select-option']]"
                    />
                </Select>
                <Input
                    :class="$style['select-input']"
                    placeholder="标题关键字"
                >
                    <template #prefix>
                        <i-cosmic-caution />
                    </template>
                </Input>
            </div>
            <div :class="$style['line']" />
            <HistoryList
                :current="current"
                :data-list="dataList"
                @editBoxShadow="editBoxShadow"
            />
        </div>
    </Pop>
</template>

<style module>
.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: var(--font-bold);
    font-size: var(--font-sm);
    line-height: var(--leading-sm);
    margin-top: -3px;
    margin-bottom: var(--spacing-14);
    color: var(--color-white);
    position: relative;
}

.icon-wrap {
    margin-top: -6px;
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon-wrap .icon {
    font-size: var(--font-sm);
}

.line {
    margin: 0 -12px;
    height: 1px;
    background-color: #1C1C20;
}

.filter-select {
    display: flex;
    background-color: #25252B;
    border-top: 1px solid #1f1f1f;
    border-bottom: 1px solid #1f1f1f;
}

.select {
    flex-shrink: 0;
    color: #fff;
    width: 50px;
}

.select:hover,
.select:active {
    border-color: transparent;
}

.select div {
    padding: 0 !important;
}

.select input {
    color: var(--color-white);
}

.select ul {
    width: 70px;
    background: #25252B;
}

.select ul li {
    width: 70px;
    box-sizing: border-box;
}

.select-input {
    margin-left: 8px;
    flex-shrink: 1;
    padding: 0 10px;
    background-color: #25252B;
    position: relative;
}

.select-input:hover,
.select-input:active {
    background-color: #25252B;
}

.select-input:before {
    display: block;
    content: "";
    width: 1px;
    height: 12px;
    background-color: #1C1C20;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
}

.select-input input {
    color: #fff;
    padding-left: 6px;
    background-color: #25252B;
}
</style>
