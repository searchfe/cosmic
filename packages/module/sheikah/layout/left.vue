<script lang="ts" setup>
import TeamMenu from '../team/component/team-menu.vue';

</script>

<template>
    <team-menu />
    <div class="flex items-center px-20 h-30">
        <div :class="$style.prefix" class="h-30 flex items-center">
            <i-cosmic-plus class="text-sm" />
        </div>
        <span class="text-sm">
            新建业务
        </span>
    </div>
</template>

<style module>
.prefix {
    width: 22px
}
</style>
