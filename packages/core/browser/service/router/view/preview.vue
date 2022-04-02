<script lang="ts" setup>import { computed } from 'vue';
import vueQr from 'vue-qr/src/packages/vue-qr.vue';
const host = computed(() => location.host);
</script>
<template>
    <div class="flex justify-center items-center w-full h-full flex-col">
        <iframe
            src="?preview=1&page=0&frame=0"
            width="480"
            height="700"
        />
        <div class="mt-20">
            <vue-qr :text="host + '?preview=1&page=0&frame=0'" />
        </div>
        <div class="mt-20 text-md">
            <a src="?preview=1&page=0&frame=0">{{ host }}?preview=1&page=0&frame=0</a>
        </div>
    </div>
</template>
