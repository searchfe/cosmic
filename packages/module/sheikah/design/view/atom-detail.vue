<script lang="ts" setup>
import CompCard from '../component/card/comp.vue';

</script>
<template>
    <div>
        <div class="h-26 text-lg my-26">
            组件数量 16
        </div>
        <div :class="$style['comp-list']">
            <comp-card v-for="item in [1, 2, 3, 4]" :key="item" />
        </div>
    </div>
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
