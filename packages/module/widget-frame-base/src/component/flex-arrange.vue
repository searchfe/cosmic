<script lang="ts" setup>
import Tabs from './tab/tabs.vue';
import { watchEffect, ref, type Ref, onMounted, onUnmounted } from 'vue';
import { Button } from 'cosmic-vue';
import ButtoLightStyle from './button-light.module.css';
import { DirectionData, AlignItemsData, BetweenData } from '../common/flex-arrange';

interface Porps {
    flexDirection: string;
    primaryAxisAlignItems: string;
    counterAxisAlignItems: string;
}

const props = withDefaults(defineProps<Porps>(), {
    flexDirection: 'HORIZONTAL',
    primaryAxisAlignItems: 'MIN',
    counterAxisAlignItems: 'MIN',
});

const tabIndex = ref('0');
watchEffect(() => {
    tabIndex.value = props.primaryAxisAlignItems === 'SPACE_BETWEEN'? '1': '0';
});


const isShowPopup = ref(false);

const wrapper = ref() as Ref<HTMLElement>;

const emits = defineEmits(['change', 'primaryAxisAlignItems']);

function changeTab(value:string) {
    const rs = value == '1' ? 'SPACE_BETWEEN': 'MIN';
    if (value !== props.primaryAxisAlignItems) {             
        emits('primaryAxisAlignItems', rs);
    }
}
function onChange(justify: string, align: string) {
     emits('change', { justify, align });
}

function autoClose(event: MouseEvent) {
    const currentTarget = event.target as HTMLElement;
    const isIncludes = wrapper.value && wrapper.value.contains(currentTarget);
    if (isIncludes) {
        return;
    }
    // emitChange();
    isShowPopup.value = false;
}


onUnmounted(() => {
    window.document.body.removeEventListener('click', autoClose);
});

onMounted(() => {
    window.document.body.addEventListener('click', autoClose, false);
});


</script>

<template>
    <div ref="wrapper" class="relative">
        <Button
            size="sm -v-mx" class="square" :styles="ButtoLightStyle"
            :class="isShowPopup ? 'active' : ''"
            @click="(event) => {isShowPopup = true;}"
        >
            <i-cosmic-arrange />
        </Button>
        <div
            v-show="isShowPopup"
            :class="$style.wrapper"
            class="absolute cos-mode-reverse"
        >
            <Tabs
                size="sm"
                :value="primaryAxisAlignItems !== 'SPACE_BETWEEN'? '0': '1'"
                :data="[{label: '排列', value: '0', class: 'w-50'}, {label: '等距', value: '1', class: 'w-50'}]"
                @change="changeTab"
            />
            <div
                v-if="primaryAxisAlignItems !== 'SPACE_BETWEEN'"
                :class="['w-100 h-100 mt-8 flex flex-wrap justify-between align-middle', $style.box]"
            >
                <template
                    v-for="align in ['MIN', 'CENTER', 'MAX']"
                    :key="align"
                >
                    <div
                        v-for="justify in ['MIN', 'CENTER', 'MAX']"
                        :key="justify"
                        class="w-32 h-32 flex flex-wrap flex-shrink-0 content-around"
                        :class="[
                            DirectionData[flexDirection].container,
                            AlignItemsData[align].container,
                            $style['box-item'],
                            primaryAxisAlignItems === justify && counterAxisAlignItems === align ? 'active': ''
                        ]"
                        @click="() => onChange(justify, align)"
                    >
                        <div :class="[DirectionData[flexDirection].maxItem, $style['a-item']]" />
                        <div :class="[DirectionData[flexDirection].minItem, $style['a-item']]" />
                    </div>
                </template>
            </div>
            <div
                v-else
                :class="['w-100 h-100 mt-8 flex flex-wrap justify-between align-middle', $style.box]"
            >
                <div
                    v-for="align in ['MIN', 'CENTER', 'MAX']"
                    :key="align"
                    class="flex"
                    :class="[
                        BetweenData[flexDirection].line,
                        $style['box-item'],
                        counterAxisAlignItems === align ? 'active': ''
                    ]"
                >
                    <div
                        v-for="justify in ['between-0', 'between-1', 'between-2']"
                        :key="justify"
                        class="w-32 h-32 flex flex-wrap flex-shrink-0 content-around"
                        :class="[
                            BetweenData[flexDirection].container,
                            AlignItemsData[align].container,
                        ]"
                        @click="() => onChange('SPACE_BETWEEN', align)"
                    >
                        <div :class="[BetweenData[flexDirection][justify], $style['a-item']]" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style module>
.wrapper {
    background-color: var(--color-light);
    color: var(--color-dark);
    top: 2.4rem;
    right: 0.4rem;
    border-radius: 0.8rem;
    z-index: 10;
    padding: 1.2rem;
}
.box {
    border: 1px solid var(--color-gray-400);
    border-radius: 0.4rem;
}
.a-item {
    border-radius: 1px;
    background-color: var(--color-dark);
}
.box-item {
    opacity: .1;
}
.box-item:hover {
    opacity: .7;
}
.box-item:global(.active) {
    opacity: 1;
}
</style>
