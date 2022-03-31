<script lang="ts" setup>
interface ColorPreview {
    desc: string;
    day: string;
    night: string;
    dark: string;
}

withDefaults(defineProps<ColorPreview>(), {
    name: 'C_X230',
    desc: '强蓝色，用于突出亿图的表达，多用于按钮',
    day: '',
    night: '',
    dark: '',
});

</script>
<template>
    <div class="w-full">
        <div class="text-md my-20" :class="$style.desc">
            {{ desc }}
        </div>
        <div class="flex flex-start" style="font-size: 0">
            <div v-if="day" class="mr-12 flex items-center justify-center" :class="$style.cell" :style="{ background: day}">
                <span :class="$style.icon" class="text-sm">
                    <i-cosmic-sun />
                </span>
                <span class="text-sm">
                    {{ day }}
                </span>
            </div>
            <div v-if="night" class="mr-12 flex items-center justify-center" :class="$style.cell" :style="{ background: night}">
                <span :class="$style.icon" class="text-sm">
                    <i-cosmic-dark />
                </span>
                <span class="text-sm">
                    {{ night }}
                </span>
            </div>
            <div v-if="dark" class="mr-12 flex items-center justify-center" :class="$style.cell" :style="{ background: dark}">
                <span :class="$style.icon" class="text-sm">
                    <i-cosmic-night />
                </span>
                <span class="text-sm">
                    {{ dark }}
                </span>
            </div>
        </div>
    </div>
</template>

<style module>
.cell {
    width: 140px;
    height: 60px;
    border-radius: 6px;
    color: #fff;
}
.desc {
    color: #757575;
}
.icon {
    display: inline-block;
    height: 12px;
    line-height: 12px;
    margin-right: 6px;
}
</style>
