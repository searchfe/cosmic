<script lang="ts" setup>
import { ref, computed, toRaw } from 'vue';
import MTitle from '../title/title.vue';
import MColor from './color.vue';
import MStandard from '../standard/standard.vue';
import MStandardModal from '../modal/standard-modal.vue';
import MDetailModal from '../modal/detail-modal.vue';
import { usePropterty } from '../../use/use-property';
import { service } from '@cosmic/core/browser';
import { inject, TextNode } from '@cosmic/core/parts';
import func from 'vue-temp/vue-editor-bridge';
import { includes } from 'lodash';

const props = withDefaults(defineProps<{
    type?: string | string[],
    showTitle?: boolean
}>(), {
    type: 'TEXT',
    showTitle: true
})



const content = ref(null);


const {
    standardList,
    isShowStandardModal,
    isShowDetailModal,
    detailTarget,
    standardTarget,

    cancelStandardModal,
    cancelDetailModal,
    selectStandard,
    openDetaileModal,
    openStandardModal,
    getDetailEdit,
    unRef,
} = usePropterty(service.TOKENS.FillStyle);

const fillStyleService = inject<service.FillStyleService>(service.TOKENS.FillStyle);
const nodeService = inject<service.NodeService>(service.TOKENS.Node);

let node = nodeService.getSelection().find(find) as any;

const styleId = node ? ref(getTextStyle(node).id) : ref('');

function find({type}) {
    if (props.type instanceof String) {
        return type === props.type
    }
    if (Array.isArray(props.type)) {
        return props.type.includes(type);
    }
} 

function getTextStyle(node: TextNode) {
    if (!node) return;
    const fillStyle = fillStyleService.get(node.getRangeFillStyleId() ?? Date.now() + '');
    if (node.getRangeFillStyleId() !== fillStyle.id) {
        node.setRangeFillStyleId(0, 0, fillStyle.id);
    }
    return fillStyle;
}


nodeService.selection.subscribe((nodes) => {    
    const selectNode = nodes.find(item => item.type === props.type);
    if (!node) return;
    getTextStyle(selectNode);
    styleId.value = selectNode.getRangeFillStyleId();
});

const fillStyle = computed(() => fillStyleService.get(styleId.value)) 

const isLocalStyle = computed(() =>  styleId.value === '' || fillStyleService.isLocalStyle(styleId.value));

function onchange() {
    const node = nodeService.getSelection().find(item => item.type === props.type) as TextNode;
    const style = fillStyleService.get(node.getRangeFillStyleId());
    node.setRangeFills(0, 0, [toRaw(style)]);
    nodeService.update([node]);
}


</script>

<template>
    <div class="w-full">
        <div ref="content">
            <div
                v-if="isLocalStyle" 
            >
                <m-title v-if="showTitle" title="颜色">
                    <div
                        class="flex justify-between items-center w-30"
                    >
                        <i-cosmic-sun />
                        <i-cosmic-grid-outline @click.stop="(event) => openStandardModal(event.currentTarget)" />
                    </div>
                </m-title>
                <m-color
                    @on-change="onchange"
                    :color-style="fillStyle"
                />
            </div>
            <m-standard
                v-else
                classes="-v-bg-inapparent"
                :standard="fillStyle"
                :can-edit="false"
                @click="(event) => openStandardModal(event.event.currentTarget)"
            >
                <!-- demo 样式 -->
                <template #prefix="data">
                    <div :class="[$style['demo'], 'flex']">
                        <div
                            :class="[$style['demo-item'], 'flex items-center align-center']"
                            :style="{backgroundColor: `rgba(${data.standard?.color?.r}, ${data.standard?.color?.g}, ${data.standard?.color?.b}, 1)`}"
                        >
                            <i-cosmic-question v-if="!standard?.color" />
                        </div>
                    </div>
                </template>
                <template #subfix>
                    <div
                        class="flex items-center w-40 justify-between"
                    >
                        <i-cosmic-more @click.stop="openDetaileModal(content, standard)" />
                        <i-cosmic-lock @click.stop="unRef" />
                    </div>
                </template>
            </m-standard>
        </div>
    </div>

    <m-standard-modal
        v-if="isShowStandardModal"
        title="颜色"
        :standard-list="standardList"
        :target="standardTarget"
        @cancel="cancelStandardModal"
        @select="(event) => selectStandard(event.data)"
        @show-detail="(event) => openDetaileModal(event.target, event.data)"
    >
        <!-- demo 样式 -->
        <template #prefix="data">
            <div :class="[$style['demo'], 'flex']">
                <div
                    :class="[$style['demo-item'], 'flex items-center align-center']"
                    :style="{backgroundColor: `rgba(${data.standard.color.r}, ${data.standard?.color?.g}, ${data.standard?.color?.b}, 1)`}"
                    @mouseover="text(data)"
                >
                    <i-cosmic-question v-if="!data.standard?.color" />
                </div>
            </div>
        </template>
    </m-standard-modal>
    <m-detail-modal
        v-if="isShowDetailModal"
        title="颜色"
        :target="detailTarget"
        :standard="getDetailEdit()"
        @cancel="cancelDetailModal"
        @ok="cancelDetailModal"
    >
        <div :class="$style['color-content']">
            <m-color :color-style="getDetailEdit()" />
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
