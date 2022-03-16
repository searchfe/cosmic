<script lang="ts" setup>
const props = withDefaults(defineProps<{
    title: string,
    isOpen?: boolean,
}>(), {
    title: '',
});

const emits = defineEmits(['onBoardSwitch']);


const handleClick = () => {
    console.log('onBoardSwitch');
    emits('onBoardSwitch');
};

</script>

<template>
    <div
        :class="$style['header-container']"
        @click="handleClick"
    >
        <span> {{ props.title }} </span>
        <span
            class="icon"
            :class="[$style.icon, props.isOpen ? $style.open : '']"
        >
            <slot>
                <i-cosmic-arrow-down /> 
            </slot>          
        </span>
    </div>
</template>

<style module>
.header-container {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    line-height: 30px;
    font-weight: bold;
    font-size: 14px;
    
}

.header-container .icon {
    display: inline-flex;
}

.header-container > span {
    display: inline-flex;
    align-items: center;
}

.header-container .icon.open {
    transform: rotate(180deg);
}

</style>