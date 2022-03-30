<script lang="ts" setup>
import { Breadcrumb, BreadcrumbItem } from 'cosmic-vue';


</script>

<template>
    <div class="mx-40" :class="$style.container">
        <Breadcrumb separator=">">
            <BreadcrumbItem>首页</BreadcrumbItem>
            <BreadcrumbItem>第二页</BreadcrumbItem>
            <BreadcrumbItem>第三页</BreadcrumbItem>
        </Breadcrumb>
    </div>
</template>

<style module>
.container {
    margin-top: 32px;
}
</style>
