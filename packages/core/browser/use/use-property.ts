import { reactive, ref, watch, computed, nextTick, toRaw } from 'vue';
import { inject } from '@cosmic/core/parts';
import type { BaseStyle } from '@cosmic/core/parts';
import type { interfaces } from '@cosmic/core/inversify';
import type { BaseService, NodeService } from '../service';
import { TOKENS } from '../service';

export function usePropterty<T>(token: interfaces.ServiceIdentifier<T> = TOKENS.TextStyle) {

    const baseService = inject(token) as BaseService;

    const nodeService = inject(TOKENS.Node) as NodeService;

    const styleId = ref('1');

    const reset = ref(1);

    const isStandard = computed(() => reset.value && !baseService.isLocalStyle(styleId.value));

    const standard = computed(() => reset.value && baseService.get(styleId.value));

    const standardList = computed(() => reset.value && baseService.getServiceStyles());

    const isShowStandardModal = ref(false);

    const isShowDetailModal = ref(false);

    const detailTarget = ref<HtmlElement | null | undefined>(null);

    const standardTarget = ref<HtmlElement | null >(null);

    let detailEdit = null;

    function cancelStandardModal() {
        isShowStandardModal.value = false;
    }

    function cancelDetailModal() {
        isShowDetailModal.value = false;
    }

    async function saveDetail() {
        isShowDetailModal.value = false;
        await baseService.updateStyle(detailEdit);
        reset.value++;
    }

    async function openDetaileModal(target: HtmlElement, standard) {
        isShowDetailModal.value = false;
        await nextTick();
        detailEdit = (toRaw(standard) || baseService.get(styleId.value)).clone();
        detailTarget.value = target;
        isShowDetailModal.value = true;
    }

    function openStandardModal(target: HtmlElement) {
        standardTarget.value = target;
        isShowStandardModal.value = true;
    }

    function selectStandard(standard) {
        styleId.value = standard.id;
        isShowStandardModal.value = false;
        isShowDetailModal.value = false;
    }

    function unRef() {
        styleId.value = baseService.unref(styleId.value)?.id;
        isShowStandardModal.value = false;
        isShowDetailModal.value = false;
    }

    async function updateStyle(style: BaseStyle) {
        const updateStyle = await baseService.updateStyle(style);
        if (isSelected.value) {
            selected.value = reactive(baseService.get(selected.value.id));
        }

        standardList.value = baseService.getLocalStyles();
    }

    function getDetailEdit() {
        return detailEdit;
    }

    return {
        styleId,
        isStandard,
        standard,
        isShowStandardModal,
        isShowDetailModal,
        detailTarget,
        standardTarget,
        standardList,

        updateStyle,
        cancelStandardModal,
        cancelDetailModal,
        saveDetail,
        selectStandard,
        openDetaileModal,
        openStandardModal,
        unRef,
        getDetailEdit,
    };
}
