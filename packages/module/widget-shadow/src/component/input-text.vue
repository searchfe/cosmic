<script lang="ts" setup>
import {ref, computed} from 'vue';

const PERCENT_PATT = /(^(-|[1-9])([0-9])*%$)|(^0%$)/;

const props = defineProps({
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
        default: 'number',
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
    defaultMinValue: {
        type: [String, Number],
        default: -99999,
    },
    defaultMaxValue: {
        type: [String, Number],
        default: 99999,
    },
    defaultPercentMinValue: {
        type: String,
        default: '0%',
    },
    defaultPercentMaxValue: {
        type: String,
        default: '100%',
    },
});

const ISPERCENT = props.type === 'percent';
const ISMATH = props.type === 'percent' || props.type === 'number';

const defaultPercentMinValue = props.defaultPercentMinValue.toString();
const defaultMinValue = props.defaultMinValue.toString();
const defaultPercentMaxValue = props.defaultPercentMaxValue.toString();
const defaultMaxValue = props.defaultMaxValue.toString();
// 保留一位小数
const MIN = parseFloat(ISPERCENT ? defaultPercentMinValue : defaultMinValue);
const MAX = parseFloat(ISPERCENT ? defaultPercentMaxValue : defaultMaxValue);

function getValidVal(val, MIN, MAX): number {
    return val >= MAX ? MAX : (val <= MIN ? MIN : val);
}

const className = ref(props.class || '');
const inputModel = ref(props.value.toString() || '0');
const showArraw = ref(ISMATH);
const inputRef = ref();

const uniqueId = computed(
    () => {
        return `${props.id ? props.id + '-' : ''}input-${(Math.random() * 10000000).toString(16).replace('.', '-')}`;
    },
);

const emits = defineEmits(['onChange', 'onInput', 'onKeydown', 'onFocus', 'onBlur']);

const changeHandler = (event: Event) => {
    emits('onChange', {event});
};

const inputHandler = (event: InputEvent) => {
    let val = event.target.value.toString();
    if (ISMATH) {
        let oriVal = event.target.value.toString();
        const valIsPercent = val.match(PERCENT_PATT);
        val = parseFloat(val);
        if (!val) {
            val = '';
        } else if (oriVal === '-') {
            val = '-';
        } else {
            val = getValidVal(val, MIN, MAX);
            val = `${val}${valIsPercent && ISPERCENT ? '%' : ''}`;
        }
    }
    inputModel.value = val;
    const args = {
        value: val,
        event,
        model: props.model,
    };
    args[props.model] = val;
    emits('onInput', args);
};

const keydownHandler = (event: KeyboardEvent) => {
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

const focusHandler = (event: FocusEvent) => {
    inputRef.value.select();
    emits('onFocus', {event});
};

const blurHandler = (event: FocusEvent) => {
    let val: string | number = inputModel.value;
    if (ISMATH) {
        val = parseFloat(inputModel.value) || 0;
        if (ISPERCENT) {
            val = `${getValidVal(val, MIN, MAX)}%`;
        } else {
            val = getValidVal(val, MIN, MAX).toString();
        }
    }
    inputModel.value = val;
    const args = {
        value: val,
        event,
        model: props.model,
    };
    args[props.model] = val;
    emits('onBlur', args);
};

function arrowFn({isUp, event}: { isUp: boolean, event: KeyboardEvent | PointerEvent }) {
    let val: string | number = parseFloat(inputModel.value) || 0;
    val = isUp ? val + 1 : val - 1;
    if (ISPERCENT) {
        val = `${getValidVal(val, MIN, MAX)}%`;
    } else {
        val = getValidVal(val, MIN, MAX).toString();
    }
    inputModel.value = val;
    const args = {
        value: val,
        event,
        model: props.model,
    };
    args[props.model] = val;
    setTimeout(() => {
        inputRef.value.select();
    });
    emits('onInput', args);
    emits('onKeydown', args);
}
</script>

<template>
    <div :class="[$style['input-text'], 'w-100 h-26 -v-border-inapparent -v-bg-inapparent']">
        <label :for="uniqueId">
            <div :class="[$style['icon'], 'flex items-center justify-center']">
                <slot name="prefix" />
            </div>
        </label>
        <input
            :id="uniqueId"
            ref="inputRef"
            v-model="inputModel"
            :class="[className, $style['input']]"
            :placeholder="placeholder"
            type="string"
            @change="changeHandler"
            @input="inputHandler"
            @keydown.stop="keydownHandler"
            @focus="focusHandler"
            @blur="blurHandler"
        >
        <i-cosmic-arrow-up
            v-show="showArraw"
            :class="[$style.up, '-v-color-dark-primary']"
            @click.stop="arrowFn({isUp: true, ...arguments})"
        />
        <i-cosmic-arrow-down
            v-show="showArraw"
            :class="[$style.down, '-v-color-dark-primary']"
            @click.stop="e => arrowFn({isUp: false, event: e})"
        />
    </div>
</template>

<style module>
.input-text {
    composes: -v-bg-inapparent -v-h -v-px -v-text from global;
    position: relative;
    color: var(--color-dark);
    border-radius: 0.4rem;
}
.input-text:active, .input-text.active {
    background-color: var(--color-gray-100);
}

.icon {
    height: 100%;
    position: absolute;
    top: 0;
    left: .6rem;
    font-size: var(--font-sm);
    color: var(--color-gray-400);
}

.input {
    width: 100%;
    height: 2.6rem;
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    box-sizing: border-box;
    border: none;
    outline: none;
    border-radius: var(--rounded-md);
    text-align: center;
    font-size: var(--font-sm);
    color: var(--color-dark);
    background-color: transparent;
}

.up,
.down {
    position: absolute;
    right: .6rem;
    font-size: 1rem;
    color: var(--hsl-gray-200);
}

.up:hover,
.up:focus,
.down:hover,
.down:focus {
    color: var(--hsl-gray-200) var(--opacity-70);
}

.up {
    top: 50%;
    transform: translateY(calc(-50% - .5rem));
}

.down {
    top: 50%;
    transform: translateY(calc(-50% + .5rem));
}
</style>
