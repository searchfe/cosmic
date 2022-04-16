<script lang="ts" setup>
withDefaults(defineProps<{
    src: string,
    style: Record<string, string>,
}>(), {
    src: 'https://t8.baidu.com/it/u=2964767724,3209265873&fm=217&app=126&size=r3,2&n=0&g=4n&f=PNG&fmt=auto&maxorilen2heic=2000000?s=51B5017206A776B9042656E503007026',
});


</script>

<template>
    <img 
        class="h-full"
        :src="src"
        :style="style"
    >
</template>