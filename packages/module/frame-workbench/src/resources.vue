<script lang="ts" setup>
    import { Tabs, TabPane } from 'cosmic-vue';
    function switchTab() {
        // do sth
    }
</script>
<template>
    <div>
        <Tabs size="sm" class="h-40 mx-12" default-active-tab="1" @on-change="switchTab">
            <TabPane label="图层" value="1" />
            <TabPane label="规范" value="2" />
            <TabPane label="资源" value="3" />
        </Tabs>
        <div class="border-bottom" />
    </div>
</template>