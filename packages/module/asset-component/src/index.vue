<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import { Input as CInput } from 'cosmic-vue';
import Collapse from './component/collapse.vue';
// import { mock } from './component/data';
import { schema as DataShema, mock as DataModel } from './data';


import { service, inject } from '@cosmic/core/browser';
import { SceneNode, getRenderSchemaAndModel, FrameNode } from '@cosmic/core/parts';

interface Data {
    title: string;
    children: Array<{poster: string, name: string}>
}

const mock: Ref<Data[]> = ref([]);

const nodeService = inject<service.NodeService>(service.TOKENS.Node);
const componentService = inject<service.ComponentService>(service.TOKENS.Component);

componentService.loaded.subscribe(name => {
    const conf = componentService.getComponentLibrary(name);
    const rs : Data[] = [];
    const store: any = {};
    Object.keys(conf.schema).forEach(name => {
        const c = conf.schema[name];
        const n = { poster: c.preview.image, name: c.schema?.description || name};
        c.preview.tags.forEach(tag => {
            store[tag] = store[tag] || {
                title: tag,
                children: [],
            };
            store[tag].children.push(n);
        });
    });
    Object.keys(store).forEach(key => {
        rs.push(store[key]);
    });
    mock.value = rs;
});

let node: SceneNode;

nodeService.selection.subscribe(nodes => {
    if (nodes.length === 0) return;
    node = nodes[0] as SceneNode;

});

const collapseIndex = ref<number>();

function collapseChange(event:boolean, index: number) {
    collapseIndex.value = event ? index : -1;
}

function add() {
    const componentNode = nodeService.addComponent(node as FrameNode);
    const {schema, model} = getRenderSchemaAndModel(DataShema, DataModel);
    componentNode.setPluginData('wise', {
        // 保留原始数据，后期计算会用到
        originSchema: DataShema,
        schema,
        model,
    });
}

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
            v-for="(item, index) of mock"
            :key="item.title"
            :title="item.title"
            :is-open="collapseIndex === index"
            @change="(event) => collapseChange(event, index)"
        >
            <div :class="$style.grid">
                <div
                    v-for="child of item.children"
                    :key="child.name"
                    :class="$style['grid-item']"
                >
                    <img class="w-50" :src="child.poster" @click="add">
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
