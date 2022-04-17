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
            <div v-if="day" class="mr-12 flex items-center justify-center" :class="[$style.cell, !day ? $style.emptybg : '']" :style="{ background: day}">
                <div v-if="day" :class="$style.mask" class="text-sm">
                    <span :class="$style.icon" class="text-sm">
                        <i-cosmic-sun />
                    </span>
                    {{ day }}
                </div>
                <div v-else :class="$style.empty">
                    ? 颜色为空
                </div>
            </div>
            <div class="mr-12 flex items-center justify-center" :class="[$style.cell, !night ? $style.emptybg : '']" :style="{ background: night}">
                <div v-if="night" :class="$style.mask" class="text-sm">
                    <span :class="$style.icon" class="text-sm">
                        <i-cosmic-night />
                    </span>
                    {{ night }}
                </div>
                <div v-else :class="$style.empty">
                    ? 颜色为空
                </div>
            </div>
            <div class="mr-12 flex items-center justify-center" :class="[$style.cell, !dark ? $style.emptybg : '']" :style="{ background: dark}">
                <div v-if="dark" :class="$style.mask" class="text-sm">
                    <span :class="$style.icon" class="text-sm">
                        <i-cosmic-dark />
                    </span>
                    {{ dark }}
                </div>
                <div v-else :class="$style.empty">
                    ? 颜色为空
                </div>
            </div>
        </div>
    </div>
</template>

<style module>
.cell {
    position: relative;
    box-sizing: border-box;
    width: 133px;
    height: 72px;
    border-radius: 6px;
    color: #fff;
    border: 1px solid #E0E0E0;
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
.mask {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0;
    bottom: 0;
    width: 133px;
    height: 28px;
    background: rgba(1, 1, 1, .2);
    color: var(--color-white);
}
.empty {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 12px;
    color: #b8b8b8;
    font-weight: 400;
}
.emptybg {
    background-image: url(https://fe-dev.bj.bcebos.com/%E5%8E%9F%E5%AD%90%E6%96%B9%E5%9D%97%E8%83%8C%E6%99%AF.png);
    background-size: 100%;
}
</style>
