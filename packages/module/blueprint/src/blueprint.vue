<script setup lang="ts">
import { Space } from 'cosmic-vue';
import ProposalProperties from './components/proposal/properties.vue';
</script>

<template>
    <Space
        direction="vertical"
        :class="$style.main"
    >
        <ProposalProperties
            component-id="a"
            :properties="[]"
        />
    </Space>
</template>

<style module>
.main {
    padding: 24px;
    width: 100%;
}

.main > :not(:last-child) {
    margin-bottom: 8px;
}
</style>
