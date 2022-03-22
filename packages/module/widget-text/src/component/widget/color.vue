<script lang="ts" setup>
import { MTitle, MColor } from '@cosmic/core/browser';
</script>

<template>
    <div class="w-full">
        <MTitle title="颜色">
            <div
                class="flex justify-between items-center w-30"
            >
                <i-cosmic-sun />
                <i-cosmic-grid-outline />
            </div>
        </MTitle>
        <MColor />
    </div>
</template>
