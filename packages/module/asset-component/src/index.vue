<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import { Input as CInput } from 'cosmic-vue';
import Collapse from './component/collapse.vue';


import { service, inject, ComponentListItem } from '@cosmic/core/browser';

interface TagData {
    title: string;
    children: ComponentListItem[],
}

const tagDatas: Ref<TagData[]> = ref([]);

const nodeService = inject<service.NodeService>(service.TOKENS.Node);
const componentService = inject<service.ComponentService>(service.TOKENS.Component);

componentService.loaded.subscribe(() => { // packageName
    const list = componentService.getComponents();
    const rs : TagData[] = [];
    const store: any = {};

    Object.keys(list).forEach(componentId => {
        const c = list[componentId];
        c.tags.forEach(tag => {
            store[tag] = store[tag] || {
                title: tag,
                children: [],
            };
            store[tag].children.push(c);
        });
    });
    Object.keys(store).forEach(key => {
        rs.push(store[key]);
    });
    tagDatas.value = rs;
});

// let node: SceneNode;

// nodeService.selection.subscribe(nodes => {
//     if (nodes.length === 0) return;
//     node = nodes[0] as SceneNode;

// });

const collapseIndex = ref<number>(0);

function collapseChange(event:boolean, index: number) {
    collapseIndex.value = event ? index : -1;
}

function add(data: ComponentListItem) {
    const node = componentService.createComponentNode(data.id);
    nodeService.addNode(node);
}

// function add() {
//     const componentNode = nodeService.addComponent(node as FrameNode);
//     const {schema, model} = getRenderSchemaAndModel(DataShema, DataModel);
//     componentNode.setPluginData('wise', {
//         // 保留原始数据，后期计算会用到
//         originSchema: DataShema,
//         schema,
//         model,
//     });
// }

</script>

<template>
    <div class="p-4 border-bottom">
        <c-input
            placeholder="搜索"
        >
            <template #prefix>
                <i-cosmic-search />
            </template>
        </c-input>
    </div>
    <div class="mb-12">
        <collapse
            v-for="(item, index) of tagDatas"
            :key="item.title"
            :title="item.title"
            :is-open="collapseIndex === index"
            @change="(event) => collapseChange(event, index)"
        >
            <div :class="$style.grid">
                <div
                    v-for="child of item.children"
                    :key="child.id"
                    :class="$style['grid-item']"
                >
                    <img class="w-80" :src="child.image" :alt="child.description" @click="() => { add(child); }">
                </div>
            </div>
        </collapse>
    </div>
</template>

<style module>
.grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: .8rem;
    grid-row-gap: .8rem;
}

.grid-item {
    composes: h-120 flex items-center justify-center from global;
    background-color: var(--color-gray-50);
    border-radius: .8rem;

}
</style>
