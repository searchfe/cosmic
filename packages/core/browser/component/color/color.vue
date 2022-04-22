<script lang="ts" setup>
import { computed } from 'vue';
import { InputNumber } from 'cosmic-vue';
import Color from 'color';

const props = withDefaults(defineProps<{
    fillStyle: Internal.SolidPaint
}>(), {});

const emits = defineEmits(['change']);

const opacity = computed(() => !props.fillStyle || props.fillStyle.opacity == undefined ? 100 : props.fillStyle.opacity * 100);

const color = computed(() => {
    const rgb = props.fillStyle.color;
    const cObj = new Color(rgb).hex();
    return cObj;
});

function colorBurHandler(event: InputEvent, opacity: number) {
    const target = event.target as any;
    let color;
    try {
        let v = target.value as string;
        if (!v.startsWith('#')) v = `#${v}`;
        color = new Color(v).object();
    } catch {
        color = new Color('#000000');
    }
    emits('change', {color, opacity});
}

function opacityBurHandler(data: {value: string}, originOpacity: number, color: string) {
    const opacity = parseInt(data.value || '100', 10);
    emits('change', {color: new Color(color).object(), opacity: Math.round(opacity / 100)});
}
 
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
        <div
            :class="$style['color-value']"
            class="items-center"
        >
            <div 
                :class="$style['show-color']"
                class="w-14 h-14"
            >
                <input
                    :value="color"
                    :class="$style['input-color']"
                    class="w-12 h-12"
                    type="color"
                    @input="(event) => colorBurHandler(event, opacity)"
                >
            </div>
            <input
                :value="color"
                :class="[$style.input]"
                :size="10"
                @focus="focusHandler"
                @blur="(event) => colorBurHandler(event, opacity)"
            >
        </div>
        <!-- <div :class="$style.divider" /> -->
        <div :class="$style.opacity">
            <input-number
                :size="5"
                :value="opacity"
                :controls="false"
                type="percent"
                @focus="focusHandler"
                @on-input="(event) => opacityBurHandler(event, opacity, color)"
            />
        </div>
    </div>
</template>

<style module>

.color {
    composes: -v-px -v-h w-180 -v-bg-inapparent sm from global;
    display: flex;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0);
    box-sizing: border-box;
    border-radius: 4px;
}

.color > div {
    flex: 1;
}


.color > .theme {
    flex: 0 1 auto;
    font-size: 1.2rem;
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
    flex:  0 1 auto;
    margin-right: 4px;
    border: 1px solid var(--color-gray-200);
}

::-webkit-color-swatch-wrapper {
    margin: 0;
    padding: 0;
}

::-webkit-color-swatch {
    margin: 0;
    border: none
}

.input-color {
    padding: 0;
    border: 0;
    outline: 0;
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