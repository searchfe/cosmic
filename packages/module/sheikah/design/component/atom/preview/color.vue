<script lang="ts" setup>
interface ColorPreview {
    name: string;
    desc: string;
    color: {
        day: string;
        night: string;
        dark: string;
    }
}
withDefaults(defineProps<ColorPreview>(), {
    name: 'C_X230',
    desc: '强蓝色，用于突出亿图的表达，多用于按钮',
    color: () => {
        return {
            day: '#4e6ef2',
            night: '#4e6ef2',
            dark: '#263778',
        };
    },
});

</script>
<template>
    <div class="w-full" :class="$style.wrapper">
        <div class="text-2xl">
            {{ name }}
        </div>
        <div class="text-md my-20" :class="$style.desc">
            {{ desc }}
        </div>
        <div class="flex flex-start">
            <div class="mr-12 flex items-center justify-center" :class="$style.cell" :style="{ background: color.day}">
                <span :class="$style.icon">
                    <i-cosmic-sun />
                </span>
                {{ color.day }}
            </div>
            <div class="mr-12 flex items-center justify-center" :class="$style.cell" :style="{ background: color.dark}">
                <span :class="$style.icon">
                    <i-cosmic-dark />
                </span>
                {{ color.dark }}
            </div>
            <div class="mr-12 flex items-center justify-center" :class="$style.cell" :style="{ background: color.night}">
                <span :class="$style.icon">
                    <i-cosmic-night />
                </span>
                {{ color.night }}
            </div>
        </div>
    </div>
</template>

<style module>
.wrapper {
    padding: 30px;
    background: #fff;
}
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
    margin-right: 6px;
}
</style>
