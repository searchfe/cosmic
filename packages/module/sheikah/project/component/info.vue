<script lang="ts" setup>
    import Info from '../../common/component/info.vue';

    withDefaults(defineProps<{ title: string }>(), {
        title: '',
    });

</script>

<template>
    <Info :title="title" />
</template>
