<script lang="ts" setup>
import Color from 'color';
import { ref, defineEmits, reactive, computed, watch} from 'vue';
const props = withDefaults(defineProps<{
    colorStyle: any,
    theme?: string,
}>(),  {
    theme: 'light',
    colorStyle: () => ({}),
});

const emits = defineEmits(['onChange']);

const c = props.colorStyle.color && Color.rgb(props.colorStyle.color.r, props.colorStyle.color.g, props.colorStyle.color.b).hex();

const rg = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/;


const color = ref(c);

const opacity = ref(1);

const theme = ref(props.theme);

const changeEvent = () => {
    emits('onChange', {color: color.value, opacity: opacity.value, theme: theme.value, colorObj: new Color(color.value)});
};

const colorBurHandler = (colorStyle) => {
    let value = color.value || '';
    if (!value.startsWith('#')) value = `#${value}`;
    rg.test(value) ? color.value = value : color.value = '#000000';
    colorStyle.color = new Color(value).object();
    changeEvent();
};

const opacityBurHandler = (colorStyle) => {
    let number = Number(opacity.value || 100);
    if (Object.is(NaN, number)) number = 100;
    let value = number;
    if (value > 100 || value < 0) value = 100;
    opacity.value = `${value}%`;
    colorStyle.opacity = number / 100;
    changeEvent();
};

const focusHandler = (event:FocusEvent) => {
    const target = event.target as HTMLInputElement;
    target.select();
};

const themeClickHandler = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    changeEvent();
};

watch(() => props.colorStyle, (newValue) => {
    const c = newValue.color && Color.rgb(newValue.color.r, newValue.color.g, newValue.color.b).hex();
    color.value = c;
    opacity.value = newValue.opacity
})

</script>

<template>
    <div
        :class="[$style.color, $style['color-border']]"
    >
        <div 
            :class="$style.theme"
            @click="themeClickHandler"
        >
            <i-cosmic-sun
                v-if="theme === 'light'"
            />
            <i-cosmic-dark 
                v-else
            />
        </div>
        <div :class="$style['color-value']">
            <div 
                :class="$style['show-color']"
                :style="{backgroundColor: color, opacity: opacity}"
            />
            <input
                v-model="color"
                :class="[$style.input]"
                :size="10"
                @focus="focusHandler"
                @blur="() => colorBurHandler(colorStyle)"
            >
        </div>
        <div :class="$style.divider" />
        <div :class="$style.opacity">
            <input
                v-model="opacity"
                :class="[$style.input]"
                :size="5"
                @focus="focusHandler"
                @blur="() => opacityBurHandler(colorStyle)"
            >
        </div>
    </div>
</template>

<style module>
.color {
    composes: -v-px -v-h  sm from global;
    display: flex;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0);
    box-sizing: border-box;
    border-radius: 4px;
}

.color > div {
    flex: 1;
}

.color:hover.color-border, .color:active.color-border {
    border: 1px solid var(--color-gray-200);
}

.color > .theme {
    flex: 0 1 auto;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    margin-right: 5px;
}



.divider {
    height: 100%;
    max-width: 1px;
}

.color:hover > .divider {
    background-color: var(--color-gray-200);
}

.color > .color-value {
    flex: 2;
    display: flex;
    margin-right: 5px
}

.show-color {
    width: 17px;
    flex:  0 1 auto;
    margin-right: 4px;
    border-radius: 4px;
}

.opacity {
    flex: 1;
    margin-left: .4rem;
}
.input {
    background-color: transparent;
    color: var(--color-dark);
    border: none;
    outline: none;
    font-size: 1.2rem;
}

</style>