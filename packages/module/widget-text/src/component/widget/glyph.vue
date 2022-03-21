 <script lang="ts" setup>
import { ref } from 'vue';
import { MTitle, MStandard } from '@cosmic/core/browser';
import { Popover } from 'cosmic-vue';
import { Standard } from '../../data';
import Modal from './modal.vue';
import GlyphContent from './glyph-content.vue'; 

const selected = ref(void 0);

const visible = ref(false);

const selectAction = (event) => {
    visible.value = false;
    selected.value = event;
};

const visibleAction = (event) => {
     visible.value = event;
};

const unSelectAction = () => {
    selected.value = void 0;
};

 </script>

<template>
    <div>
        <div v-if="!selected">
            <MTitle title="字形">
                <Popover :visible="visible" @boardSwitch="visibleAction">
                    <i-cosmic-grid-outline :class="$style.icon" />
                    <template #content>
                        <Modal :standard="Standard" :select="selected" @select="selectAction" />
                    </template>
                </Popover>
            </MTitle>
            <GlyphContent />
        </div>
        <div v-else>
            <MStandard :standard="selected">
                <template #subfix>
                    <div
                        class="flex items-center"
                        @click.stop="unSelectAction"
                    >
                        <i-cosmic-link />
                    </div>
                </template>
            </MStandard>
        </div>
    </div>
</template>

<style module>
.icon {
    font-size: 1.3rem;
}
</style>
