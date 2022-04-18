<script lang="ts" setup>
import { Input, InputNumber } from 'cosmic-vue';
import { watchEffect, ref, type Ref, onMounted, onUnmounted} from 'vue';
import InputStyle from './input.module.css';

type PaddingData = {
    top: number, right: number, bottom: number, left: number,
}
interface Porps {
    data: PaddingData
}

const props = withDefaults(defineProps<Porps>(), {
    data: () => { return {top: 10, right: 0, bottom: 0, left: 0}; },
});

const d = ref({top: 0, right: 0, bottom: 0, left: 0 }) as Ref<PaddingData>;
const sum = ref('');

watchEffect(() => {
    d.value = props.data;
    if(d.value.top === d.value.left && d.value.top === d.value.right && d.value.top === d.value.bottom) {
        sum.value = d.value.top.toString();
    } else {
        sum.value = [d.value.top, d.value.right, d.value.bottom, d.value.left].join(', ');
    }
});
function focus(e: {event: KeyboardEvent}) {
    (e.event.target as any).select();
}
function inputSum(e: {value: string}) {
    const v = (e.value || '').replace(/\s/g, '');
    if (v.match(/^[\d]+$/)) {
        d.value.top = d.value.right = d.value.bottom = d.value.left = parseInt(v);
        return;
    } else if (v.match(/^([\d]+),([\d]+),([\d]+),([\d]+)$/)) {
        d.value.top = parseInt(RegExp.$1);
        d.value.right = parseInt(RegExp.$2);
        d.value.bottom = parseInt(RegExp.$3);
        d.value.left = parseInt(RegExp.$4);
        return;
    }
}

function keydownInput(e: KeyboardEvent) {
    if (e.code === 'Enter') {
        (e.target as any)?.blur();
        isShowPopup.value = false;
    }
}
const isShowPopup = ref(false);

const wrapper = ref() as Ref<HTMLElement>;

const emits = defineEmits(['onCancel', 'onChange']);

function autoClose(event: MouseEvent) {
    const currentTarget = event.target as HTMLElement;
    const isIncludes = wrapper.value && wrapper.value.contains(currentTarget);
    if (isIncludes) {
        return;
    }
    emitChange();
    isShowPopup.value = false;
}


onUnmounted(() =>  {
    window.document.body.removeEventListener('click', autoClose);
});

onMounted(() => {
    window.document.body.addEventListener('click', autoClose, false);
});

function onChange() {
    emitChange();
}
function emitChange() {
    emits('onChange', {value: d.value});
}

function checkTab() {
    // to switch tab
    //console.log(event);
}
</script>

<template>
    <div ref="wrapper" class="relative">
        <Input
            size="sm" :controls="false"
            :class="isShowPopup? 'active': ''"
            :value="sum" :styles="InputStyle"
            @on-focus="(event) => {event.target.select(); isShowPopup = true;}"
            @on-input="inputSum"
            @keydown="keydownInput"
            @on-change="onChange"
        >
            <template #prefix>
                <i-cosmic-board />
            </template>
            <template #subfix>
                <i-cosmic-arrow-down />
            </template>
        </Input>
        <div
            v-show="isShowPopup"
            :class="$style.wrapper"
            class="absolute cos-mode-reverse"
        >
            <input-number align="center" :controls="false" :value="d.top" size="sm" class="w-26 h-26 layout-input absolute" @on-focus="focus" @on-input="({value}) => {d.top = parseInt(value) || 0;}" />
            <input-number align="center" :controls="false" :value="d.right" size="sm" class="w-26 h-26 layout-input absolute" @on-focus="focus" @on-input="({value}) => {d.right = parseInt(value) || 0;}" />
            <input-number align="center" :controls="false" :value="d.bottom" size="sm" class="w-26 h-26 layout-input absolute" @on-focus="focus" @on-input="({value}) => {d.bottom = parseInt(value) || 0;}" />
            <input-number align="center" :controls="false" :value="d.left" size="sm" class="w-26 h-26 layout-input absolute" @on-focus="focus" @on-input="({event, value}) => {d.left = parseInt(value) || 0;}" @on-keydown="checkTab" />
            <svg :class="$style.msketch" width="48" class="absolute" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fill-rule="evenodd">
                    <rect class="item" :class="d.top === 0 ? '': 'active'" fill="#FFF" x="11" y="5" width="26" height="4" rx="1" />
                    <rect class="item" :class="d.right === 0 ? '': 'active'" fill="#FFF" transform="matrix(-1 0 0 1 82 0)" x="39" y="11" width="4" height="26" rx="1" />
                    <rect class="item" :class="d.bottom === 0 ? '': 'active'" fill="#FFF" x="11" y="39" width="26" height="4" rx="1" />
                    <rect class="item" :class="d.left === 0 ? '': 'active'" fill="#FFF" transform="matrix(-1 0 0 1 14 0)" x="5" y="11" width="4" height="26" rx="1" />
                    <rect x=".5" y=".5" width="47" height="47" rx="4" stroke="#999" />
                </g>
            </svg>
        </div>
    </div>
</template>
<style module>
.wrapper {
    background-color: var(--color-light);
    color: var(--color-dark);
    top: 2.4rem;
    left: 1.8rem;
    width: 12.4rem;
    height: 12.4rem;
    border-radius: 0.8rem;
    z-index: 10;
}
.wrapper :global(.layout-input) {
    padding: 0;
}

.wrapper :global(.layout-input):nth-child(1) {
    top: 0.8rem;
    left: 50%;
    margin-left: -1.3rem;
}
.wrapper :global(.layout-input):nth-child(2) {
    top: 50%;
    right: 0.8rem;
    margin-top: -1.3rem;
}
.wrapper :global(.layout-input):nth-child(3) {
    bottom: 0.8rem;
    left: 50%;
    margin-left: -1.3rem;
}
.wrapper :global(.layout-input):nth-child(4) {
    top: 50%;
    left: 0.8rem;
    margin-top: -1.3rem;
}
.msketch {
    left: 3.8rem;
    top: 3.8rem;
}
.msketch :global(.item){
    opacity: 0.3;
}
.msketch :global(.item.active){
    opacity: 1;
}

</style>
