<script lang="ts" setup>
import { Cascader, Row, Col, Popover, Card, Input } from 'cosmic-vue';
import { ref } from 'vue';
import Yuzhi from './prefab.vue';
import styles from './prefab.module.css';

const yuzhiList = {
    localYz: [{
        state: 'yz-new',
        title: '预置1',
    },
    {
        state: 'yz-repeat',
        title: '预置2',
    },
    {
        state: 'yz-regular',
        title: '预置3',
    },
    ],
    regularYz:[{
        state: 'yz-new',
        title: '预置1',
    },
    {
        state: 'yz-repeat',
        title: '预置2',
    },
    {
        state: 'yz-regular',
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
        <div :class="[styles['yz-search']]">
            <Input
                v-model:value="value"
                size="sm"
                placeholder="搜索"
            >
                <template #prefix>
                    <i-cosmic-caution :class="[styles['yz-icon']]" />
                </template>
            </Input>
        </div>
        <div :class="[styles['yz-module']]">
            <div :class="[styles['yz-title']]" class="font-bold text-sm mt-16">
                <span :class="[styles['yz-title-icon']]"><i-cosmic-arrow-down /></span>
                <span>文档使用预制</span>
            </div>
                
            <div :class="[styles['yz-container']]">
                <yuzhi v-for="(item, i) in yuzhiList.localYz" :key="i" :yzdata="item" :class="[styles['yz-content']]">
                    <template #iconLeft="props">
                        <i-cosmic-comp :class="props.class" />
                    </template>
                    <template #iconRight="props">
                        <i-cosmic-more :class="props.class" />
                    </template>
                </yuzhi>
            </div>
            <div>
                <div :class="[styles['yz-title']]" class="font-bold text-sm mt-16">
                    <span :class="[styles['yz-title-icon']]"><i-cosmic-arrow-down /></span>
                    <span>业务规范预制</span>
                </div>
                <Row :class="[styles['yz-bus-filter']]">
                    <Col>
                        <Cascader
                            v-model:source="source"
                            v-model:selected="selected"
                            popover-height="200px"
                            @update:selected="fn"
                        />
                    </Col>
                    <Col :class="[styles['yz-filter-container']]">
                        <Popover placement="bottomRight">
                            <div :class="[styles['yz-filter']]">
                                <i-cosmic-more />
                            </div>
                            <template #content>
                                <Card title="筛选组件" :class="[styles['yz-filter-content']]">
                                    <div :class="[styles['yz-filter-list']]">
                                        <div :class="[styles['yz-filter-smart']]">
                                            <p>智能组件</p>
                                            <div :class="[styles['yz-filter-components']]">
                                                <span :class="[styles['yz-filter-tag']]">输入框</span>
                                                <span :class="[styles['yz-filter-tag']]">输入框</span>
                                                <span :class="[styles['yz-filter-tag']]">输入框</span>
                                                <span :class="[styles['yz-filter-tag']]">输入框</span>
                                                <span :class="[styles['yz-filter-tag']]">输入框</span>
                                                <span :class="[styles['yz-filter-tag']]">输入框</span>
                                                <span :class="[styles['yz-filter-tag']]">输入框</span>
                                                <span :class="[styles['yz-filter-tag']]">输入框</span>
                                                <span :class="[styles['yz-filter-tag']]">输入框</span>
                                            </div>
                                        </div>
                                        <div :class="[styles['yz-filter-type']]">
                                            <p>类型</p>
                                            <div :class="[styles['yz-filter-components']]">
                                                <span :class="[styles['yz-filter-tag']]">基础</span>
                                                <span :class="[styles['yz-filter-tag']]">复合</span>
                                                <span :class="[styles['yz-filter-tag']]">组合</span>
                                                <span :class="[styles['yz-filter-tag']]">组合</span>
                                                <span :class="[styles['yz-filter-tag']]">组合</span>
                                                <span :class="[styles['yz-filter-tag']]">组合</span>
                                                <span :class="[styles['yz-filter-tag']]">组合</span>
                                                <span :class="[styles['yz-filter-tag']]">组合</span>
                                                <span :class="[styles['yz-filter-tag']]">组合</span>
                                                <span :class="[styles['yz-filter-tag']]">组合</span>
                                                <span :class="[styles['yz-filter-tag']]">组合</span>
                                                <span :class="[styles['yz-filter-tag']]">组合</span>
                                                <span :class="[styles['yz-filter-tag']]">组合</span>
                                                <span :class="[styles['yz-filter-tag']]">组合</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div :class="[styles['yz-filter-btn']]">
                                        <span :class="[styles['yz-filter-tag']]">重置</span>
                                        <span :class="[styles['yz-filter-tag'],styles['yz-filter-close']]">收起</span>
                                    </div>
                                </Card>
                            </template>
                        </Popover>
                    </Col>
                </Row>
            
                <div :class="[styles['yz-container']]">
                    <yuzhi v-for="(item, i) in yuzhiList.regularYz" :key="i" :yzdata="item" :class="[styles['yz-content']]">
                        <template #iconRight="props">
                            <i-cosmic-more :class="props.class" />
                        </template>
                    </yuzhi>
                </div>
            </div>
        </div>
    </div>
</template>
