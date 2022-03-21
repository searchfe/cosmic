<script lang="ts" setup>
import {Select, SelectOption, Input} from 'cosmic-vue';
import MTitle from '../title/title.vue';
</script>

<template>
    <div
        :class="$style.content"
        class="cos-mode-reverse"
    >
        <slot name="title">
            <div :class="$style.title">
                <MTitle title="文字规范">
                    <i-cosmic-plus />
                </MTitle>
            </div>
        </slot>
        <slot name="filter">
            <div :class="$style.filter">
                <div>
                    <Select allow-input>
                        <SelectOption
                            label="1"
                            value="2"
                        />
                    </Select>
                </div>
                <div>
                    <Input placeholder="请输入关键词" />
                </div>
            </div>
        </slot>
        <slot />
    </div>
</template>

<style module>

.content {
    padding: var(--spacing-4) 0;
    background-color: var(--color-gray-50);
    border-radius: var(--spacing-4);
    color: var(--color-light);

}
.title {
    composes: -v-h -v-px md from global;
    color: var(--color-dark);
}

.filter {
    composes: -v-mx flex sm from global;
    border-top: solid 1px var(--color-gray-100);
    border-bottom: solid 1px var(--color-gray-100);
}

.filter > div:first-child {
    flex: 1
}

.filter > div:last-child {
    flex: 3
}
</style>