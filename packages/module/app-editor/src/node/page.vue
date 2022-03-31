<script lang="ts" setup>
import  { type PageNode, util } from '@cosmic/core/parts';

interface PageProps {
    node: PageNode,
}

withDefaults(defineProps<PageProps>(), {

});

</script>
<template>
    <div
        :style="{
            background: util.toBackgroundStyle(node?.backgrounds[0]),
        }"
    >
        <slot />
    </div>
</template>
