<script lang="ts" setup>
import {ref, reactive} from 'vue';
import Preview from './preview.vue';
import Edit from './edit.vue';
import InputText from './input-text.vue';
import EffectItem from './effect-item.vue';
import {MTitle, MColor} from '@cosmic/core/browser';

const props = defineProps({
    insetTitle: {
        type: String,
        default: '',
    },
    isOpen: {
        type: Boolean,
        default: true,
    },
    offsetX: {
        type: [Number, String],
        default: 2,
    },
    offsetY: {
        type: [Number, String],
        default: 2,
    },
    blurRadius: {
        type: [Number, String],
        default: 5,
    },
    spreadRadius: {
        type: [Number, String],
        default: 5,
    },
    color: {
        type: String,
        default: '',
    },
    // 是否内阴影
    isInset: {
        type: Boolean,
        default: true,
    },
});
// const isOpen = ref<boolean>(props.isOpen ? props.isOpen : false);
const offsetX = ref<number | string>(props.offsetX ? props.offsetX : 0);
const offsetY = ref<number | string>(props.offsetY ? props.offsetY : 0);
const blurRadius = ref<number | string>(props.blurRadius ? props.blurRadius : 0);
const spreadRadius = ref<number | string>(props.spreadRadius ? props.spreadRadius : 0);
// const color = ref<string>(props.color);
// const boxShadow = ref(`${offsetX.value}px ${offsetY.value}px ${blurRadius.value}px ${spreadRadius.value}px ${color.value}${props.isInset ? ' inset' : ''}`);


// const selecteData = reactive(
//     [
//         {
//             val: '1',
//             label: '标题'
//         },
//         {
//             val: '2',
//             label: '描述'
//         },
//         {
//             val: '3',
//             label: '编码'
//         }
//     ]
// );


const previewData = reactive(
    [
        {
            title: '阴影一',
            desc: '一图模板',
            code: 'SHADOW-001',
            boxShadow: '0px 20px 20px 10px fuchsia',
        },
        {
            title: '阴影二',
            desc: '二图模板',
            code: 'SHADOW-002',
            boxShadow: '0px 20px 20px 10px cyan',
        },
        {
            title: '阴影三',
            desc: '三图模板',
            boxShadow: '0px 20px 20px 10px inset fuchsia',
        },
    ],
);
const showPreview = ref(true);
const previewDataIndex = ref(-1);
// 是否展示编辑框
const showEditData = ref(false);
let editData = reactive({});
editData = previewData[0];
// 是否展示 效果
const showEffect = ref(true);

const emits = defineEmits(['onInput', 'onOpen', 'onOperate']);
const addEffect = () => {
    showPreview.value = true;
};
const onInput = (data) => {
    console.log('input', data, offsetX.value);

    offsetX.value = data.offsetX || offsetX.value;
    offsetY.value = data.offsetY || offsetY.value;
    blurRadius.value = data.blurRadius || blurRadius.value;
    spreadRadius.value = data.spreadRadius || spreadRadius.value;

    console.log('onInput', data, offsetX.value, offsetY.value, blurRadius.value, spreadRadius.value);
    emits('onInput');
};
// const onAdd = () => {
//
// };
const editBoxShadow = ({data, index}) => {

    // showEditData.value = true;
    showPreview.value = false;
    previewDataIndex.value = index;
    showEffect.value = false;
    editData = data;

    console.log('editBoxShadow', data, index, previewData, editData);
};
const onConfirm = () => {
    showEditData.value = false;
};
const onCancel = () => {
    showEditData.value = false;
};
const onEdit = () => {
    showEditData.value = true;
    showEffect.value = true;
};
const onUnlock = () => {
    showEffect.value = true;
};
</script>

<template>
    <div v-if="showEffect">
        <MTitle title="效果">
            <i-cosmic-grid-outline @click="addEffect" />
        </MTitle>
        <div :class="[$style['input-list']]">
            <div :class="[$style['item']]">
                <InputText
                    id="offsetX"
                    :class="[$style['input']]"
                    type="percent"
                    model="offsetX"
                    :value="offsetX"
                    @onInput="onInput"
                >
                    <i-cosmic-fuzzy :class="[$style['icon']]" />
                </InputText>
            </div>
            <div :class="[$style['item']]">
                <InputText
                    id="offsetY"
                    :class="[$style['input']]"
                    type="number"
                    model="offsetY"
                    :value="offsetY"
                    @onInput="onInput"
                >
                    <i-cosmic-fuzzy :class="[$style['icon']]" />
                </InputText>
            </div>

            <div :class="[$style['item']]">
                <InputText
                    id="blurRadius"
                    :class="[$style['input']]"
                    type="number"
                    model="blurRadius"
                    :value="blurRadius"
                    @onInput="onInput"
                >
                    <i-cosmic-fuzzy :class="[$style['icon']]" />
                </InputText>
            </div>
            <div :class="[$style['item']]">
                <InputText
                    id="spreadRadius"
                    v-model="spreadRadius"
                    :class="[$style['input']]"
                    type="number"
                    model="spreadRadius"
                    :value="spreadRadius"
                    @onInput="onInput"
                >
                    <i-cosmic-vertical-height :class="[$style['icon']]" />
                </InputText>
            </div>
        </div>
    </div>
    <div v-else>
        <EffectItem
            :item="editData"
            @onEdit="onEdit"
            @onUnlock="onUnlock"
        />
    </div>

    <Preview
        v-if="showPreview"
        :current="previewDataIndex"
        :data-ll="previewDataIndex"
        :title="insetTitle + '规范'"
        :data-list="previewData"
        @onAdd="onAdd"
        @onEdit="editBoxShadow"
    />
    <Edit
        v-if="showEditData"
        :title="'编辑' + insetTitle + '规范'"
        :item="editData"
        @onCancel="onCancel"
        @onConfirm="onConfirm"
    />
    <div>
        <MTitle title="颜色">
            <div class="flex justify-between items-center">
                <i-cosmic-sun />
                <i-cosmic-grid-outline />
            </div>
        </MTitle>
        <MColor />
    </div>
</template>

<style module>

.input-list {
    padding: 0 var(--spacing-14);
}

.item {
    display: inline-block;
    margin: 0 var(--spacing-6) var(--spacing-6) 0;
}

.item .icon {
    position: absolute;
    top: 50%;
    left: var(--spacing-6);
    transform: translateY(-50%);
}
</style>
