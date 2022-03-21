<script lang="ts" setup>
import { MColor, MTitle } from '@cosmic/core/browser';
import Glyph from './glyph.vue';

</script>

<template>
    <div :class="$style.container">
        <Glyph />
        <MTitle
            title="颜色"
        >
            <span> 
                <i-cosmic-sun />
                <i-cosmic-grid-outline />
            </span>
        </MTitle>
        <MColor />
    </div>
</template>

<style module >

.container {
    padding-bottom: var(--padding-sm);
}

.row {
    margin: var(--margin-md) 0;
}

.radio-row {
    margin: var(--margin-md) 0;
    padding: 0 var(--padding-md);
}

.glyph {
    display: flex;
    flex-direction: column;
    background-color: var(--color-white);
}

.icon {
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
}
.radio-icon {
    font-size: 16px;
}

.glyph-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-items: center;
    height: 32px;
    padding-right: 10px;
}


</style>