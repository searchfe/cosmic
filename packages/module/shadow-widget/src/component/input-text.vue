<script lang="ts" setup>
import {ref, computed} from 'vue';

const PERCENT_PATT = /(^(-|[1-9])([0-9])*%$)|(^0%$)/;

const props = defineProps({
    // 是否是黑色
    isDark: {
        type: Boolean,
        default: false,
    },
    id: {
        type: String,
        default: '',
    },
    class: {
        type: String,
        default: 'input',
    },
    type: {
        type: String,
        default: 'string',
    },
    placeholder: {
        type: String,
        default: '',
    },
    model: {
        type: String,
        default: '',
    },
    value: {
        type: [String, Number],
        default: '0',
    },
});

const className = ref(props.class || '');
// TODO 唯一id 最好用公用方法生成，这里存在重复可能。
const uniqueId = computed(
    () => {
        return `${ props.id ? props.id + '-' : '' }input-${ (Math.random() * 10000000).toString(16).replace('.', '-') }`;
    },
);

const inputModel = ref(props.value);
const showArraw = ref(true);
const inputRef = ref();


const emits = defineEmits(['onChange', 'onInput', 'onKeydown', 'onFocus', 'onBlur']);

const changeHandler = (event) => {
    emits('onChange', {event});
};

const inputHandler = (event) => {

    let val = event.target.value;
    val = val.replace(/[a-zA-Z]/gi, '');
    console.log('inputHandler', val, event.target.value);
    if (!val) {
        if (props.type === 'percent') {
            val = '0%';
        }
        else {
            val = 0;
        }
    }
    inputModel.value = val;
    const modelValue = inputModel.value + '';
    console.log('inputHandler', val, event.target.value, modelValue, inputModel.value);
    // const isPercent = modelValue.match(PERCENT_PATT);
    // TODO 数字和百分比对事件以及异常输入处理 预留处理逻辑
    // if (props.type === 'number') {
    //     // inputModel.value = inputModel.value || 0;
    // }
    // else if (props.type === 'percent') {
    //
    //
    // }
    const args = {
        event,
        model: props.model,
    };
    args[props.model] = inputModel.value;
    console.error('changeHandler', args);
    // 预留
    if (props.type === 'percent') {
        emits('onInput', args);
    } else {
        emits('onInput', args);
    }
};

const keydownHandler = (event) => {
    const {keyCode} = event;
    // inputRef.value.select();
    switch (keyCode) {
        case 40:
            arrowFn({event});
            break;
        case 38:
            arrowFn({isUp: true, event});
            break;
    }
};

const focusHandler = (event) => {
    console.error('focusHandler');
    inputRef.value.select();
    emits('onFocus', {event});
};

const blurHandler = (event) => {
    emits('onBlur', {event});
};

function arrowFn({isUp, event} = {}) {
    console.error('arrowFn');
    if (props.type === 'number') {
        const val = parseInt(inputModel.value, 10);
        const value = `${isUp ? val + 1 : val - 1}`;
        inputModel.value = value;
    } else if (props.type === 'percent') {
        const modelValue = inputModel.value + '';
        let val = parseInt(modelValue.replace(/%$/, ''), 10);
        const isPercent = modelValue.match(PERCENT_PATT);
        if (isPercent) {
            inputModel.value = `${isUp ? val + 1 : val - 1}%`;
        } else {
            inputModel.value = '0%';
        }
    }
    const args = {
        event,
        model: props.model,
    };
    args[props.model] = inputModel.value;
    setTimeout(() => {
        inputRef.value.select();
    });
    emits('onInput', args);
    emits('onKeydown', args);
}
</script>

<template>
    <div :class="[$style['input-text'], isDark ? $style['input-dark'] : '']">
        <label :for="uniqueId">
            <slot />
        </label>
        <input
            :id="uniqueId"
            ref="inputRef"
            v-model="inputModel"
            :class="[className, $style['input-padding'], $style['input']]"
            :placeholder="placeholder"
            type="string"
            @change="changeHandler"
            @input="inputHandler"
            @keydown.stop="keydownHandler"
            @focus="focusHandler"
            @blur="blurHandler"
        >
        <i-cosmic-arrow-down
            v-show="showArraw"
            :class="[$style.up]"
            @click.stop="arrowFn({isUp: true})"
        />
        <i-cosmic-arrow-down
            v-show="showArraw"
            :class="[$style.down]"
            @click.stop="arrowFn({isUp: false})"
        />
    </div>
</template>

<style module>
.input-text {
    width: 102px;
    height: 26px;
    position: relative;
}
.input-dark {
    color: var(--color-white);
    background-color: rgba(255, 255, 255, .4);
}
.input-dark .input {
    color: var(--color-white);
    background-color: rgba(255, 255, 255, .4);
}
.input {
    width: 100%;
    height: 26px;
    padding-left: 20px;
    box-sizing: border-box;
    border: none;
    border-radius: var(--rounded-md);
    text-align: center;
    background-color: #f5f5f5;
}
.input-padding {
    padding-right: 24px;
    box-sizing: border-box;
}

.up,
.down {
    position: absolute;
    right: 6px;
    width: var(--width-xs);
    height: var(--height-xs);
    opacity: .6;
}

.up:hover,
.up:focus,
.down:hover,
.down:focus {
    opacity: 1;
}

.up {
    top: 50%;
    transform: translateY(calc(-50% - 5px)) rotate(180deg);
}

.down {
    top: 50%;
    transform: translateY(calc(-50% + 5px));
}
</style>
