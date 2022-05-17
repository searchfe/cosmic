import { reactive, ref, watch, computed, nextTick, toRaw, watchEffect, toRefs, type WatchStopHandle } from 'vue';
import type { interfaces } from '@cosmic/core/inversify';
import type { BaseService, NodeService } from '../service';
import { TOKENS } from '../service';

export function usePropterty<T>(token: interfaces.ServiceIdentifier<T> = TOKENS.TextStyle) {

    const isShowDetailModal = ref(false);

    const isShowStandardModal = ref(false);

    const detailTarget = ref<HTMLElement>();

    const standardTarget = ref<HTMLElement>();

    function cancelStandardModal() {
        isShowStandardModal.value = false;
    }

    function cancelDetailModal() {
        isShowDetailModal.value = false;
    }



    async function openDetaileModal(target: HTMLElement) {
        isShowDetailModal.value = false;
        detailTarget.value = target;
        await nextTick();
        isShowDetailModal.value = true;
    }

    function openStandardModal(target: HTMLElement) {
        standardTarget.value = target;
        isShowStandardModal.value = true;
    }


    return {
        isShowStandardModal,
        isShowDetailModal,
        detailTarget,
        standardTarget,

        cancelStandardModal,
        cancelDetailModal,
        openDetaileModal,
        openStandardModal,
    };
}
