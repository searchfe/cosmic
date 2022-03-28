import { reactive, ref } from 'vue';


export interface Atom {
    property: object;
    standard: any[]
}

export function useAtom(data: Atom) {

    const { property, standard } = data;

    const proxyProperty = reactive(property);

    const standardList = ref(standard);

    const isShowStandardModal = ref(false);

    const isShowDetailModal = ref(false);

    const detailTarget = ref<HtmlElement | null >(null);

    const standardTarget = ref<HtmlElement | null >(null);

    const selected = ref(null);
    const isSelected = ref(false);

    function cancelStandardModal() {
        isShowStandardModal.value = false;
    }

    function cancelDetailModal() {
        isShowDetailModal.value = false;
    }

    function openDetaileModal(target: HtmlElement, standard) {
        if (standard) {
            selected.value = standard;
        }
        detailTarget.value = target;
        isShowDetailModal.value = true;
    }

    function openStandardModal(target: HtmlElement) {
        standardTarget.value = target;
        isShowStandardModal.value = true;
    }

    function selectStandard(standard) {
        isSelected.value = true;
        selected.value = standard;
        isShowStandardModal.value = false;
        isShowDetailModal.value = false;
    }

    function unSelectStandard() {
        isSelected.value = false;
        selected.value =  null;
        isShowStandardModal.value = false;
        isShowDetailModal.value = false;
    }

    return {
        property: proxyProperty,
        isShowStandardModal,
        isShowDetailModal,
        isSelected,
        selected,
        detailTarget,
        standardTarget,
        standardList,

        cancelStandardModal,
        cancelDetailModal,
        selectStandard,
        openDetaileModal,
        openStandardModal,
        unSelectStandard,
    };
}
