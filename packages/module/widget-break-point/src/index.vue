<script lang="ts" setup>
import { reactive, ref, watchEffect, toRefs } from 'vue';
import { MTitle, MWidget, service, inject } from '@cosmic/core/browser';
import { PageNode, FrameNode } from '@cosmic/core/parts';
import BreakPointPanel from './break-point-panel.vue';
import { BreakPointProps } from './types';


// -----------------------------------展现符号
const isShowDetail = ref(false);
const clickHandler = () => {
    isShowDetail.value = !isShowDetail.value;
};

// 展示+号
const showAdd = ref(true);

const addHandler = () => {
    // 更新节点的断点数据
    dataMap[node.id] = {
        breakPoints: [
            { id: '1', label: 'WISE', range: [0, 414], fakeValue: 414 },
            { id: '2', label: 'PC', range: [414, Number.POSITIVE_INFINITY], fakeValue: 656 },
        ],
        active: dataMap[node.id]?.active ?? '1',
    };
    // 更新组件数据
    innerData.breakPoints = dataMap[node.id].breakPoints;
    innerData.active = dataMap[node.id].active;
    // 展示属性
    isShowDetail.value = true;
};

// -----------------------------------处理数据
let node: FrameNode;
const nodeService = inject<service.NodeService>(service.TOKENS.Node);

// 是否展示整个面板
const isShow = ref(false);
nodeService.selection.subscribe(nodes => {
    if (nodes.length === 1
        && nodes[0].parent
        && nodes[0].parent instanceof PageNode
        && nodes[0] instanceof FrameNode
    ) {
        // 展示面板
        isShow.value = true;

        // 监听数据
        node = nodes[0] as FrameNode;
        nodeService.watch(node).subscribe((n) => {
            if (!isShowDetail.value) return;
            toData(n as FrameNode);
        });
        toData(node);
    } else {
        isShow.value = false;
    }
});

const dataMap: { [key: string]: BreakPointProps } = {};

const innerData: BreakPointProps = reactive({
    breakPoints: [],
    active: '',
});

function toData(node: FrameNode) {
    // todo: getData from frameNode
    if (!dataMap[node.id]) return;
    innerData.breakPoints = dataMap[node.id].breakPoints;
    innerData.active = dataMap[node.id].active;
}

// 激活断点
const activeBreakPoint = (id: string) => {
    // 更新node的数据
    dataMap[node.id] = {
        breakPoints: dataMap[node.id].breakPoints,
        active: id,
    };

    // 更新内部数据
    innerData.breakPoints = dataMap[node.id].breakPoints;
    innerData.active = dataMap[node.id].active;
};

// 删除断点
const removeBreakPoint = (id: string) => {
    // 找到删除的index
    const index = dataMap[node.id].breakPoints.findIndex(bp => bp.id === id);
    if (index === -1) return;
    // 更新node数据
    dataMap[node.id].breakPoints.splice(index, 1);
    dataMap[node.id] = {
        breakPoints: dataMap[node.id].breakPoints.concat(),
        active: dataMap[node.id].active === id
            ? dataMap[node.id].breakPoints[index === 0 ? 0 : index - 1].id
            : dataMap[node.id].active,
    };
    // 更新组件内部数据
    innerData.breakPoints = dataMap[node.id].breakPoints;
    innerData.active = dataMap[node.id].active;
    isShowDetail.value = false;
};

// 监听状态数据，调整显示符号
watchEffect(() => {
    showAdd.value = !(innerData)
        || !!(innerData
            && innerData.breakPoints
            && innerData.breakPoints.length <= 1);
});

// 监听状态数据，调整canvas宽度显示
watchEffect(() => {
    if (!innerData) return;
    if (!isShowDetail.value) return;
    // FIXME: 现在只设置frame对应的宽度
    const selectedBp = innerData?.breakPoints.find(bp => bp.id === innerData.active);
    if (!selectedBp) return;
    const { fakeValue } = selectedBp;
    node.width = fakeValue;
    node.resize(node.width, node.height);
    node.update();
});

const {breakPoints, active} = toRefs(innerData);

</script>

<template>
    <div v-if="isShow" class="border-bottom" />
    <m-widget v-if="isShow">
        <m-title title="媒体">
            <i-cosmic-plus v-if="showAdd" @click="addHandler" />
            <i-cosmic-arrow-down v-if="!showAdd && !isShowDetail" @click="clickHandler" />
            <i-cosmic-arrow-up v-if="!showAdd && isShowDetail" @click="clickHandler" />
        </m-title>
        <div v-if="isShowDetail && breakPoints.length > 1">
            <break-point-panel
                :break-points="breakPoints" :active="active"
                @onChange="activeBreakPoint" @onDelete="removeBreakPoint"
            />
        </div>
    </m-widget>
</template>

 <style module>
</style>
