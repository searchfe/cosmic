<script lang="ts" setup>
import { ref, toRaw } from 'vue';
import { RadioGroup, RadioButton, InputNumber} from 'cosmic-vue';

withDefaults(defineProps<{
    radiusStyle: Internal.RectangleCornerMixin,
}>(), {});

const emits = defineEmits(['change']);

const multiple = ref(false);

const changeHandler = () => {
    multiple.value = !multiple.value;
};

function changeStyle(event: {value: any},  style: any, key: keyof Internal.RectangleCornerMixin) {
    const value = parseInt(event.value || '0');
    const originStyle = toRaw(style);
    originStyle[key] = value;
    if (!multiple.value) {
        originStyle.topLeftRadius = value;
        originStyle.topRightRadius = value;
        originStyle.bottomLeftRadius = value;
        originStyle.bottomRightRadius= value;
    }
    emits('change', originStyle);
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
                        :value="radiusStyle.topLeftRadius"
                        @on-input="event => changeStyle(event, radiusStyle, 'topLeftRadius')"
                    />
                </div>
                <div>
                    <input-number
                        v-if="multiple"
                        size="sm"
                        :value="radiusStyle.topRightRadius"
                        @on-input="event => changeStyle(event, radiusStyle, 'topRightRadius')"
                    />
                </div>
                <div v-if="multiple">
                    <input-number
                        size="sm"
                        :value="radiusStyle.bottomLeftRadius"
                        @on-input="event => changeStyle(event, radiusStyle, 'bottomLeftRadius')"
                    />
                </div>
                <div v-if="multiple">
                    <input-number
                        size="sm"
                        :value="radiusStyle.bottomRightRadius"
                        @on-input="event => changeStyle(event, radiusStyle, 'bottomRightRadius')"
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