<script lang="ts" setup>
import  type { SceneNode} from '@cosmic/core/parts';
import FrameRender from './frame.vue';
interface RenderNodeProps {
    children: SceneNode[],
}


withDefaults(defineProps<RenderNodeProps>(), {

});

</script>
<template>
    <template
        v-for="child in children"
        :key="child.id"
    >
        <frame-render v-if="child.type === 'FRAME'" :node="child" />
    </template>
</template>
