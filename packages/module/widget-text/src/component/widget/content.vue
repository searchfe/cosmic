<script lang="ts" setup>
import { MClolorWidget } from '@cosmic/core/browser';
import Glyph from './glyph.vue';
import { Standard } from '../../data';

</script>

<template>
    <div class="mb-10">
        <Glyph />
        <m-clolor-widget :standard-list="Standard" />
    </div>
</template>