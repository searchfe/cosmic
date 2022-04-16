<script lang="ts" setup>
import { ref, toRaw, watch } from 'vue';
import { Select, SelectOption, Input } from 'cosmic-vue';
import { createUnique, update } from '../../../api/font';
import Dialog from '../common.vue';
import FontCell from '../../cell/font.vue';


const { executeMutation: createFont } = createUnique(['id']);
const { executeMutation: updateFont } = update();

interface TextOption {
    id: string;
    name: string;
    lineHeight: string;
    family: string;
    weight: string;
    size: string;
}

const props = withDefaults(defineProps<TextOption>(), {});
const name = ref('');

// 输入框双向绑定
const data = ref<Partial<gql.Font>>({
    id: '',
    family: 'PingFang',
    lineHeight: '12',
    weight: '400',
    size: '12px',
});

watch(() => [props.family, props.lineHeight, props.weight, props.size, props.name], () => {
    data.value = {
        id: props.id,
        family: props.family,
        lineHeight: props.lineHeight,
        weight: props.weight,
        size: props.size,
    };
    name.value = props.name;
});

const exsistingData = ref<Partial<gql.Color>[]>([]);

const showDialog = ref(false);

const familOptions = [{
    label: '苹方字体',
    value: 'PingFang',
}, {
    label: '宋体',
    value: 'SimSong',
}];

const sizeOptions = [{
    label: '12',
    value: '12px',
}, {
    label: '14',
    value: '14px',
}, {
    label: '16',
    value: '16px',
}, {
    label: '18',
    value: '18px',
}, {
    label: '20',
    value: '20px',
}, {
    label: '30',
    value: '30px',
}];

const weightOptions = [{
    label: '常规-400',
    value: '400',
}, {
    label: '细体-300',
    value: '300',
}, {
    label: '粗体-700',
    value: '700',
}];

const decrationOptions = [{
    label: '无修饰',
    value: 'none',
}, {
    label: '下划线',
    value: 'underline',
}, {
    label: '删除线',
    value: 'line-through',
}];

const emits = defineEmits(['success']);

function onChangeFamily(arg: { value: string }) {
    data.value.family = arg.value;
}

function onChangeSize(arg: { value: string }) {
    data.value.size = arg.value;
}

function onChangeWeight(arg: { value: string }) {
    data.value.weight = arg.value;
}

function onOK(args: { team: string }) {
    const inputedData = toRaw(data.value);
    const newFont = {
        ...args,
        ...inputedData,
    };
    if (!name.value) {
        alert('请输入名字');
        return;
    }
    if (!props.id) {
        delete newFont.id;
    }
    const queryData = {
        ...newFont,
        name: name.value,
    };
    const operation = props.id ? updateFont({ data: queryData }) : createFont({
        data: queryData as gql.CreateFontDTO,
        filter: newFont,
    });
    operation.then(res => {
        if (res.data) {
            emits('success');
            showDialog.value = false;
        } else {
            const duplicatData = res.error?.graphQLErrors?.[0]?.extensions?.data;
            if (Array.isArray(duplicatData)) {
                exsistingData.value = duplicatData as unknown as Partial<gql.Font>[];
            }
        }
    });
}

</script>
<template>
    <Dialog
        v-model:visible="showDialog"
        v-model:name="name"
        :title="id ? '编辑字形' : '新建字形'"
        :edit-mode="Boolean(id)"
        @ok="onOK"
    >
        <div style="padding: 0 10px">
            <Select :value="data.family" @on-change="onChangeFamily">
                <select-option
                    v-for="item in familOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
            </Select>
        </div>
        <div :class="$style['font-setup']">
            <div class="flex items-center">
                <i-cosmic-font class="text-sm" style="flex: none" />
                <Select :value="data.size" @on-change="onChangeSize">
                    <select-option
                        v-for="item in sizeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </Select>
            </div>
            <div>
                <Select :value="data.weight" @on-change="onChangeWeight">
                    <select-option
                        v-for="item in weightOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </Select>
            </div>
            <div>
                <Select value="none">
                    <select-option
                        v-for="item in decrationOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </Select>
            </div>
            <div class="flex items-center">
                <i-cosmic-line-height class="text-md" />
                <Input v-model:value="data.lineHeight" size="sm" />
            </div>
            <div class="flex items-center">
                <i-cosmic-line-width class="text-md" />
                <Input size="sm" />
            </div>
        </div>
        <div v-if="exsistingData.length > 0" :class="$style.duplicate">
            <div class="flex" :class="$style['duplicate-info']">
                <div class="mr-8">
                    <i-cosmic-caution />
                </div>
                <div>
                    <div>已存在于规范，不可重新创建</div>
                    <div class="mr-12 opacity-30">将使用规范替换更新</div>
                </div>
            </div>
            <div v-for="item in exsistingData" :key="item.id" class="mt-8 flex px-12">
                <div class="mr-10" :class="$style.preview">
                    <font-cell v-bind="item" />
                </div>
                <div>
                    <div>{{ item.name }}</div>
                    <div class="mt-10 opacity-30">规范描述</div>
                </div>
            </div>
        </div>
    </Dialog>
</template>

<style module>
.duplicate {
    border-top: 1px solid #25252B;
    padding-top: 12px;
}
.duplicate-info {
    padding: 0 14px 0 19px;
}
.preview {
    border: 1px solid rgba(255, 255, 255, .1);
}
.font-setup {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin: 8px 17px;
}
</style>
