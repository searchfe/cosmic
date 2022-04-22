<script lang="ts" setup>import { computed } from 'vue';
import { ref } from 'vue';
import QRCode from 'qrcode';

const draft = localStorage.getItem('draft');
const href = import.meta.env.VITE_PREVIEW_SERVER  + '?preview=1&page=0&frame=0&draft=' + draft;
const qrurl = ref();
QRCode.toDataURL(href).then((url: string) => {
    qrurl.value = url;
});

</script>
<template>
    <div class="flex justify-center items-center w-full h-full flex-col">
        <iframe
            src="?preview=1&page=0&frame=0"
            width="418"
            height="700"
            style="overflow-y:auto"
        />
        <div class="mt-20">
            <img :src="qrurl">
        </div>
        <div
            class="mt-20 text-md select-text"
            contenteditable="true"
        >
            <a src="href">{{ href }}</a>
        </div>
    </div>
</template>
