<script setup lang="ts">
import { MComponent } from '@cosmic-module/core';
import { Row, Col } from 'cosmic-vue';
</script>

<template>
    <div
        class="h-full"
    >
        <Row
            class="h-full"
        >
            <Col :span="3" />
            <Col :span="6" />
            <Col
                class="h-full"
                :class="$style.border"
                :span="3"
            >
                <m-component
                    src="@cosmic-module/text-widget"
                />
                <div :class="$style['border-bottom']" />
                <m-component
                    src="@cosmic-module/border-widget"
                />
                <div :class="$style['border-bottom']" />
                <m-component
                    src="@cosmic-module/radius-widget"
                />
            </Col>
        </Row>
    </div>
</template>
<style module>
.border {
    border-left: 1px solid var(--color-gray-200);
}

.border-bottom {
    border-bottom: 1px solid var(--color-gray-200);
}
</style>
