<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { Input } from 'cosmic-vue';
import { color as colorUtil } from '@cosmic/core/browser';



const props = withDefaults(defineProps<{ value: string }>(), {
    value: '',
});

const emits = defineEmits(['update:value']);

let alpha = 1;
let color = '';

const editMode = ref(false);

const initialColor = ref('');
const initialAlpha = ref(1);

const displayColor = ref('none');
const displayAlpha = ref('100');


try {
    initialColor.value = colorUtil(props.value).rgb().toString();
    color = initialColor.value;
    initialAlpha.value = +colorUtil(props.value).alpha().toFixed(2);
    alpha = initialAlpha.value;
} catch(e) {
    console.log('color: ', e);
}


watchEffect(() => {
    if (props.value) {
        try {
            displayColor.value = colorUtil(props.value).hex();
            displayAlpha.value = (+colorUtil(props.value).alpha().toFixed(2) * 100).toString();
        } catch(e) {
            console.log('color: ', e);
        }
    }
});

function updateColor(data: string) {
    if (data) {
        try {
            const colorObj = colorUtil(data);
            color = colorObj.hex().toString();
            const final = colorObj.alpha(+alpha).hexa().toString();
            emits('update:value', final);
        } catch(e) {
            console.log('color: ', e);
        }
    }
}

function updateAlpha(data: string) {
    let newalpha = +(+data).toFixed(2);
    if (data && !isNaN(newalpha)) {
        try {
            const colorObj = colorUtil(color).alpha(+data);
            alpha = colorObj.alpha();
            const final = colorObj.hexa().toString();
            emits('update:value', final);

        } catch(e) {
            console.log('color: ', e);
        }
    }
}

function toggleEdit() {
    editMode.value = !editMode.value;
}
</script>

<template>
    <div v-if="!editMode" class="flex items-center justify-between" :class="$style.view" @click.stop="toggleEdit">
        <div>
            {{ displayColor }}
        </div>
        <div>{{ displayAlpha }}%</div>
    </div>
    <div
        v-else
        class="flex items-center justify-between overflow-hidden"
        :class="$style.view"
    >
        <Input :value="initialValue" :class="$style['color-input']" type="color" @update:value="updateColor" @on-blur="toggleEdit" />
        <Input :value="initialAlpha" :class="$style['alpha-input']" @update:value="updateAlpha" @on-blur="toggleEdit" />
    </div>
</template>

<style module>
.view {
    padding-right: 56px;
    height: 36px;
}
.alpha-input {
    width: 50px;
    flex: none;
}
.color-input {
    flex: 1;
    height: 36px;
}
</style>
