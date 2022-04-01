<script lang="ts" setup>
import Card from '../../../common/component/card.vue';
import Color from '../cell/color.vue';
import Border from '../cell/border.vue';
import Font from '../cell/font.vue';
import Shadow from '../cell/shadow.vue';
import Corner from '../cell/corner.vue';
import Opacity from '../cell/opacity.vue';

import type { AtomType } from '../../types';


interface AtomCardOption {
    data: Record<string, unknown>,
    name?: string;
    type: AtomType;
    meta?: string;
    refCount: number;
}

const COMP_MAP = {
    'color': Color,
    'font': Font,
    'border': Border,
    'corner': Corner,
    'shadow': Shadow,
    'opacity': Opacity,
};

withDefaults(defineProps<AtomCardOption>(), {
    data: () => ({}),
    name: '',
    meta: '描述信息',
    refCount: 0,
});

</script>

<template>
    <Card :class="$style['atom-micro-card']">
        <div :class="$style['atom-preview']">
            <component :is="COMP_MAP[type]" v-bind="data" />
        </div>
        <div :class="$style['atom-info']">
            <div :class="$style['atom-title']">
                {{ name }}
            </div>
            <div class="mt-7">
                {{ meta }}
            </div>
        </div>

        <div
            :class="$style['atom-extra']"
            class="flex items-center"
        >
            <div :class="$style['atom-link-icon']">
                <i-cosmic-comp class="text-sm" />
            </div>
            <span :class="$style['atom-link-num']">{{ refCount }}</span>
        </div>
    </Card>
</template>

<style module>
.atom-micro-card {
    display: flex;
    position: relative;
    padding: 12px;
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
