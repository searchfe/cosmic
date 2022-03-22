<script lang="ts" setup>
import Region from '../../common/component/region.vue';
import AtomDetailInfo from '../component/preview/color.vue';
import CompCard from '../component/card/comp.vue';

</script>
<template>
    <Region>
        <atom-detail-info />
    </Region>
    <Region title=" 组件数量 16" inverse>
        <div :class="$style['comp-list']">
            <comp-card v-for="item in [1, 2, 3, 4]" :key="item" />
        </div>
    </Region>
</template>


<style module>
.comp-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    row-gap: 24px;
    column-gap: 24px;
}
.filter {
    overflow-x: scroll;
}
.filter::-webkit-scrollbar {
    display: none; /* Chrome Safari */
}
</style>
