<script lang="ts" setup>
import Pop from './pop.vue';
import InputText from './input-text.vue';

defineProps({
    title: {
        type: String,
        default: '编辑外阴影规范',
    },
    current: {
        type: Number,
        default: 0,
    },
    item: {
        type: Object,
        default: () => ({}),
    },
});

const emits = defineEmits(['onInput', 'onCancel', 'onConfirm']);
const onInput = (data) => {
    console.error('edit onInput', data);

    // emits('onInput');
};
const cancelHandler = () => {
    emits('onCancel');
};
const confirmHandler = () => {
    emits('onConfirm');
};
</script>

<template>
    <Pop>
        <div>
            <div :class="[$style['title']]">
                {{ title }}
            </div>
            <div>
                <div :class="[$style['info']]">
                    标题：{{ item.title }}
                </div>
                <div
                    v-if="item.desc"
                    :class="[$style['info']]"
                >
                    描述：{{ item.desc }}
                </div>
            </div>
            <div :class="[$style['line']]" />
            <div :class="[$style['input-list']]">
                <div :class="[$style['item']]">
                    <InputText
                        id="offsetX"
                        is-dark
                        type="number"
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
                        is-dark
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
                        is-dark
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
                        is-dark
                        type="number"
                        model="spreadRadius"
                        :value="spreadRadius"
                        @onInput="onInput"
                    >
                        <i-cosmic-fuzzy :class="[$style['icon']]" />
                    </InputText>
                </div>
            </div>

            <div :class="[$style['line']]" />
            <div :class="[$style['correlation']]">
                相关应用资源/{{ item.length }}
            </div>
            <div :class="[$style['button-outer']]">
                <Button
                    :class="[$style['button'], $style['cancel']]"
                    @click="cancelHandler"
                >
                    取消
                </Button>
                <Button
                    :class="[$style['button'], $style['confirm']]"
                    @click="confirmHandler"
                >
                    确认
                </Button>
            </div>
        </div>
    </Pop>
</template>

<style module>
.line {
    margin: 0 -12px;
    height: 1px;
    background-color: #1C1C20;
}

.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-size: var(--font-sm);
    line-height: var(--leading-sm);
    margin-top: -3px;
    color: var(--color-white);
    position: relative;
}

.info {
    text-indent: var(--spacing-8);
    line-height: 26px;
    margin-bottom: var(--spacing-6);
    color: var(--color-white);
}

.info:not(:first-child) {
    color: var(--color-gray-200);
}

.line {
    margin: 0 -12px;
    height: 1px;
    background-color: #1C1C20;
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
    width: 12px;
    height: 12px;
    color: var(--color-white);
}

.correlation {
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    position: relative;
}

.correlation:before {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    content: '';
    display: block;
    width: 0;
    height: 0;
    border: 3px solid transparent;
    border-left-color: var(--color-white);
}

.button-outer {
    margin-top: var(--spacing-16);
    display: flex;
    align-items: center;
    justify-content: center;
}

.button {
    height: 26px;
    padding: 0 var(--spacing-16);
    border-radius: 13px;
    box-sizing: border-box;
    line-height: 26px;
    color: #fff;
}

.cancel {
    background-color: transparent;
    border: 1px solid #fff;
}

.confirm {
    border: none;
    margin-left: var(--spacing-12);
    background-color: #546BFF;
}
</style>
