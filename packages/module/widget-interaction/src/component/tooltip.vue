<script lang="ts" setup>
import {ref, useSlots, reactive, watchEffect, onMounted, nextTick} from 'vue';

const isHavePrefix = !!useSlots().prefix?.();
const isHaveSuffix = !!useSlots().suffix?.();

const props = defineProps({
    text: {
        type: String,
        default: '',
    },
    // 控制是否显示
    show: {
        type: Boolean,
        default: false,
    },
    // 竖直方向：箭头朝向'up' 在上方；'down' 在下方；默认为在下方
    verticalDirection: {
        type: String,
        default: 'down',
    },
    // 水平方向：箭头位置 'left' 在左边； 'center' 在中间；'right' 在右边；默认为在右边， 会计算中间和右边
    horizontalDirection: {
        type: String,
        default: 'left',
    },
    // 气泡提示层的距离两边的栅格边距
    rowTileGap: {
        type: Number,
        default: -17,
    },
    // 气泡提示层的圆角
    borderRadius: {
        type: String,
        default: '.4rem',
    },
    // 气泡提示层的内边距
    padding: {
        type: String,
        default: '.8rem 1rem',
    },
    // 是否有蒙层，默认为有
    mask: {
        type: Boolean,
        default: false,
    },
    // Tooltip 的 z 轴层级，默认为 501
    zIndex: {
        type: Number,
        default: 501,
    },
});

const mShow = ref(props.show);
const screenWidth = ref(0);

const tooltipRef = ref();
const iconRef = ref();
const arrowRef = ref();
const tooltipRect = reactive({
    width: 0,
    height: 0,
    top: 0,
});
const iconRect = reactive({
    width: 0,
    height: 0,
    left: 0,
});
const arrowRect = reactive({
    height: 2.5,
    width: 3,
    left: 0,
});

const mHDirection = ref(props.horizontalDirection);
watchEffect(() => {
    mShow.value = props.show;
    if (props.text) {
        nextTick(() => {
            getStyle();
        });
    } else {
        mouseout();
    }

    if (props.horizontalDirection === 'center' || props.horizontalDirection === 'right') {
        nextTick(() => {
            getStyle();
        });
    }
});

const emits = defineEmits(['close']);
const onMaskClick = () => {
    mShow.value = false;
    emits('close');
};

const mouseover = () => {
    getStyle();
    mShow.value = !!props.text;
};
const mouseout = () => {
    mShow.value = false;
};

function computedStyle() {
    if (!screenWidth.value || !tooltipRect.width) {
        return;
    }
    // 中间临界、右侧临界
    if ((screenWidth.value - iconRect.left - iconRect.width / 2)
        < (tooltipRect.width / 2 + 2 * props.rowTileGap)
    ) {
        mHDirection.value = 'right';
    }
}

function getStyle() {
    if (!screenWidth.value) {
        return;
    }
    const {width: tooltipWidth, height: tooltipHeight} = tooltipRef.value.getBoundingClientRect().toJSON();
    const {width: iconWidth, height: iconHeight, left: iconLeft} = iconRef.value.getBoundingClientRect().toJSON();
    const {width: arrowWidth, height: arrowHeight} = arrowRef.value.getBoundingClientRect().toJSON();
    tooltipRect.width = tooltipWidth;
    tooltipRect.height = tooltipHeight;
    tooltipRect.top =
        props.verticalDirection === 'up'
            ? Number(`-${tooltipHeight + arrowHeight}`)
            : Number(`${iconHeight + arrowHeight}`);
    iconRect.width = iconWidth;
    iconRect.height = iconHeight;
    iconRect.left = iconLeft;
    arrowRect.width = arrowWidth;
    arrowRect.height = arrowHeight;
    arrowRect.left = Math.abs(props.rowTileGap) + arrowWidth / 2;
    computedStyle();
}

onMounted(() => {
    screenWidth.value = window.innerWidth;
    getStyle();
});
</script>

<template>
    <div class="flex items-center relative" @mouseover="mouseover" @mouseout="mouseout">
        <div ref="iconRef" class="flex items-center">
            <slot />
        </div>
        <div id="tooltip" :class="[$style['tooltip']]">
            <div :style="{visibility: mShow ? 'visible' : 'hidden'}">
                <!-- 蒙层 -->
                <div
                    v-if="mask"
                    :style="{zIndex: zIndex}"
                    :class="[$style['mask']]"
                    @click.stop="onMaskClick"
                />
                <!-- 提示气泡框 -->
                <div
                    ref="tooltipRef"
                    :style="[
                        {
                            zIndex: zIndex + 1,
                            top: tooltipRect.top + 'px',
                            left: mHDirection === 'left'
                                ? rowTileGap + 'px'
                                : (
                                    mHDirection === 'center'
                                        ? '-' + ((tooltipRect.width / 2) - (iconRect.width / 2)) + 'px'
                                        : ''
                                ),
                            right: mHDirection === 'right'
                                ? rowTileGap + 'px'
                                : '',
                            borderRadius,
                            padding
                        }
                    ]"
                    :class="[$style['inner'], 'absolute flex flex-nowrap items-center justify-center']"
                    @click.stop="onMaskClick"
                >
                    <span
                        v-if="isHavePrefix"
                        :class="[$styles['prefix'], 'flex items-center justify-center']"
                    >
                        <slot name="prefix" />
                    </span>
                    {{ text }}
                    <span
                        v-if="isHaveSuffix"
                        :class="[$styles['suffix'], 'flex items-center justify-center']"
                    >
                        <slot name="suffix" />
                    </span>
                    <!-- 三角箭头 朝上 -->
                    <div
                        v-if="verticalDirection === 'down'"
                        ref="arrowRef"
                        :style="[
                            {
                                top: '-' + arrowRect.height + 'px',
                                left: mHDirection === 'left'
                                    ? arrowRect.left + 'px'
                                    : '',
                                right: mHDirection === 'right'
                                    ? arrowRect.left + 'px'
                                    : '',
                            }
                        ]"
                        :class="[$style['triangle-up'], 'absolute']"
                    />
                    <!-- 三角箭头 朝下 -->
                    <div
                        v-if="verticalDirection === 'up'"
                        ref="arrowRef"
                        :style="[
                            {
                                bottom: '-' + arrowRect.height + 'px',
                                left: mHDirection === 'left'
                                    ? arrowRect.left + 'px'
                                    : '',
                                right: mHDirection === 'right'
                                    ? arrowRect.left + 'px'
                                    : '',
                            }
                        ]"
                        :class="[$style['triangle-down'], 'absolute']"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style module>
.tooltip {
    width: 0;
    height: 0;
}

.inner {
    padding: .8rem 1rem;
    border-radius: var(--rounded);
    transform-origin: center bottom;
    background-color: var(--color-primary-500);
    color: var(--color-white);
    white-space: nowrap;
}

.prefix {
    margin-right: var(--margin-md);
}

.suffix {
    margin-left: var(--margin-md);
}

.triangle-up {
    top: -.35rem;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 .25rem .3rem .25rem;
    border-color: transparent transparent var(--color-primary-500) transparent;
}

.triangle-down {
    bottom: -.35rem;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: .3rem .25rem 0 .25rem;
    border-color: var(--color-primary-500) transparent transparent transparent;
}

.mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .3);
}
</style>
