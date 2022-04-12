<script lang="ts" setup>
import { service } from '@cosmic/core/browser';
import  { type SceneNode, inject} from '@cosmic/core/parts';
import { ref, computed } from 'vue';
import FrameRender from './frame.vue';
import TextRender from './text.vue';
import ComponentRender from './component.vue';
interface RenderNodeProps {
    children: SceneNode[],
}
// interface updateList {
//     [id: string]: string;
// }

const props = withDefaults(defineProps<RenderNodeProps>(), {

});
// const nodeService = inject<service.NodeService>(service.TOKENS.Node);
// const changeNode = ref<updateList>({});

// nodeService.renderNodes.subscribe(([nodes, timestamp]) => {
//     const value: updateList = {};
//     nodes.forEach(node => {
//         value[node.id] = timestamp;
//     });
//     changeNode.value = value;
// });

</script>
<template>
    <template
        v-for="child in children "
        :key="child.id"
    >
        <frame-render
            v-if="child.type === 'FRAME'"
            :node="child"
        />
        <text-render
            v-if="child.type === 'TEXT'"
            :node="child"
        />
        <component-render
            v-else-if="child.type === 'COMPONENT'"
            :node="child"
        />
    </template>
</template>
