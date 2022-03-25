<script lang="ts" setup>
import { Cascader, Row, Col, Popover, Card } from 'cosmic-vue';
import { ref } from 'vue';
import Yuzhi from './yuzhi.vue';
import styles from './yuzhi.module.css';

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
</script>
<template>
    <div :class="[styles['yz-module']]">
        <div class="font-bold text-sm mt-16">
            文档使用预制
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
            <div class="font-bold text-sm mt-16">
                业务规范预制
            </div>
            <Row>
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
                                dsfsd
                            </Card>
                        </template>
                    </Popover>
                </Col>
            </Row>
            
            <div :class="[styles['yz-container']]">
                <yuzhi v-for="(item, i) in yuzhiList.localYz" :key="i" :yzdata="item" :class="[styles['yz-content']]">
                    <template #iconRight="props">
                        <i-cosmic-more :class="props.class" />
                    </template>
                </yuzhi>
            </div>
        </div>
    </div>
</template>
