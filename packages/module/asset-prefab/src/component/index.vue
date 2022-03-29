<script lang="ts" setup>
import { Cascader, Row, Col, Popover, Card, Input } from 'cosmic-vue';
import { ref } from 'vue';
import Prefab from './prefab.vue';
import styles from './prefab.module.css';

const yuzhiList = {
    localYz: [{
        state: 'prefab-new',
        title: '预置1',
    },
    {
        state: 'prefab-repeat',
        title: '预置2',
    },
    {
        state: 'prefab-regular',
        title: '预置3',
    },
    ],
    regularYz:[{
        state: 'prefab-new',
        title: '预置1',
    },
    {
        state: 'prefab-repeat',
        title: '预置2',
    },
    {
        state: 'prefab-regular',
        title: '预置3',
    },
    ],
};
const selected = ref([]);
const source = ref([
    {
        name: '视觉搜索',
        children: [
            {
                name: '识货',
                children: [{ name: '通用版' }, { name: '春节' }, { name: '购物节' }],
            },
            {
                name: '人脸识别',
            },
        ],
    },
    
    {
        name: '视频多模沉浸',
    },
    {
        name: '语音搜索',
    },
]);
function fn() {
    // eslint-disable-next-line no-console
    console.log('app....', selected.value);
}
const value = ref('');
</script>
<template>
    <div>
        <div :class="[styles['prefab-search']]">
            <Input
                v-model:value="value"
                size="sm"
                placeholder="搜索"
            >
                <template #prefix>
                    <i-cosmic-caution :class="[styles['prefab-icon']]" />
                </template>
            </Input>
        </div>
        <div :class="[styles['prefab-module']]">
            <div :class="[styles['prefab-title']]" class="font-bold text-sm mt-16">
                <span :class="[styles['prefab-title-icon']]"><i-cosmic-arrow-down /></span>
                <span>文档使用预制</span>
            </div>
                
            <div :class="[styles['prefab-container']]">
                <prefab v-for="(item, i) in yuzhiList.localYz" :key="i" :yzdata="item" :class="[styles['prefab-content']]">
                    <template #iconLeft="props">
                        <i-cosmic-comp :class="props.class" />
                    </template>
                    <template #iconRight="props">
                        <i-cosmic-more :class="props.class" />
                    </template>
                </prefab>
            </div>
            <div>
                <div :class="[styles['prefab-title']]" class="font-bold text-sm mt-16">
                    <span :class="[styles['prefab-title-icon']]"><i-cosmic-arrow-down /></span>
                    <span>业务规范预制</span>
                </div>
                <Row :class="[styles['prefab-bus-filter']]">
                    <Col>
                        <Cascader
                            v-model:source="source"
                            v-model:selected="selected"
                            popover-height="200px"
                            @update:selected="fn"
                        />
                    </Col>
                    <Col :class="[styles['prefab-filter-container']]">
                        <Popover placement="bottomRight">
                            <div :class="[styles['prefab-filter']]">
                                <i-cosmic-more />
                            </div>
                            <template #content>
                                <Card title="筛选组件" :class="[styles['prefab-filter-content']]">
                                    <div :class="[styles['prefab-filter-list']]">
                                        <div :class="[styles['prefab-filter-smart']]">
                                            <p>智能组件</p>
                                            <div :class="[styles['prefab-filter-components']]">
                                                <span :class="[styles['prefab-filter-tag']]">输入框</span>
                                                <span :class="[styles['prefab-filter-tag']]">输入框</span>
                                                <span :class="[styles['prefab-filter-tag']]">输入框</span>
                                                <span :class="[styles['prefab-filter-tag']]">输入框</span>
                                                <span :class="[styles['prefab-filter-tag']]">输入框</span>
                                                <span :class="[styles['prefab-filter-tag']]">输入框</span>
                                                <span :class="[styles['prefab-filter-tag']]">输入框</span>
                                                <span :class="[styles['prefab-filter-tag']]">输入框</span>
                                                <span :class="[styles['prefab-filter-tag']]">输入框</span>
                                            </div>
                                        </div>
                                        <div :class="[styles['prefab-filter-type']]">
                                            <p>类型</p>
                                            <div :class="[styles['prefab-filter-components']]">
                                                <span :class="[styles['prefab-filter-tag']]">基础</span>
                                                <span :class="[styles['prefab-filter-tag']]">复合</span>
                                                <span :class="[styles['prefab-filter-tag']]">组合</span>
                                                <span :class="[styles['prefab-filter-tag']]">组合</span>
                                                <span :class="[styles['prefab-filter-tag']]">组合</span>
                                                <span :class="[styles['prefab-filter-tag']]">组合</span>
                                                <span :class="[styles['prefab-filter-tag']]">组合</span>
                                                <span :class="[styles['prefab-filter-tag']]">组合</span>
                                                <span :class="[styles['prefab-filter-tag']]">组合</span>
                                                <span :class="[styles['prefab-filter-tag']]">组合</span>
                                                <span :class="[styles['prefab-filter-tag']]">组合</span>
                                                <span :class="[styles['prefab-filter-tag']]">组合</span>
                                                <span :class="[styles['prefab-filter-tag']]">组合</span>
                                                <span :class="[styles['prefab-filter-tag']]">组合</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div :class="[styles['prefab-filter-btn']]">
                                        <span :class="[styles['prefab-filter-tag']]">重置</span>
                                        <span :class="[styles['prefab-filter-tag'],styles['prefab-filter-close']]">收起</span>
                                    </div>
                                </Card>
                            </template>
                        </Popover>
                    </Col>
                </Row>
            
                <div :class="[styles['prefab-container']]">
                    <prefab v-for="(item, i) in yuzhiList.regularYz" :key="i" :yzdata="item" :class="[styles['prefab-content']]">
                        <template #iconRight="props">
                            <i-cosmic-more :class="props.class" />
                        </template>
                    </prefab>
                </div>
            </div>
        </div>
    </div>
</template>
