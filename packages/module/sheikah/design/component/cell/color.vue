<script lang="ts" setup>
import { computed } from 'vue';
interface ColorPreviewOption {
    day?: string;
    night?: string;
    dark?: string;
}
const props = withDefaults(defineProps<ColorPreviewOption>(), {
    day: 'none',
    night: 'none',
    dark: 'none',
});

const data = computed(() => {
    return [{
        key: 'day',
        value: props.day,
    }, {
        key: 'night',
        value: props.night,
    }, {
        key: 'dark',
        value: props.dark,
    }];
});

</script>


<template>
    <div
        class="flex overflow-hidden"
        :class="$style.wrapper"
    >
        <div
            v-for="item in data"
            :key="item.key"
            class="h-wull flex items-center justify-center"
            :class="$style.cell"
            :style="{ background: item.value }"
        >
            <i-cosmic-question
                v-if="!item.value || item.value ==='none'"
                class="text-sm"
                style="color: var(--color-gray-400)"
            />
        </div>
    </div>
</template>

<style module>
.wrapper {
    box-sizing: border-box;
    width: 72px;
    height: 72px;
    border: 1px solid var(--color-gray-100);
    border-radius: var(--rounded-md);
    background-image: url(https://fe-dev.bj.bcebos.com/%E5%8E%9F%E5%AD%90%E6%96%B9%E5%9D%97%E8%83%8C%E6%99%AF.png);
    background-size: 100% 100%;
}
.cell {
    flex: 1 1 30%;
}
.middle {
    margin: 0 1px;
}
</style>
