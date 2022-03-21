<script lang="ts" setup>
import {ref} from 'vue';
import { MTitle, MWidget } from '@cosmic/core/browser';
import Color from './color.vue';
import Stroke from './stroke.vue';

const isShowDetail = ref(false);


const clickHandler = () => {
    isShowDetail.value = !isShowDetail.value;
};

</script>

<template>
    <div>
        <MWidget>
            <MTitle title="边框">
                <i-cosmic-plus
                    v-if="!isShowDetail"
                    @click="clickHandler"
                />
                <i-cosmic-minus
                    v-else
                    @click="clickHandler"
                />
            </MTitle>
            <div v-if="isShowDetail" :class="$style.detail">
                <Stroke />
                <Color />
            </div>
        </MWidget>
    </div>
</template>

<style module>
.icon {
    font-size: var(--font-md)
}
.row {
    margin: var(--margin-md) 0;
}

.detail {
    composes: -v-py sm from global;
}
</style>