<script lang="ts" setup>
import  { type SceneNode} from '@cosmic/core/parts';
import FrameRender from './frame.vue';
import TextRender from './text.vue';
import ComponentRender from './component.vue';
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
        <text-render v-if="child.type === 'TEXT'" :node="child" />
        <component-render v-else-if="child.type === 'COMPONENT'" :node="child" />
    </template>
</template>
