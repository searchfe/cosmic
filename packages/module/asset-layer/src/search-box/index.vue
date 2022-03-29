<script lang="ts" setup>
import { Input } from 'cosmic-vue';
import styles from './search-input.module.css';
</script>
<template>
    <div class="px-10 py-8 h-40">
        <Input size="sm" :styles="styles" placeholder="搜索">
            <template #prefix>
                <i-cosmic-search />
            </template>
        </Input>
    </div>
</template>
