<script lang="ts" setup>
    // import { Menu } from 'cosmic-vue';
    import Card from '../../../common/component/card.vue';
    import Preview from './cell/color.vue';

    // TODO delete it after gql modle upgrade
    interface Color {
        value: {
            day: string;
            night: string;
            dark: string;
        },
        title?: string;
        meta?: string;
        refCount: number;
    }

    withDefaults(defineProps<Color>(), {
        value: () => {
            return { day: 'none', night: 'none', dark: 'none'};
        },
        title: '',
        meta: '',
    });

</script>

<template>
    <Card :class="$style['atom-micro-card']">
        <div :class="$style['atom-preview']">
            <Preview v-bind="value" />
        </div>
        <div :class="$style['atom-info']">
            <div :class="$style['atom-title']">
                {{ title }}
            </div>
            <div class="mt-6">
                {{ meta }}
            </div>
        </div>

        <div
            :class="$style['atom-extra']"
            class="flex items-center"
        >
            <div :class="$style['atom-link-icon']">
                <i-cosmic-lock style="font-size: 12px" />
            </div>
            <span :class="$style['atom-link-num']">{{ refCount }}</span>
        </div>
    </Card>
</template>

<style module>
.atom-micro-card {
    display: flex;
    position: relative;
    padding: 14px;
    font-size: var(--font-sm);
    color: #1f1f1f;
    border-radius: 9px;
}
.atom-preview {
    flex: none;
    width: 72px;
    height: 72px;
    margin-right: 12px;
    border-radius: 8px;
}
.atom-info {
    height: 72px;
    padding-right: 10px;
    flex: auto;
    color: #858585
}
.atom-title {
    color: #1f1f1f;
}
.atom-extra {
    position: absolute;
    bottom: 18px;
    right: 17px;
    height: 26px;
}
.atom-link-num {
    display: inline-block;
    max-width: 24px;
    vertical-align: middle;
    opacity: .7;
    white-space: nowrap;
}
.atom-link-icon {
    margin-right: 10px;
    width: 12px;
    height: 12px;
    font-size: var(--font-sm);
}
</style>
