<script lang="ts" setup>
import { Input } from 'cosmic-vue';
import { router as vueRouter } from '@cosmic/core/browser';
import CompCard from '../component/card/comp.vue';
import CompFilter from '../component/filter.vue';
import Region from '../../common/component/region.vue';

const { useRouter } = vueRouter;

const router = useRouter();

function onClickComp() {
    router.push({ name: 'component:detail' });
}

</script>
<template>
    <Region title="组件">
        <div class="flex flex-start">
            <comp-filter text="基础类" num="82">
                <template #icon>
                    <i-cosmic-scale />
                </template>
                <template #hover-icon>
                    <i-cosmic-scale style="color: white;" />
                </template>
            </comp-filter>
            <comp-filter text="布局类" num="13">
                <template #icon>
                    <i-cosmic-layout />
                </template>
                <template #hover-icon>
                    <i-cosmic-layout style="color: white;" />
                </template>
            </comp-filter>
            <comp-filter text="展示类" num="20">
                <template #icon>
                    <i-cosmic-contain />
                </template>
                <template #hover-icon>
                    <i-cosmic-contain style="color: white;" />
                </template>
            </comp-filter>
            <comp-filter text="输入类" num="8">
                <template #icon>
                    <i-cosmic-input />
                </template>
                <template #hover-icon>
                    <i-cosmic-input style="color: white;" />
                </template>
            </comp-filter>
            <comp-filter text="反馈类" num="12">
                <template #icon>
                    <i-cosmic-feedback />
                </template>
                <template #hover-icon>
                    <i-cosmic-feedback style="color: white;" />
                </template>
            </comp-filter>
        </div>
        <template #bottom>
            <div>
                <Input placeholder="组件查询" :class="$style.input" />
            </div>
        </template>
    </Region>
    <Region inverse>
        <div :class="$style['card-list']" @click="onClickComp">
            <comp-card />
            <comp-card />
            <comp-card />
            <comp-card />
        </div>
    </Region>
</template>
<style module>
.card-list {
    margin-top: 24px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 24px;
    row-gap: 24px;
}
.input {
    width: 268px;
    border: 1px solid #1f1f1f;
    border-radius: 4px;
    opacity: .3;
}
</style>
