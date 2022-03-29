<script lang="ts" setup>
import { ref } from 'vue';
import MTitle from '../title/title.vue';
import MColor from './color.vue';
import MStandard from '../standard/standard.vue';
import MStandardModal from '../modal/standard-modal.vue';
import MDetailModal from '../modal/detail-modal.vue';
import { usePropterty } from '../../use/use-property';

const props = withDefaults(defineProps<{
    standardList: any[],
}>(), {
    standardList: () => ([]),
});

const content = ref(null);

const {
        isShowStandardModal,
        isShowDetailModal,
        isSelected,
        selected,
        detailTarget,
        standardTarget,

        cancelStandardModal,
        cancelDetailModal,
        selectStandard,
        openDetaileModal,
        openStandardModal,
    } = usePropterty();

</script>

<template>
    <div class="w-full">
        <MTitle title="颜色">
            <div
                class="flex justify-between items-center w-30"
            >
                <i-cosmic-sun />
                <i-cosmic-grid-outline @click.stop="(event) => openStandardModal(event.currentTarget)" />
            </div>
        </MTitle>
        <div ref="content">
            <MColor v-if="!isSelected" />
            <m-standard
                v-else
                classes="-v-bg-inapparent"
                :standard="selected"
                :can-edit="false"
                @click="(event) => openStandardModal(event.event.currentTarget)"
            >
                <!-- demo 样式 -->
                <template #prefix>
                    <slot
                        name="prefix"
                        :standard="selected"
                    >
                        <div :class="[$style['demo'], 'flex']">
                            <div
                                :class="[$style['demo-item'], 'flex items-center align-center']"
                                :style="{backgroundColor: selected?.dayColor}"
                            >
                                <i-cosmic-question v-if="!selected?.dayColor" />
                            </div>
                            <div
                                :class="[$style['demo-item'], 'flex items-center align-center']"
                                :style="{backgroundColor: selected?.darkColor}"
                            >
                                <i-cosmic-question v-if="!selected?.darkColor" />
                            </div>
                            <div
                                :class="[$style['demo-item'], 'flex items-center align-center']"
                                :style="{backgroundColor: selected?.blackColor}"
                            >
                                <i-cosmic-question v-if="!selected?.blackColor" />
                            </div>
                        </div>
                    </slot>
                </template>
                <template #subfix>
                    <div
                        class="flex items-center w-40 justify-between"
                    >
                        <i-cosmic-more @click.stop="openDetaileModal(content, selected)" />
                        <i-cosmic-link @click.stop="unSelectStandard" />
                    </div>
                </template>
            </m-standard>
        </div>
    </div>

    <m-standard-modal
        v-if="isShowStandardModal"
        title="文字规范"
        :standard-list="props.standardList"
        :target="standardTarget"
        @cancel="cancelStandardModal"
        @select="(event) => selectStandard(event.data)"
        @show-detail="openDetaileModal"
    >
        <!-- demo 样式 -->
        <template #prefix="standard">
            <slot
                name="prefix"
                :standard="standard.standard"
            >
                <div :class="[$style['demo'], 'flex']">
                    <div
                        :class="[$style['demo-item'], 'flex items-center align-center']"
                        :style="{backgroundColor: standard?.standard?.dayColor}"
                    >
                        <i-cosmic-question v-if="!standard?.standard?.dayColor" />
                    </div>
                    <div
                        :class="[$style['demo-item'], 'flex items-center align-center']"
                        :style="{backgroundColor: standard?.standard?.darkColor}"
                    >
                        <i-cosmic-question v-if="!standard?.standard?.darkColor" />
                    </div>
                    <div
                        :class="[$style['demo-item'], 'flex items-center align-center']"
                        :style="{backgroundColor: standard?.standard?.blackColor}"
                    >
                        <i-cosmic-question v-if="!standard?.standard?.blackColor" />
                    </div>
                </div>
            </slot>
        </template>
    </m-standard-modal>
    <m-detail-modal
        v-if="isShowDetailModal"
        title="文字规范"
        :target="detailTarget"
        :standard="selected"
        @cancel="cancelDetailModal"
        @ok="cancelDetailModal"
    >
        <div :class="$style['color-content']">
            <MColor />
        </div>
    </m-detail-modal>
</template>

<style module>
.color-content {
    composes: -v-py w-full md from global;
    max-height: 400px
}

.demo {
    width: 100%;
    height: 100%;
}

.demo-item {
    flex: 1;
    flex-shrink: 0;
    font-size: var(--font-sm)
}
</style>
