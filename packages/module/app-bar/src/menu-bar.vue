<script lang="ts" setup>
import { Button } from 'cosmic-vue';
import buttonMenu from './menu-button.module.css';
</script>
<template>
    <div class="flex justify-start ml-6">
        <Button class="square" :styles="buttonMenu" size="xs">
            <i-cosmic-play />
        </Button>
        <Button class="min-w-40 mx-1" :styles="buttonMenu" size="xs">文件</Button>
        <Button class="min-w-40 mx-1" :styles="buttonMenu" size="xs">编辑</Button>
        <Button class="min-w-40 mx-1" :styles="buttonMenu" size="xs">帮助</Button>
        <!-- <Button>文件</Button>
        <Button>编辑</Button>
        <Button>帮助</Button> -->
    </div>
</template>
<style module>
</style>
