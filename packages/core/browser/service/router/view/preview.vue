<script lang="ts" setup>import { computed } from 'vue';
import { ref } from 'vue';
import QRCode from 'qrcode';
const href = import.meta.env.VITE_PREVIEW_SERVER  + '?preview=1&page=0&frame=0';
const qrurl = ref();
QRCode.toDataURL(href).then((url: string) => {
    qrurl.value = url;
});

</script>
<template>
    <div class="flex justify-center items-center w-full h-full flex-col">
        <iframe
            src="?preview=1&page=0&frame=0"
            width="480"
            height="700"
        />
        <div class="mt-20">
            <img :src="qrurl">
        </div>
        <div class="mt-20 text-md select-text">
            <a src="href">{{ href }}</a>
        </div>
    </div>
</template>
