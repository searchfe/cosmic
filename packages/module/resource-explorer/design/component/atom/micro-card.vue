<script lang="ts" setup>
    // import { Menu } from 'cosmic-vue';
    import Card from '../../../common/component/card.vue';

    // const items = [
    //     {
    //         value: 1,
    //         text: '编辑',
    //     },
    //     {
    //         value: 2,
    //         text: '删除',
    //     },
    // ];

    withDefaults(defineProps<{ color: string }>(), {
        color: '#1f1f99',
    });

</script>

<template>
    <Card :class="$style['atom-micro-card']">
        <div
            :class="$style['atom-preview']"
            :style="{ background: color }"
        />
        <div
            class="flex"
            :class="$style['atom-info']"
        >
            <div
                class="flex flex-col justify-between"
                :class="$style['atom-info-content']"
            >
                <div :class="$style['atom-title']">
                    一级标题
                </div>
                <div>FC001</div>
                <div>三图模版</div>
            </div>
        </div>

        <div
            :class="$style['atom-extra']"
            class="flex items-center"
        >
            <div :class="$style['atom-link-icon']">
                <i-cosmic-more style="font-size: 12px" />
            </div>
            <span :class="$style['atom-link-num']">3</span>
        </div>
    </Card>
</template>

<style module>
.atom-micro-card {
    display: flex;
    position: relative;
    padding: 14px;
    height: 106px;
    font-size: var(--font-sm);
    color: #1f1f1f;
}
.atom-preview {
    flex: none;
    width: 78px;
    height: 78px;
    margin-right: 12px;
    border-radius: 8px;
}
.atom-info {
    padding-right: 10px;
    flex: auto;
}
.atom-info-content {
    padding: 10px 0;
    color: #858585;
}
.atom-title {
    color: #1f1f1f;
}
.atom-extra {
    position: absolute;
    top: 14px;
    right: 14px;
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
}
</style>
