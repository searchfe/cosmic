<script lang="ts" setup>
import { Button } from 'cosmic-vue';
import ButtonStyle from './button.module.css';
import ButtonRoundedStyle from './button-rounded.module.css';
</script>
<template>
    <div class="flex justify-start ml-6">
        <Button :styles="ButtonRoundedStyle" size="xs">
            <i-cosmic-play />
        </Button>
        <Button :styles="ButtonStyle" size="xs">文件</Button>
        <Button :styles="ButtonStyle" size="xs">编辑</Button>
        <Button :styles="ButtonStyle" size="xs">帮助</Button>
        <!-- <Button>文件</Button>
        <Button>编辑</Button>
        <Button>帮助</Button> -->
    </div>
</template>
<style module>
</style>
