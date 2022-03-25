<script lang="ts" setup>
import { ref } from 'vue';
import MTitle from '../title/title.vue';
import MColor from './color.vue';
import MStandard from '../standard/standard.vue';
import MStandardModal from '../modal/standard-modal.vue';
import MDetailModal from '../modal/detail-modal.vue';
import { useAtom } from '../../use/use-atom';

const props = withDefaults(defineProps<{
    standardList: any[],
}>(), {
    standardList: () => ([]),
});

const content = ref(null);

const { 
        isShowStandardModal,
        isShowDetailModal,
        selected,
        detailTarget,
        standardTarget,

        cancelStandardModal,
        cancelDetailModal,
        selectStandard,
        openDetaileModal,
        openStandardModal,
        unSelectStandard,
    } = useAtom({property: {}});

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
            <MColor v-if="!selected" />
            <m-standard
                v-else
                :standard="selected"
                @click="(event) => openStandardModal(event.event.currentTarget)"
            >
                <template #subfix>
                    <div
                        class="flex items-center w-40 justify-between"
                    >
                        <i-cosmic-more @click.stop="openDetaileModal(content)" />
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
    />
    <m-detail-modal
        v-if="isShowDetailModal"
        title="文字规范"
        :target="detailTarget"
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
</style>