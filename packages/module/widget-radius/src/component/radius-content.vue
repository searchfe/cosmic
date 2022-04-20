<script lang="ts" setup>
import { ref } from 'vue';
import { RadioGroup, RadioButton, InputNumber} from 'cosmic-vue';

withDefaults(defineProps<{
    radiusStyle: any,
}>(), {
    radiusStyle: () => ({}),
});

const emits = defineEmits(['change']);

const multiple = ref(false);

const changeHandler = () => {
    multiple.value = !multiple.value;
};

function changeStyle(event: {value: any},  style: any, field: string) {
    const value = event.value || '0';
    style[field] = value;
    if (!multiple.value) {
        style.tl = value;
        style.tr = value;
        style.bl = value;
        style.br = value;
    }
    emits('change');
}

</script>

<template>
    <div class="flex">
        <div class="flex flex-auto">
            <div class="flex flex-auto mr-8">
                <RadioGroup
                    value="1"
                    @on-change="changeHandler"
                >
                    <RadioButton value="1">
                        <i-cosmic-square />
                    </RadioButton>
                    <RadioButton value="2">
                        <i-cosmic-linked-square />
                    </RadioButton>
                </RadioGroup>
            </div>
            <div class="grid" :class="$style.grid">
                <div>
                    <input-number
                        size="sm"
                        :value="radiusStyle.tl"
                        @on-input="event => changeStyle(event, radiusStyle, 'tl')"
                    />
                </div>
                <div>
                    <input-number
                        v-if="multiple"
                        size="sm"
                        :value="radiusStyle.tr"
                        @on-input="event => changeStyle(event, radiusStyle, 'tr')"
                    />
                </div>
                <div v-if="multiple">
                    <input-number
                        size="sm"
                        :value="radiusStyle.bl"
                        @on-input="event => changeStyle(event, radiusStyle, 'bl')"
                    />
                </div>
                <div v-if="multiple">
                    <input-number
                        size="sm"
                        :value="radiusStyle.br"
                        @on-input="event => changeStyle(event, radiusStyle, 'br')"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style module>
.icon {
    font-size: var(--font-s)
}
.row {
    composes: mb-8 from global;
}

.grid {
    grid-template-columns: repeat(2, auto);
    grid-gap: .8rem;
}
</style>